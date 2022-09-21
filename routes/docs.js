var express = require('express');
var router = express.Router();

const docsModel = require("../models/docs");

router.get("/", async (req, res) => {
    const allDocs = await docsModel.getAllDocs();
    //console.log(allDocs)
    
    return res.json({
            data: allDocs
        });
    }
);

// router.get("/", async (req, res) => {

//     await docsModel.reset();

//     return;
// });

router.post("/", async (req, res) => {
        const newDoc = req.body;

        const result = await docsModel.insertDoc(newDoc);

        return res.status(201).json({ data: result});
    }
);

router.put("/", async (req, res) => {
        const currentDoc = req.body;

        const result = await docsModel.updateDoc(currentDoc);

        // return response.status(200).json( { data: result} );
        res.json(result);
    }
);

router.post(
    "/init",
    async (req, res) => {
        await docsModel.init();

        res.send("tjo tjim!");
    }
);

module.exports = router;
