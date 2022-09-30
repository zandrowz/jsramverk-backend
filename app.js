require('dotenv').config();

const express = require('express');
//const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');
const docs = require("./routes/docs.js");

const app = express();
const port = process.env.PORT || 1337;

app.use(express.json());

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/docs", docs);

app.get('/', (req, res) => {
    res.json({
        msg: "My editor - Docs",
    });
});

app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));

const server = app.listen(port, () => {
    console.log(`Editor API listening on port ${port}!`);
});

module.exports = server;
