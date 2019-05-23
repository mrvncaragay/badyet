const db = require('../database');
const Item = require('../models/item');

module.exports = class Category {

    constructor(incomeId, userId) {

        this.income_id = incomeId;
        this.user_id = userId;
    }

    init() {

        this.findUserCategoryByUIId()
            .then(([category]) => {
                const cateId = category[0];
                this.item = new Item('Paycheck 1', cateId.id)
                this.item.save().catch(err => console.log(err));
            }).catch(err => console.log(err));

    }

    save() {
        return db.execute('INSERT INTO categories (user_id, income_id) VALUES (?, ?)', [this.user_id, this.income_id]);
    }

    findUserCategoryByUIId() {
        return db.execute('SELECT id FROM categories WHERE user_id = ? AND income_id = ?', [this.user_id, this.income_id]);
    }
}