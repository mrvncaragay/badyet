const db = require('../database');

const Income = require('./income');

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    init(){

        User.findByEmail(this.email)
            .then(([user]) => {
                this.income = new Income(user[0].id)
                this.income.save()
                    .then(() => {
                        this.income.init();
                    })
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
        
        //create categories
        //create items
        //use mthod chanining
    };

   save() {
        return db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, this.password]);
    }

    getCategories() {
        return db.execute('SELECT * FROM categories WHERE users_id = ?', [this.id]);
    }

    static isUserEmailExist(email) {
        return db.execute('SELECT EXISTS(SELECT email FROM users WHERE email = ?) AS any', [email]);
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
    }

    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE users.email = ?', [email]);
    }

    static isUsernameExist(username) {
        return db.execute('SELECT EXISTS(SELECT username FROM users WHERE username = ?) AS any', [username]);
    }

    static isUsernameAndEmailExist(username, email) {
        return db.execute('SELECT EXISTS(SELECT * FROM users WHERE username = ? AND email = ?) AS any', [username, email]);
    }

    static dbClose() {
        db.end();
    }

    static deleteAllUsers() {
        db.execute('DELETE FROM users');
    }
}