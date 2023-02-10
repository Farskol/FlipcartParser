const MongoClient = require("mongodb").MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017';
const mongoClient = new MongoClient(dbUrl);

module.exports.add_products = async function (Products){
    try{
        await mongoClient.connect();
        const db = mongoClient.db('Flipkart_and_Amazon_parser');
        const collection = db.collection('Flipkart_products');
        await collection.insertMany(Products);
    }
    catch (e){
        console.log(e?.message);
    }
    finally {
       await mongoClient.close();
    }
}