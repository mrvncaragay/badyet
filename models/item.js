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
        type: Sequelize.DOUBLE(100, 2),
        defaultValue: 00
    },

    spend: { 
        type: Sequelize.DOUBLE(100, 2),
        defaultValue: 00
    }
});

module.exports = Item;

// module.exports = class Item {

//     constructor(label, cate_id) {
//         this.label = label || '';
//         this.category_id = cate_id;
//     }

//     save() {
//         return db.execute('INSERT INTO items (label, categories_id) VALUES (?, ?)', [this.label, this.category_id]);
//     }
// }