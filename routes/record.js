const express = require("express");

const recordController = require("../controllers/record");

const router = express.Router();

router.get('/:table', recordController.getRecords);

router.post('/add-record/:table', recordController.addRecord);

router.delete('/delete-record/:table/:id', recordController.deleteRecord);

module.exports = router;