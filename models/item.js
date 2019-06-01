const Sequelize = require('sequelize');
const sequelize = require('../database');

const Item = sequelize.define('items', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    label: {
        type: Sequelize.STRING(45),
        defaultValue: 'Label'
    },
  
    planned:  {
        type: Sequelize.DOUBLE(255,2),
        defaultValue: '0.00'
    },

    spend: { 
        type: Sequelize.DOUBLE(255,2),
        defaultValue: '0.00'
    }
});

module.exports = Item;