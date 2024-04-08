const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/database');
const tableRoute = require('./routes/table');
const recordRoute = require('./routes/record');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/table', tableRoute);
app.use('/record', recordRoute);

sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    })
    .catch(err => console.log(err));