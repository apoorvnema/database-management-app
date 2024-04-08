const express = require('express');

const recordController = require('../controllers/record');

const router = express.Router();

router.get('/getRecord', recordController.getRecord);

router.post('/addRecord', recordController.addRecord);

router.delete('/deleteTable', recordController.deleteRecord);

module.exports = router;