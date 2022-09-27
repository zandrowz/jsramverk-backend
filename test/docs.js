process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "docs";

//Nollställer
describe('docs', () => {
    before(async function() {
        const db = await database.getDb();

        db.db.listCollections(
            { name: collectionName }
        )
            .next()
            .then(async function (info) {
                if (info) {
                    await db.collection.drop();
                }
            })
            .catch(function (err) {
                console.error(err);
            })
            .finally(async function () {
                await db.client.close();
            });
        });
    //Den är då 0
    describe('GET /docs', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(0);

                    done();
                });
        });
    });

    //Lägga till dokument
    describe('POST /docs', () => {
        it('201 Creating new doc', (done) => {
            let doc = {
                name: "Nytt dokument",
                content: "Nytt dokument",
            };

            chai.request(server)
                .post("/docs")
                .send(doc)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("name");
                    res.body.data.name.should.equal("Nytt dokument");

                    done();
                });
        });

        
        // Här ska antal dokument vara 1
        it('200 Get all docs', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(1);

                    done();
                });
        });
    });

});