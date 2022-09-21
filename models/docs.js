const database = require("../db/database.js");
const initDocs = require("../data/docs.json");

const ObjectId = require('mongodb').ObjectId;

const docs = {
    // reset: async function init(n) {
    //     let db;

    //     try {
    //         db = await database.getDb();

    //         await db.collection.deleteMany({});
    //         let result = await db.collection.insertMany([
    //                 {    
    //                 "name": "Att göra",
    //                 "content": "Städa, handla"
    //                 },
    //                 {
    //                 "name": "Ett test",
    //                 "content": "Hej"
    //                 }
    //             ]);

    //         return result;
    //     } catch (error) {
    //         return {
    //             errors: {
    //                 message: error.message
    //             }
    //         };
    //     } finally {
    //         await db.client.close();
    //     }
    // },
    getAllDocs: async function getAllDocs() {
        let db;

        try {
            db = await database.getDb();
            //console.log(db)

            const allDocs = await db.collection.find().toArray();
            //console.log(allDocs)

            return allDocs;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },
    insertDoc: async function insertDoc(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);
            console.log(result)

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    updateDoc: async function updateDoc(currentDoc) {
        let db;

        try {
            db = await database.getDb();

            const filter = { _id: ObjectId(currentDoc["_id"]) };
            const content = currentDoc.content;

            const result = await db.collection.updateOne(
                filter, {$set: {content: content}})

            return {
                    ...currentDoc,
                    matchedCount: result.matchedCount,
                };
            } catch (error) {
                return {
                    errors: {
                        message: error.message
                    }
                };
            } finally {
                await db.client.close();
            }
        },
    init: async function init() {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertMany(initDocs);

            console.log(`${result.insertedCount} documents were inserted`);
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    }

}

module.exports = docs;
