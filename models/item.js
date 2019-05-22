const db = require('../database');

module.exports = class Item {

    constructor(cate_id) {
        this.category_id = cate_id;
    }

    save() {
        return db.execute('INSERT INTO items (categories_id) VALUES (?)', [this.category_id]);
    }
}