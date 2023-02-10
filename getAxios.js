const axios = require('axios')
const https = require('https')
let instance;

module.exports.getAxios = function (){
    if(!instance){
        instance = axios.create({
            baseURL: "https://www.flipkart.com",
            timeout: 60000000,
            httpsAgent: new https.Agent({keepAlive: true}),
            headers: {'Content-Type': 'application/xml'}
        })
    }

    return instance;
}