const db = require('../database');

module.exports = class Item {

    constructor(label, cate_id) {
        this.label = label || '';
        this.category_id = cate_id;
    }

    save() {
        return db.execute('INSERT INTO items (label, categories_id) VALUES (?, ?)', [this.label, this.category_id]);
    }
}