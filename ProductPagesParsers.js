const cheerio = require("cheerio");
const db = require('./products_db');
let b = 1;
let Products = [];

module.exports.parse_Cameras_page = async function (cost, url, instance, page){
    try{
        const {data} = await instance.get(url);

        const newHtml = cheerio.load(data)

        let Product = {url:'https://www.flipkart.com'+url, cost:cost};
        let numberOfBrand;
        let numberOfModelNumber;
        let numberOfSeries;
        let numberOfModelName;
        let numberOfBrandColor;
        let numberOfColor;
        let numberOfSLRVariant;
        let numberOfType;

            newHtml('td', '#container').each( (i, elem) => {

                let text = newHtml(elem).text();

                if (text === 'Brand') {
                    numberOfBrand = i + 1;
                }
                if (text === 'Model Number') {
                    numberOfModelNumber = i + 1;
                }
                if (text === 'Series') {
                    numberOfSeries = i + 1;
                }
                if (text === 'Model Name') {
                    numberOfModelName = i + 1;
                }
                if (text === 'Brand Color') {
                    numberOfBrandColor = i + 1;
                }
                if (text === 'Color') {
                    numberOfColor = i + 1;
                }
                if (text === 'SLR Variant') {
                    numberOfSLRVariant = i + 1;
                }
                if (text === 'Type') {
                    numberOfType = i + 1;
                }

                if (i === numberOfBrand) {
                    Product.brand = text;
                }
                if (i === numberOfModelNumber) {
                    Product.modelNumber = text;
                }
                if (i === numberOfSeries) {
                    Product.Series = text;
                }
                if (i === numberOfModelName) {
                    Product.modelName = text;
                }
                if (i === numberOfBrandColor) {
                    Product.brandColor = text;
                }
                if (i === numberOfColor) {
                    Product.color = text;
                }
                if (i === numberOfSLRVariant) {
                    Product.SLRVariant = text
                }
                if (i === numberOfType) {
                    Product.type = text
                    return false;
                }
            })

            Products.push(Product);
            console.log(Product)
            console.log(b);
            b++;
    }
    catch (e){
        console.log(e?.message + '\n link: https://www.flipkart.com' + url + '\npage: ' + page);
        await this.addProducts();
        b--;
    }
}

module.exports.addProducts = async function addProducts(){
    try {
        await db.add_products(Products);
        Products = [];
    }
    catch (e){
        console.log(e?.message);
    }
}