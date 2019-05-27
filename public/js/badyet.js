
export const budgetController = (() => {

    const DOMstrings = {

        categoryList: '.category-list',
        btnAddGroupCategory: '#add-category-button',
        btnAddIncomeItem: '.add-income-item-button',
        btnAddCategoryItem: '.add-category-item-button',
        incomeId: '.income_id',
        userId: '.user_id',
        incomeCategoryId: '.income_category_id',
        categoryId: '.category_id',
        csrfToken: '.csrf_token',
        removableCategory: '.removable-category',
        categoryList: '.category-list',
        incomeList: '.data-incomes-list',
        categoriesList: '.categories-list', //can delete later
        categoriesItemsList: '.category-items-list-',
        clickerIcon: '.clicker',
        editable: '.editableItem',
        itemData: '.item-data'
    }

    const getKeys = {
        incomeId: document.querySelector(DOMstrings.incomeId).value,
        userId: document.querySelector(DOMstrings.userId).value,
        csrfToken: document.querySelector(DOMstrings.csrfToken).value,
        incomeCategoryId: document.querySelector(DOMstrings.incomeCategoryId).value
    }

    return {

        getIncomeAndUserKeys: () => {
            
            return getKeys;
        },
        
        getDoomStrings: () => {
            
            return DOMstrings;
        },

        checkTempCategory: () => {
           
            return document.querySelector(DOMstrings.removableCategory) ? true : false;
        },

        removeTempCategory: () => {

            document.querySelector(DOMstrings.removableCategory).remove();                   
        },

        editItemForm: item => {

            const itemEle = `<div class="card editable-item-form">
                <div class="row editable-form">
                    <div class="col-6">
                        <input class="form-control" type="text" name="label" placeholder="title" >   
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-6">
                                <input class="form-control" type="text" name="planned" placeholder="planned">     
                            </div>
                            <div class="col-6">
                                <input class="form-control" readonly type="text" name="planned" placeholder="0.00">     
                            </div>
                        </div>
            
                    </div>
                </div>          
            </div>`;



        },

        addCategoryItem: item => {

            const itemEle = `<div class="collapse show item-data" id="category-${item.categoryId}" data-itemId="${item.id}">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6 editableItem">
                            <span class="income-header-income">${item.label}</span>      
                        </div>
                        <div class="col-6">
                            <div class="row text-right income-header-pr-text">
                                <div class="col-6 editableItem">$0.0${item.planned}</div>
                                <div class="col-6">$0.0${item.spend}</div>
                            </div>
                        </div>
                    </div>          
                </div>
            </div>`

            let classStr = DOMstrings.categoriesItemsList;

            classStr += item.categoryId;
            document.querySelector(classStr).insertAdjacentHTML('beforeend', itemEle);
        },

        addIncomeItem: item => {

                      
            const itemEle = `<div class="collapse show item-data" id="income-${getKeys.incomeId}">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6 editableItem">
                            <span class="income-header-income">${item.label}</span>      
                        </div>
                        <div class="col-6">
                            <div class="row text-right income-header-pr-text">
                                <div class="col-6 editableItem">$0.0${item.planned}</div>
                                <div class="col-6">$0.0${item.spend}</div>
                            </div>
                        </div>
                    </div>          
                </div>
            </div>`;

            document.querySelector(DOMstrings.incomeList).insertAdjacentHTML('beforeend', itemEle);
        },

        addCategory: category => {
            
            const itemEle = `<div class="data-item">
                        <div class="col-12 income-header">
                            <div class="row">
                                <div class="col-6">
                                        <span class="">
                                            <span class="income-header-income editableItem">${category.title}</span>
                                        </span>
                                        <a role="button" data-toggle="collapse" class="btn no-focus clicker" data-target="#category-${category.id}"><i class="fas fa-caret-up"></i></a>
                                </div>
                                <div class="col-6">
                                    <div class="row text-right income-header-pr-text">
                                        <div class="col-6">Planned</div>
                                        <div class="col-6">Remaining</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div class="category-items-list-${category.id}">
                           
                        </div> 

                        <div class="collapse show" id="category-${category.id}">
                            <div class="card card-body btn-add-paycheck">
                                <div class="row">
                                    <div class="col-6">
                                        <input type="hidden" class="category_id" value="${category.id}"> 
                                        <a role="button" data-toggle="" class="btn no-focus btn-add-items add-category-item-button" href="#"><i class="fas fa-plus btn-add-paycheck-adder"></i> Add Item</a>  
                                    </div>
                                </div>        
                            </div>
                        </div>
                    </div>`;

                    
            document.querySelector(DOMstrings.categoryList).insertAdjacentHTML('beforeend', itemEle);
        }
    }

})();