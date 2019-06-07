const helper = require('../util/helper');
const Item = require('../models/item');
const Income = require('../models/income');
const Category = require('../models/category');

exports.getBadyetPage = (req, res) => { 

    const currentMonth = helper.getmonthYear();
    const selectedMonth = req.body.month || currentMonth[0];
    let incomeInfo;

    req.currentUser.getIncomes({ where: { month: selectedMonth }, include: [ { model: Category, include: [ Item ] }] }) //Get Current User current Month budget
        .then(([ income ]) => {
           
            incomeInfo = income;
            const incomeCategory = income.categories.shift(); //remove Income categor
            incomeInfo.category_id = incomeCategory.id;
            incomeInfo.items = incomeCategory.items;
                       
            incomeInfo.budget = helper.getTotal(incomeInfo.items).income.toFixed(2);
            incomeInfo.total = (incomeInfo.budget - helper.getTotal(incomeInfo.categories).category).toFixed(2); 
            
            if( Object.entries(incomeInfo.categories).length === 0 ) categories = false;

            res.render('app/badyet', { income: incomeInfo, categories: incomeInfo.categories });

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
        
        if ( income.length > 0 ) {

            income.budget = (helper.getTotal(income[0].categories[0].items).income).toFixed(2);
            income.total = (income.budget  - helper.getTotal(income[0].categories, true).category).toFixed(2);
        }

        res.status(200).json({ income, total: income.total, budget: income.budget });
    })
    .catch(err => console.log(err));
}

exports.getIncomes = (req, res) => {

    req.currentUser.getIncomes({
        attributes: ['month', 'year']
    })
    .then(incomes => { 

        res.status(200).json({ incomes });
    })
    .catch(err => console.log(err));
}

exports.postNewIncome = ((req, res) => {

    let newIncome;
    let newCategory;

    Income.findOrCreate({ where: {
        
        month: req.body.month,
        year: req.body.year,
        userId: req.currentUser.id
    }})
    .then(income => {
        
        newIncome = income[0];
        return newIncome.createCategory({ title: 'Income' });
    })
    .then(category => {
        newCategory = category;
        return newCategory.createItem({ label: 'Paycheck 1' });   
    })
    .then(item => {
        res.status(200).json({ newIncome, newCategory, item });
    })
    .catch(err => console.log(err));
});