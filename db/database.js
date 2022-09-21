const mongo = require("mongodb").MongoClient;
//const config = require("./config.json");
const collectionName = "docs";

const database = {
    getDb: async function getDb () {
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.o3iewy5.mongodb.net/?retryWrites=true&w=majority`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        //console.log(client)
        const db = await client.db();
        console.log(db)
        const collection = await db.collection(collectionName);
        //console.log(collection)

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
