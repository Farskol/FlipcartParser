const cheerio = require("cheerio");
const pagesParser = require("./ProductPagesParsers");
const axios = require("./getAxios");

module.exports.parse_page_with_products = async function (start, number) {
    let url = '/cameras-accessories/cameras/pr?sid=jek,p31&otracker=categorytree'
    try {
        if(start === 2){
            await parse_page(url);
        }
        for (let i = start; i <= number; i++){
            let newUrl = url + '&page=' + i;
            await parse_page(newUrl, i);
            await pagesParser.addProducts();
        }
    } catch (e) {
        console.log(e?.message);
    }
}

async function parse_page(url, page){
    try{
        const instance = await axios.getAxios();
        const {data} = await instance.get(url);
        const $ = cheerio.load(data);

        await $('div').each(async (i, elem) => {
            let data_id = $(elem).attr('data-id');
            if (data_id !== undefined) {
                let div = cheerio.load($(elem).html());
                await div('a').each(async (j, el) => {
                    let product_ul = $(el).attr('href');
                    let cost = '₹null'
                    // or 2
                    if (j === 0) {
                        let a = cheerio.load(div(el).html());
                        await a('div').each(async (k, e) => {
                            //or _30jeq3
                            if (a(e).attr('class') === '_30jeq3 _1_WHN1') {
                                cost = a(e).text();
                                return false;
                            }
                        })
                        await pagesParser.parse_Cameras_page(cost, product_ul, instance, page)
                    }
                })
            }
        })
    }
    catch (e){
        console.log(e?.message + 'page: ' + page);
    }
}
