// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const MongoClient = require('mongodb').MongoClient;
const mongoUri = process.env.MONGO_URI;

export default async (req, res) => {
    return new Promise(resolve => {
        return saveOrder(req, res, resolve);
    });
}

function datadump(req, res, resolve) {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("g_commerce").collection("orders");
        collection.find({}).toArray().then(data => {
            console.log(data);
            console.log(req.body);
            console.log(req.headers);
            res.statusCode = 200;
            res.json({name: data});
        }).catch(e => {
            console.log(e);
            console.log(req.body);
            console.log(req.headers);
            res.statusCode = 200;
            res.json({name: 'not cool'});
        }).finally(() => {
            client.close();
            return resolve();
        });
    });
}
function saveOrder(req, res, resolve) {
    const {body} = req;

    const client = new MongoClient(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("g_commerce").collection("orders");
        collection.insertOne(body).then( value =>  {
            res.statusCode = 200;
            res.json({success: true, value: value});
        }).catch(e => {
            console.log(e);
            console.log(req.body);
            console.log(req.headers);
            res.statusCode = 200;
            res.json({success: false});
        }).finally(() => {
            client.close();
            return resolve();
        });
    });
}
