var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Docs"
        }
    };

    res.json(data);
});





module.exports = router;
