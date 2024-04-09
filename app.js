const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const database = require("./config/database");
const tableRoute = require("./routes/table");
const recordRoute = require("./routes/record");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/table', tableRoute);
app.use('/table', recordRoute);

database
    .sync()
    .then(res => {
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        })
    })
    .catch(err => console.log(err))
