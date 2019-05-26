
export const budgetController = (() => {

    const DOMstrings = {

        categoryList: '.category-list',
        btnAddGroupCategory: '#add-category-button',
        btnAddIncomeItem: '#add-income-item-button',
        incomeId: '.income_id',
        userId: '.user_id',
        categoryId: '.income_category_id',
        csrfToken: '.csrf_token',
        removableCategory: '.removable-category',
        categoryList: '.category-list',
        incomeList: '.data-incomes-list',
        clickerIcon: '.clicker'
    }

    const getKeys = {
        incomeId: document.querySelector(DOMstrings.incomeId).value,
        userId: document.querySelector(DOMstrings.userId).value,
        csrfToken: document.querySelector(DOMstrings.csrfToken).value,
        categoryId: document.querySelector(DOMstrings.categoryId).value
    }

    return {

        getIncomeAndUserKeys: () => {
            
            return getKeys;
        },
        
        getDoomStrings: () => {
            
            return DOMstrings;
        },

        checkTempCategory: () => {
           
            return  document.querySelector(DOMstrings.removableCategory) ? true : false;
        },

        removeTempCategory: () => {

            document.querySelector(DOMstrings.removableCategory).remove();                   
        },

        addIncomeItem: item => {

                      
            const itemEle = `<div class="collapse show" id="collapseExample1">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6">
                            <span class="income-header-income">${item.label}</span>      
                        </div>
                        <div class="col-6">
                            <div class="row text-right income-header-pr-text">
                                <div class="col-6">$0.0${item.planned}</div>
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
                                            <span class="income-header-income">${category.title}</span>
                                        </span>
                                        <a role="button" data-toggle="collapse" class="btn no-focus" data-target="#category${category.id}"><i class="fas fa-caret-up"></i></a>
                                </div>
                                <div class="col-6">
                                    <div class="row text-right income-header-pr-text">
                                        <div class="col-6">Planned</div>
                                        <div class="col-6">Remaining</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="collapse show" id="#category${category.id}">
                            <div class="card card-body btn-add-paycheck">
                                <div class="row">
                                    <div class="col-6">
                                        <a role="button" data-toggle="" class="btn no-focus btn-add-paycheck-text" href="#"><i class="fas fa-plus btn-add-paycheck-adder"></i> Add Item</a>  
                                    </div>
                                </div>        
                            </div>
                        </div>
                    </div>`;

                    
            document.querySelector(DOMstrings.categoryList).insertAdjacentHTML('beforeend', itemEle);
        }
    }

})();