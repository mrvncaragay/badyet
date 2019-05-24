
//*** create a sequelize local connection ***//
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});

module.exports = sequelize;


//*** create a local connection ***//

// const mysql = require('mysql2');

// //create a development connection
// const databaseConfig = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASS,
//     multipleStatements: true            //for multiple statements use query.
// }

// const connection = mysql.createPool(databaseConfig);

// module.exports = connection.promise();

//*** create a production connection ***//

// const databaseConfig = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//     config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
//   }

// const connection = mysql.createPool(databaseConfig);

// module.exports = connection.promise();