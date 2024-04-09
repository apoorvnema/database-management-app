const express = require("express");

const tableController = require("../controllers/table");

const router = express.Router();

router.get('/get-tables', tableController.getTables);

router.post('/add-table', tableController.addTable);

module.exports = router;