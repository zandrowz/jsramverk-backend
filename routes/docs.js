var express = require('express');
var router = express.Router();

const docsModel = require("../models/docs");

router.get("/", async (req, res) => {
        const allDocs = await docsModel.getAllDocs();

        return res.json({
            data: allDocs
        });
    }
);

module.exports = router;
