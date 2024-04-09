const sequelize = require("../config/database");
const { QueryTypes } = require('sequelize');

exports.getRecords = async (req, res) => {
    try {
        const table = req.params.table;
        let tableData = {};
        let header = [];

        const records = await sequelize.query(`SELECT * FROM ${table}`);
        tableData.records = records[0];

        const headers = await sequelize.query(`DESCRIBE ${table}`);
        headers[0].forEach((data) => {
            header.push(data.Field);
        });
        tableData.headers = header;
        res.status(200).json(tableData);
    } catch (error) {
        console.error('Error getting table data:', error);
        res.status(500).json({ error: 'Failed to get table data' });
    }
};


exports.addRecord = async (req, res) => {
    try {
        const table = req.params.table;
        const columns = Object.keys(req.body);
        const values = Object.values(req.body);
        columns.push('createdAt', 'updatedAt');
        values.push(new Date(), new Date());
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
        await sequelize.query(query, { replacements: values, type: QueryTypes.INSERT });
        res.status(201).json({ message: 'Record added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add record' });
    }
};



exports.deleteRecord = async (req, res) => {
    try {
        const { id, table } = req.params;
        const del = await sequelize.query(`DELETE FROM ${table} where id = ${id}`);
        res.status(200).json(del);
    }
    catch (error) {
        console.log(error);
    }
}