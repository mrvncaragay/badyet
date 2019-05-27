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
            incomeInfo.category_id = category.id;
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

exports.postNewCategory = (req, res) => {

    if( !req.body.incomeId ) res.render('/app/badyet');

    req.currentUser.createCategory({

         incomeId: req.body.incomeId
     })
     .then(category => {

        res.status(200).json({ category });
     })
     .catch(err => {

         res.status(500).json({ error: 'Adding category failed!' });
     });
};

exports.postNewIncomeItem = (req, res) => {
    //for different category adding item
    //it will be different categoryId
    //do closest hidden input

    Item.create({
        label:  req.body.label,
        categoryId: req.body.categoryId
    })
    .then(item => {

        res.status(200).json({ item });
     })
     .catch(err => {

         res.status(500).json({ error: 'Adding item failed!' });
     });
};

exports.postNewCategoryItem = (req, res) => {
    //for different category adding item
    //it will be different categoryId
    //do closest hidden input

    Item.create({
        categoryId: req.body.categoryId
    })
    .then(item => {

        res.status(200).json({ item });
     })
     .catch(err => {

         res.status(500).json({ error: 'Adding item failed!' });
     });
};