const express = require('express');

const tableController = require('../controllers/table');

const router = express.Router();

router.get('/getTables', tableController.getTables);

router.post('/addTable', tableController.addTable);

module.exports = router;