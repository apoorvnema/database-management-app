const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

exports.getTables = (req, res) => {
    try {
        sequelize.query('SHOW TABLES').then((results) => {
            const tables = results[0].map((table) => {
                return Object.values(table).toString()
            });
            res.status(200).json({ tables });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch table names' });
    }
};

exports.addTable = (req, res) => {
    const tableName = req.body.tableName;
    const fields = req.body.fields;
    const column = {};
    fields.forEach((field) => {
        const { fieldName, dataType } = field;
        column[fieldName] = {
            type: DataTypes[dataType]
        };
    });
    const customModel = sequelize.define(tableName, column);
    customModel
        .sync()
        .then(() => {
            res.status(201).json({ message: 'Table created successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to create table' });
        });
}