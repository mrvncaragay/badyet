const Sequelize = require('sequelize');
const sequelize = require('../database');
const helper = require('../util/helper');

const [ currentMonth, currentYear  ] = helper.getmonthYear();

const Income = sequelize.define('income', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
 
    budget:  {
        type: Sequelize.DECIMAL(65,2)
    },

    month: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: currentMonth
    },
    
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: currentYear
    }
});

module.exports = Income;


// module.exports = class Income {
    
//     constructor(userId){
//         this.userId = userId;
//         this.month = helper.getCurrentMonth();
//     }

//     init() {
      
//         this.findIncomeByUserId()
//             .then(([res]) => {
//                 const incomeId = res[0].id;
//                 this.category = new Category(incomeId, this.userId);
//                 this.category.save()
//                     .then(() => {
//                         this.category.init();
//                      })
//                     .catch(err => console.log(err));
//             }).catch(err => console.log(err));
//     }

//     save() {
//         return db.execute('INSERT INTO income (user_id, month) VALUES (?, ?)', [this.userId, this.month]);
//     }

//     findIncomeByUserId() {
//         return db.execute('SELECT id FROM income WHERE user_id = ?', [this.userId]);
//     }

//     static getMonthIncome(num, user_id) {
//         return db.execute(`SELECT * FROM income WHERE month = ? AND user_id = ?`, [num, user_id]);
//     }
// }   