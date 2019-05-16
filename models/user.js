const db = require('../database');

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    save() {
        return db.execute('INSERT into users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, this.password]);
    }

    static isUserEmailExist(email) {
        return db.execute('SELECT EXISTS(SELECT email FROM users WHERE email = ?) AS any', [email]);
    }
}