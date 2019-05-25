const helper = require('../util/helper');
const Sequelize = require('sequelize');
const Item = require('../models/item');
const Op = Sequelize.Op;

exports.getBadyetPage = (req, res) => { 

    const currentMonth = helper.getmonthYear();
    const selectedMonth = req.body.month|| currentMonth[0];
    let incomeInfo;
    let incomeItemsResult;

    //Different month will cause an error since other month is not on DB
    //choose which attributes: ['id'] will be included to queried data

    req.currentUser.getIncomes({ where: { month: selectedMonth }}) //Get Current User current Month budget
        .then(income => {
            
            incomeInfo = income[0];
            return incomeInfo.getCategory({ include: [ Item ]}); //Get income Category
        })
        .then(category => {

            incomeItemsResult = category;
            return req.currentUser.getCategories({ include: [ Item ], where: { title: { [Op.notLike]: 'Income' }}});
        })
        .then(categories => {

            if( Object.entries(categories).length === 0 ) categories = false;

            res.render('app/badyet', { income: incomeInfo, incomeItems: incomeItemsResult.items, categories: categories });
        })
        .catch(err => console.log(err));
};

exports.getSettingsPage = (req, res) => {
    res.render('app/settings');
};