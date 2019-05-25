const helper = require('../util/helper');
const Sequelize = require('sequelize');
const Item = require('../models/item');
const Op = Sequelize.Op;

exports.getBadyetPage = (req, res) => { 

    const currentMonth = helper.getmonthYear();
    const selectedMonth = req.body.month|| currentMonth[0];
    let incomeInfo;
    let incomeItems;
    let categories;
    let incomeCategoryId;
    //Different month will cause an error since other month is not on DB

    req.currentUser.getIncomes({ where: { month: selectedMonth }}) //Get Current User current Month budget
        .then(income => {
            
            incomeInfo = income[0];
            return incomeInfo.getCategory(); //Get income Category
        })
        .then(incomeCategory => {

            incomeCategoryId = incomeCategory.id;
            return incomeInfo.getItems({ where: { categoryId: incomeCategory.id }}); //Get income items based on Category id
        })
        .then(items => {

            incomeItems = items;
            return req.currentUser.getCategories({ include: [ Item ], where: { title: { [Op.notLike]: 'Income' }}}); //Get the rest of categories not based on income and income items
        })
        .then((categoriesResult) => {
            console.log(categoriesResult[0].items[1])
             categories = categoriesResult;
             return req.currentUser.getItems({ where: { categoryId: { [Op.not]: incomeCategoryId }}})
        })
        .then((categoriesItemsResult) => {
            res.render('app/badyet', { income: incomeInfo,  incomeItems: incomeItems, categories: categories, categoriesItems: categoriesItemsResult });
        })
        .catch(err => console.log(err));


            // req.currentUser.getCategories({ where: { incomeId: income[0].id }, attributes: ['id'] })
            //     .then(categories => {
            //         let cat_ids = categories.map(c => c.id);
                    

            //         req.currentUser.getItems({ where: { categoryId: { [Op.in]: cat_ids }},  attributes: ['id', 'label', 'planned', 'spend', 'categoryId'] })
            //             .then(items => {
            //                   res.render('app/badyet', { income: income[0], categories: categories, items: items});
            //             })
            //             .catch(err => console.log(err));
            //     })
            //     .catch(err => console.log(err));

};

exports.getSettingsPage = (req, res) => {
    res.render('app/settings');
};