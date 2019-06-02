const helper = require('../util/helper');
const Item = require('../models/item');
const Category = require('../models/category');

exports.getBadyetPage = (req, res) => { 

    const currentMonth = helper.getmonthYear();
    const selectedMonth = req.body.month|| currentMonth[0];
    let incomeInfo;

    //Different month will cause an error since other month is not on DB
    //choose which attributes: ['id'] will be included to queried data

    req.currentUser.getIncomes({ where: { month: selectedMonth }}) //Get Current User current Month budget
        .then(([ income ]) => {
    
            incomeInfo = income;
            return incomeInfo.getCategories({ include: [ Item ] }); //Get income Category
        })
        .then(categories => {
            const incomeCategory = categories.shift(); //remove Income category
            incomeInfo.category_id = incomeCategory.id;

            if( Object.entries(categories).length === 0 ) categories = false;
            res.render('app/badyet', { income: incomeInfo, incomeItems: incomeCategory.items, categories: categories });

        })
        .catch(err => console.log(err));
};

exports.getSettingsPage = (req, res) => {

    res.render('app/settings');
};

exports.postNewCategory = (req, res) => {

    Category.create({ incomeId: req.body.incomeId })
     .then(category => {
        res.status(200).json({ category });
     })
     .catch(err => {
         res.status(500).json({ error: 'Adding category failed!' });
     });
};

exports.postNewItem = (req, res) => {

    Item.create({ categoryId: req.body.categoryId })
    .then(item => {
        res.status(200).json({ item });
     })
     .catch(err => {
        res.status(500).json({ error: 'Adding item failed!' });
     });
};

exports.getItem = (req, res) => {

    Item.findByPk(req.params.id)
        .then(item => {
            res.status(200).json({ item });
        })  
        .catch(err => console.log(err));
};

exports.getCategory = (req, res) => {

    Category.findByPk(req.params.id)
        .then((category) => {
            res.status(200).json({category})
        })
        .catch(err => console.log(err));
};

exports.updateItem  = (req, res) => {

    const itemObj = req.body;
    Item.update({ 
        id: itemObj.id,
        label: itemObj.label,
        planned: Number(itemObj.planned)
    }, 
    {  where: { id: itemObj.id } })
    .then(([success]) => {
        res.status(200).json({ success });
    })  
    .catch(err => console.log(err));
};

exports.updateCategory  = (req, res) => {

    const itemObj = req.body;
    Category.update({ 
        id: itemObj.id,
        title: itemObj.title
    }, 
    {  where: { id: itemObj.id } })
    .then(([success]) => {
        res.status(200).json({ success });
    })  
    .catch(err => console.log(err));
};

exports.deleteItem = (req, res) => {
    
    Item.destroy({ where: { id: req.params.id }})
        .then(items => {
            res.status(200).json({ items });
        })
        .catch(err => console.log(err))
};

exports.deleteCategory = (req, res) => {
    
    Category.destroy({ where: { id: req.params.id }})
        .then(categories => {
            res.status(200).json({ categories });
        })
        .catch(err => console.log(err))
};

exports.getIncome = (req, res) => {

    req.currentUser.getIncomes({ where: { 
        month: req.params.month,
        year: req.params.year

    }, include: [ { model: Category, include: [ Item ] } ] })
    .then(income => {

        console.log(Boolean(income[0]))

        // let incomeInfo = income[0];
        // let incomeItems = income[0].categories.shift().items;
        // let categories = income[0].categories;
        //let incomeInfo = income[0];
        //res.render('app/badyet', { income: incomeInfo, incomeItems: incomeItems, categories: categories });
        // console.log(income.data.income[0].month);    
        // console.log(income.data.income[0]);
        // console.log(income.data.income[0].categories); //pop the first item its the month

        //res.status(200).json({ income });
    })
    .catch(err => console.log(err));
}