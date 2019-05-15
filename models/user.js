const db = require('../database');

module.exports = class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    add() {
        return db.execute('INSERT into users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, this.password]);
    }
}