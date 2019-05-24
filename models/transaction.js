const Sequelize = require('sequelize');
const sequelize = require('../database');

const Transaction = sequelize.define('transactions', {
    
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: Sequelize.STRING(90),
    },

    amount: {
        type: Sequelize.DECIMAL(4, 2),
        defaultValue: 00,
    },

    type: {
        type: Sequelize.STRING(3),
        allowNull: false
    }
});

module.exports = Transaction;