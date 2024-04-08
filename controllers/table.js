const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');

exports.addTable = async (req, res, next) => {
    try {
        const { tableName, fields } = req.body;
        const tableFields = {};
        fields.forEach(field => {
            tableFields[field.fieldName] = {
                type: DataTypes[field.dataType]
            };
        });

        // Define the model inline
        const TableModel = sequelize.define(tableName, tableFields);

        // Sync the model with the database
        await TableModel.sync();

        res.status(201).json({ message: 'Table created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create table' });
    }
};

exports.getTables = (req, res) => {
    try {
        sequelize.query('SHOW TABLES').then((results) => {
            const tables = results[0].map((table) => {
                return Object.values(table).toString()
            });
            res.status(200).json({ tables });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch table names' });
    }
};

