const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const morgan = require('morgan');
const docs = require("./routes/docs");

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.options('*', cors());

//app.disable('x-powered-by');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

//app.use(express.static(path.join(__dirname, "public")));

app.use("/docs", docs);

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
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
