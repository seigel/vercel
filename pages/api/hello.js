// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PouchDB from 'pouchdb';
const couchURI = process.env.COUCH_URI;

export default async (req, res) => {
    return new Promise(resolve => {
        return saveOrder(req, res, resolve);
    });
}

function saveOrder(req, res, resolve) {
    const {body} = req;
    const client = PouchDB(couchURI);
    body['_id'] = `test:${body.orderId}`;
    client.put(body).then((value) => {
        res.statusCode = 200;
        res.json({success: true});
    }).catch(e => {
        console.log(e);
        console.log(body);
        console.log(req.headers);
        res.statusCode = 200;
        res.json({success: false});
    }).finally(() => {
        client.close();
        return resolve();
    });
}
