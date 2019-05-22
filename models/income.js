const db = require('../database');

module.exports = class Income {
    constructor(userId){
        this.user_id = userId;
    }

    save(month) {
        const currentMonth = new Date();
        const mnth = currentMonth || month;


    }

    
    createIncomeForCurrentMonth() {
        return db.execute('INSERT INTO income (users_id) VALUES (?)', [this.id]);
    }
}   