const db = require('../database');

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        //used query for multiple statements
        return db.query('INSERT into users (username, email, password) VALUES (?, ?, ?); SELECT LAST_INSERT_ID();', [this.username, this.email, this.password]);
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
}