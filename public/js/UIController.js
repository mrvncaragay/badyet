export const UIController = (() => {

    const DOM = {

        mainAppContainer: '.main-app-container',
        mainPanelContainer: '.main-panel-container',
        rightPanelContainer: '.right-panel-container',
        leftPanelContainer: '.left-panel-container',
        rightPanelContainer: '.right-panel-container',
        categoryList: '.category-list',
        btnAddIncome: '.newIncome',
        btnAddCategory: '.add-category-button',
        btnAddIncomeItem: '.add-income-item-button',
        btnAddCategoryItem: '.add-category-item-button',
        userId: '.user_id',
        incomeCategoryId: '.income-category-id',
        categoryId: '.category_id',
        incomeId: '.income_id',
        csrfToken: '.csrf_token',
        removableCategory: '.removable-category',
        incomeList: '.data-incomes-list',
        categoriesItemsList: '.category-items-list-',
        clickerIcon: '.clicker',
        editableItem: '.editableItem',
        editableCategory: '.editableCategory',
        itemData: '.item-data',
        dataItem: '.data-item',
        editableItemForm: '.editable-item-form',
        editableCategoryForm: '.editable-category-form',
        itemLabel: '.opened-item-label',
        itemPlanned: '.opened-item-planned',
        categoryTitle: '.opened-category-title',
        selectedCateTitle: '.category-title',
        itemModal: '.close-item-modal',
        categoryModal: '.close-category-modal',
        dateClicker: '#date-picker',
        addCateClass: '.add-group-category',
        btnDate: `.badyet-date`,
        budgetAmount: '.amount-budgeted',
        dateSettings: '.date-settings',
        dateCointainer: '.main-data-date',
        rsButton: '.rs-btn',
        rsButtonRemaining: '.category-remaining',
        rsButtonSpent: '.category-spent',
        tabDataPlanned: '.tab-data-planned',
        tabDataSpent: '.tab-data-spent',
        tabDataRemaining: '.tab-data-remaining'
    }

    const income = {
        incomeId: document.querySelector(DOM.incomeId).value,
        csrfToken: document.querySelector(DOM.csrfToken).value,
        incomeCategoryId: document.querySelector(DOM.incomeCategoryId).value
    }

    const budget = {
        
        totalIncomeDOM:  document.querySelector('.total-income'),
        incomeDOM:  document.querySelector('.amount-budgeted-amount'),
        incomePlanned: document.querySelectorAll('.income-planned'),
        categoryPlanned: document.querySelectorAll('.category-planned'),
        incomeText: document.querySelector('.amount-budgeted-text'),

        getIncomeTotal: function() {
          
            let sum = 0;
            this.incomePlanned.forEach(item => {
                
                sum += parseFloat(Math.abs(item.innerHTML.slice(1)))
            });

            return sum;
        },

        getCategoryTotal: function() {

            let sum = 0;
            this.categoryPlanned.forEach(item => {
                
                sum -= parseFloat(Math.abs(item.innerHTML.slice(1)))
            });

            return sum;
        },

        getBudgetTotal: function() {

            return (this.getIncomeTotal() + this.getCategoryTotal()).toFixed(2); 
        },

        updateIncome: function() {
            
            this.updateDOMEle();

            let total = this.getBudgetTotal();
            
            if( total < 0 ) {
                total = Math.abs(total).toFixed(2);
                this.incomeDOM.classList.add('text-danger');
                this.incomeText.innerText = 'over the budget';

            } else {

                this.incomeDOM.classList.remove('text-danger');
                this.incomeText.innerText = 'left to budget';
            }
            
            this.incomeDOM.innerHTML = `$${ total }`;
            this.totalIncomeDOM.innerHTML = `$${ this.getIncomeTotal().toFixed(2) }`;
        },

        /** Update DOM elements nodes **/
        updateDOMEle: function() {

            this.incomeText = document.querySelector('.amount-budgeted-text');
            this.totalIncomeDOM = document.querySelector('.total-income');
            this.incomeDOM = document.querySelector('.amount-budgeted-amount');
            this.incomePlanned = document.querySelectorAll('.income-planned');
            this.categoryPlanned = document.querySelectorAll('.category-planned');
        }
    }


    const summary = {

        plannedSummary: document.querySelectorAll('.planned-item'),
        spentSummary: document.querySelectorAll('.spent-item'),
        remainingSummary: document.querySelectorAll('.remaining-item'),

        setTitle: function(id) {
            
            return function(title) {

                this.planned[this.findById(id)].title = title;
            }.bind(this)
        },

        insert: function(data) {

            return this.planned.push({ 

                id: data.id, 
                title: data.title, 
                total: 0 
            });
        },

        updateTotal: function(id) {

            const items = document.querySelector(`.category-items-list-${id}`)

            if( !items ) return false;
            
            const data = items.querySelectorAll('.category-planned');

            let total = 0;

            data.forEach(item => {
                
                    total += parseFloat(item.textContent.replace(/[$]/g, ''));
            })

            this.planned[this.findById(id)].total = total.toFixed(2);

            return true;
        },

        findById: function(id) {

            let foundId;

            this.planned.forEach((item, i) => {

                if( parseInt(item.id) === parseInt(id) ) {
                    
                    foundId = i;
                    return;
                }
            })

            return foundId;
        },

        remove: function(id) {
            
            return this.planned.splice(this.findById(id), 1).length;
        },

        initPlanned: function(arr) {

            let tempArr = [];

            arr.forEach(item => tempArr.push(({
                
                id: item.dataset.id,
                title: item.textContent.replace(/[\d\s$.]/g, '' ),
                total: item.getElementsByTagName('span')[0].textContent.replace(/[$]/g, '')
            })))

            return tempArr;
            
        },

        getAllPlanned: function() {

            return this.planned;
        },

        init() {

            try {

                this.planned = this.initPlanned(this.plannedSummary);
                return true;
                
            } catch (error) {
                return false;
            }
        }
    }

    const removeRS = () => {
        const rs = document.querySelector('.rs-style');

        if ( !rs ) return;
        rs.remove();
    }

    const removeEditForm = () => {
        const editItemForm = document.querySelector(DOM.editableItemForm);

        if ( !editItemForm ) return;
        editItemForm.childNodes[0].parentNode.remove();
    }

    const removeCategoryForm = () => {

        const editCategoryForm = document.querySelector(DOM.editableCategoryForm);
        
        if ( !editCategoryForm ) return;
        editCategoryForm.childNodes[0].parentNode.remove();
    }

    const removeDate = () => {
        const dateBox = document.querySelector('.date-picker');
        if( dateBox ) {
            dateBox.remove();
            return;
        }
    }

    const incomeEle = (income, incomeItems) => {

        const itemEle = `<div class="data-item">
                    <div class="col-12 income-header">
                        <div class="row">
                            <div class="col-6 center-self">
                                    <span class="">
                                        <span class="income-header-icon"><i class="fas fa-money-bill-alt"></i></span>
                                        <span class="income-header-income">Income</span>
                                        <span class="income-header-month"><small>for</small>${income.month}</span>
                                    </span>
                                    <button type="button" class="btn no-focus clicker" data-toggle="collapse" data-target="#income-${income.id}"><i class="fas fa-caret-up fa-lg"></i></button>
                          
                            </div>
                            <div class="col-6">
                                <div class="row text-right income-header-pr-text">
                                    <div class="col-6">Planned</div>
                                    <div class="col-6">Received</div>
                                </div>
                            </div>
                        </div>                    
                    </div>

                    <div class="data-incomes-list">

                    ${ incomeItems ? incomeItems.map(item => {
                            return  `<div class="collapse show item-data" id="income-${income.id}" data-itemid="${item.id}">
                                 <div class="card card-body">
                                     <div class="row">
                                         <div class="col-6 editableItem">
                                             <span class="item-label">${item.label}</span>
                                         </div>
                                         <div class="col-6">
                                             <div class="row text-right income-header-pr-text">
                                                 <span class="col-6 editableItem income-planned">$${item.planned}</span>
                                                 <span class="col-6">$${item.spend}</span>
                                             </div>
                                         </div>
                                     </div>          
                                 </div>
                             </div>`
 
                         }).join('') : '' }       
                    </div>
                        
                    <div class="collapse show" id="income-${income.id}">
                        <div class="card card-body">
                            <div class="row">
                                <div class="col-6">
                                    <input type="hidden" class="income_id" value="${income.id}"> 
                                    <input type="hidden" class="income-category-id" value="${income.category_id}"> 
                                    <a role="button" data-toggle="" class="btn no-focus btn-add-items add-income-item-button" href="#"><i class="fas fa-plus "></i> Add Paycheck</a>  
                                </div>
                                <div class="col-6 center-self">
                                    <div class="row text-right income-header-pr-text">
                                        <div class="col-6 total-income">$${ income.budget ? income.budget : '0.00' }</div>
                                        <div class="col-6">$0.00</div>
                                    </div>
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>`;
                  
            return itemEle;
    }

    const categoriesEle = (categories) => {

        const itemEle = `${ categories.map(category => {
                
                return `<div class="data-item">
                            <div class="col-12 income-header">
                                <div class="row">
                                    <div class="col-6 center-self">
                                        <span class="editableCategory category-title" data-categoryid="${category.id}">${category.title}</span>
                                        <button type="button" class="btn no-focus clicker" data-toggle="collapse" data-target="#category-<${category.id}"><i class="fas fa-caret-up"></i></button>

                                    </div>
                                    <div class="col-6">
                                        <div class="row text-right income-header-pr-text">
                                            <div class="col-6">Planned</div>
                                            <div class="col-6">
                                                <button type="button" class="btn no-focus rs-btn">Remaining <i class="fas fa-caret-down"></i></button>
                                            </div>
        
                                        </div>
                                    </div>
                                 </div>
                            </div>
        
                            <div class="category-items-list-${category.id}">
                              
                            ${ category.items ? category.items.map((item) => {
                                    return `<div class="collapse show item-data" id="category-${category.id}" data-itemId="${item.id}">
                                        <div class="card card-body">
                                            <div class="row">
                                                <div class="col-6 editableItem">
                                                    <span class="item-label">${item.label}</span>      
                                                </div>
                                                <div class="col-6">
                                                    <div class="row text-right income-header-pr-text">
                                                        <div class="col-6 editableItem category-planned">$${item.planned}</div>
                                                        <div class="col-6">$${item.spend}</div>
                                                    </div>
                                                </div>
                                            </div>          
                                        </div>
                                      </div>`
                                }).join('') : '' }

                            </div>       
        
                            <div class="collapse show" id="category-${category.id}">
                                <div class="card card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <input type="hidden" class="category_id" value="${category.id}"> 
                                            <button role="button" data-toggle="" class="btn no-focus btn-add-items add-category-item-button" href="#"><i class="fas fa-plus"></i> Add Item</button>  
                                        </div>
                                        <div class="col-6">
                                            <div class="row text-right income-header-pr-text">
                                                <div class="col-6"></div>
                                                <div class="col-6"></div>
                                            </div>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                    </div>`                                                      
            }).join('')}`

        return itemEle;
    };


    const updateSelectedMonth = () => {
    
        const selectedMonth = document.querySelector(DOM.dateClicker).dataset;
        const activeMonths = document.querySelectorAll(DOM.dateSettings);
        
        for(let i = 0; i < activeMonths.length; i++ ) { //cant break with forEach
            
            let item = activeMonths[i].children[0].dataset;
            
            if (item.month === selectedMonth.month && item.year === selectedMonth.year) {
                activeMonths[i].classList.add('selected-month');
                break;
            } 
        }
    }

    const removeDateHeader = () => {

        const btnDatePicker = document.querySelector(DOM.btnDate);
        if( btnDatePicker ) btnDatePicker.remove();

        const budgetAmount = document.querySelector(DOM.budgetAmount);
        if( budgetAmount ) budgetAmount.remove();
    }

    const dateHeader = (month, year, income, monthBudget) => {
        
        if( !income ) {    
            removeDateHeader();

        } else {

            const amountBudgetEle = `<div class="amount-budgeted">

                <span class="amount-budgeted-amount ${ monthBudget < 0 ? 'text-danger' : '' }">
                    ${ monthBudget ? '$' + Math.abs(monthBudget).toFixed(2) : '' }
                </span>

                <span class="amount-budgeted-text">
                    ${ monthBudget ?  monthBudget < 0 ? 'over the budget' : 'left to budget' : ''  }       
                </span>

            </div>`;
            
            document.querySelector('.data-date').insertAdjacentHTML('beforeend', amountBudgetEle); 
         
        }

        const dateBtnEle = `<button type="button" id="date-picker" data-month="${month}" data-year="${year}" class="btn btn-light badyet-date no-focus">${month}
        <span class="no-events">${year} <i class="fas fa-caret-up no-focus no-events "></i></span>
        </button>`;

        document.querySelector('.data-date').insertAdjacentHTML('afterbegin', dateBtnEle); 
    }

    const renderPlannedTab = () => {

        document.querySelector('.budget-data-list').remove();

        const itemEle = `<div class="list-group budget-data-list">
            <div class="list-group budget-data-list"> 

                ${ summary.planned.map(item => {

                    return `<a href="#" class="list-group-item list-group-item-action planned-item" data-id="${ item.id }">
                        ${ item.title }
                        <span class="float-right total-planned-item">$${ item.total }</span>
                    </a>` }).join('')  }

                </div>
            </div>`;

        document.querySelector('.bottom-panel-data-budget-data').insertAdjacentHTML('beforeend', itemEle);
    }

    return {

        getCurrentSummary: () => {
            return summary;
        },

        getCurrentBudget: () => {

            return budget;
        },
        
        getIncomeAndUserKeys: () => {
            return income;
        },
        
        getDOM: () => { 
            return DOM;
        },

        addItem: (item, type) => { 
             
            const itemEle = `<div class="collapse show item-data" id="${type}-${type === 'income' ? income.incomeId : item.categoryId}" data-itemid="${item.id}">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6 editableItem">
                            <span class="income-header-income item-label">${item.label}</span>      
                        </div>
                        <div class="col-6">
                            <div class="row text-right income-header-pr-text">
                                <span class="col-6 editableItem ${type}-planned">$${item.planned}</span>
                                <span class="col-6">$${item.spend}</span>
                            </div>
                        </div>
                    </div>          
                </div>
            </div>`;

            if ( type === 'income' ) {
                
                document.querySelector(DOM.incomeList).insertAdjacentHTML('beforeend', itemEle); 
                   
            } else {

                let classStr = DOM.categoriesItemsList;         
                document.querySelector(classStr += item.categoryId).insertAdjacentHTML('beforeend', itemEle);
            }
        },

        addCategory: (category) => {
            const itemEle = `<div class="data-item">
                <div class="col-12 income-header">
                    <div class="row">
                        <div class="col-6">
                            <span class="editableCategory category-title" data-categoryid="${category.id}">${category.title}</span>
                            <button type="button" class="btn no-focus clicker" data-toggle="collapse" data-target="#category-${category.id}"><i class="fas fa-caret-up"></i></button>

                        </div>
                        <div class="col-6">
                            <div class="row text-right income-header-pr-text">
                                <div class="col-6">Planned</div>
                                <div class="col-6">
                                    <button type="button" class="btn no-focus rs-btn">Remaining</i></button> <i class="fas fa-caret-down"></i>
                                </div>
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
    
                document.querySelector(DOM.addCateClass).insertAdjacentHTML('beforebegin', itemEle);
        },

        editItem: (item, e) => {

            const itemEle = `<div class="card editable-item-form">
                <div class="row editable-form form-inline"> 
                    
                    <i data-toggle="modal" data-target=".item-data-${item.id}" class="fas fa-trash"></i>
                    <div class="col-6">
                        <input class="form-control opened-item-label" type="text" value="${item.label}" >   
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-6">
                                <input class="form-control text-right opened-item-planned" type="text" value="${item.planned}">     
                            </div>
                            <div class="col-6">
                                <input class="form-control text-right no-events" type="text" value="${item.spend}">     
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="modal fade item-data-${item.id}" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header bg-danger">
                                <h2 class="modal-title text-white">Delete ${item.label}</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="text-white" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                <p>Are you sure you want to delete <strong>${item.label}</strong>?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger close-item-modal" data-itemid="${item.id}">Yes, Delete</button>
                                <button type="button" class="btn btn-white" data-dismiss="modal">No, Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>`;

            const mainApp = document.querySelector(DOM.mainAppContainer);
            const rect = e.getBoundingClientRect();
            const posY = rect.top + mainApp.scrollTop - 15;
     
            document.querySelector(DOM.mainPanelContainer).insertAdjacentHTML('beforeend', itemEle);
            document.querySelector(DOM.editableItemForm).style.top = `${posY}px`;
        },

        editCategory: (category, e) => {
            const catEle = `<div class="card editable-category-form">
                    <div class="row editable-form form-inline"> 
                        <i data-toggle="modal"data-toggle="tooltip" data-placement="top" title="Delete Group" data-target=".category-data-${category.id}" class="fas fa-trash"></i>
                        <div class="col-12">
                            <input class="form-control opened-category-title" type="text" value="${category.title}" >   
                        </div>
                    </div>

                    <div class="modal fade category-data-${category.id}" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header bg-danger">
                                    <h2 class="modal-title text-white">Delete ${category.title}</h2>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-white" aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body text-center">
                                    <p>Are you sure you want to delete <strong>${category.title}</strong> and its budget items?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger close-category-modal" data-categoryid="${category.id}" >Yes, Delete</button>
                                    <button type="button" class="btn btn-white" data-dismiss="modal">No, Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div> `;
            
            const mainApp = document.querySelector(DOM.mainAppContainer);
            const rect = e.target.getBoundingClientRect();
            const posY = rect.top + mainApp.scrollTop - 22;
            const posX = rect.left - 305;
 
            document.querySelector(DOM.mainPanelContainer).insertAdjacentHTML('beforeend', catEle);
            const categoryForm = document.querySelector(DOM.editableCategoryForm);

            categoryForm.style.top = `${posY}px`;           
            categoryForm.style.left = `${posX}px`;           
        },

        deleteItem: (id) => {

            //remov the button
            document.querySelector('.close-item-modal').remove();
            const itemEle = `<button type="button" class="btn btn-danger"><div class="spinner-border spinner-border-sm text-white" role="status">
                    <span class="sr-only">Loading..</span>
                </div> Deleting...</button>`;
            
                //replace new button with itemEle
            document.querySelector('.modal-footer').insertAdjacentHTML('afterbegin', itemEle);

            const node = document.querySelector(`[data-itemid="${id}"]`);

            //delay removing modal and opened edit form
            setTimeout(() => {
                $(".modal").modal('hide')
                    setTimeout(() => {
                        $(".modal").remove();
                        $('.modal-backdrop').remove();
                        removeEditForm();
                        node.remove();
                        budget.updateIncome();
                    }, 400)           
            }, 600);      
        },

        deleteCategory: (id) => {

             //remov the button
             document.querySelector('.close-category-modal').remove();
             const itemEle = `<button type="button" class="btn btn-danger"><div class="spinner-border spinner-border-sm text-white" role="status">
                     <span class="sr-only">Loading..</span>
                 </div> Deleting...</button>`;
             
             //replace new button with itemEle
             document.querySelector('.modal-footer').insertAdjacentHTML('afterbegin', itemEle);


            const node = document.querySelector(`.category-items-list-${id}`).closest('.data-item');

             //delay removing modal and opened edit form
             setTimeout(() => {
                 $(".modal").modal('hide')
                     setTimeout(() => {
                         $(".modal").remove();
                         $('.modal-backdrop').remove();
                         removeCategoryForm();
                         node.remove();
                         budget.updateIncome();
                         renderPlannedTab();
                     }, 500)           
             }, 800);
        },

        noIncome: (month, year) => {

            const itemEle = `<div class="col category-list">
                    <div class="data-item text-center no-income-header">
                        <h4 class="font-weight-bold">Hi There, looks like you need a budget for ${month} ${year}</h4>
                        <button type="button" class="btn btn-info newIncome" role="button" href="/">Start Planning for ${month}</button>
                    </div>  
                </div>`;
            
            dateHeader(month, year);
            document.querySelector('.category-list').remove();
            document.querySelector('.main-data').insertAdjacentHTML('afterbegin', itemEle); 
        },

        showCreatedIncome: () => {

        },

        showLoading: (text) => {

            const itemEle = `<div class="col category-list">
                <div class="data-item text-center loading-header">
                    <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status"><span class="sr-only">Loading...</span></div>
                    <h5>${text}</h5>
                </div>
            </div>`;


            document.querySelector('.category-list').remove();
            document.querySelector('.main-data').insertAdjacentHTML('afterbegin', itemEle); 
        },

        showIncomeData: (income, incomeItems, categories, budget) => {
            const itemEle = `<div class="col category-list">
                ${incomeEle(income, incomeItems)}
                
                ${ categories ? categoriesEle(categories) : '' }

                <div class="data-item add-group-category">
                    <input type="hidden" class="csrf_token" name="_csrf" value="<%#= csrfToken %>">    
                    <button role="button" data-toggle="" class="btn no-focus add-category-button" href="#"><i class="fas fa-plus"></i>ADD GROUP</button> 
                </div> 
            </div>`;
        

            document.querySelector('.category-list').remove();
            dateHeader(income.month, income.year, income, budget);
            document.querySelector('.main-data').insertAdjacentHTML('afterbegin', itemEle); 
        },    

        showDatePicker: (dates) => {

            let active = '';
             
            const dateEle = `<div class="row date-picker">
                <div class="col">
                <div class="row text-center" style="height: 100%; padding: 10px;">
            
                    <div class="col date-settings prevDate"><i class="fas fa-arrow-left"></i></div>

                    ${ dates.map(element => {          
                        active = element.active ? `<div class="col date-settings active-months">` : `<div class="col date-settings">`;

                        return active  + `<div data-month="${element.month.long}" data-year="${element.year}">${element.month.short}</div>
                            <small>${element.year}</small>
                        </div>`}).join('') 
                    }
                    
                    <div class="col date-settings nextDate"><i class="fas fa-arrow-right"></i></div>
                </div>
                </div>
            </div>`;

            document.querySelector('#date-picker').insertAdjacentHTML('afterend', dateEle);
        },

        showRSPicker: (e) => {

            const itemEle = `<div class="row text-center rs-style">           
                <div class="col-12">
                    <div class="list-group rs-style-tab" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action category-remaining" data-toggle="list" href="#remaining" role="tab" aria-controls="home">Remaining</a>
                    <a class="list-group-item list-group-item-action category-spent" data-toggle="list" href="#spent" role="tab" aria-controls="profile">Spent</a>
                    </div>
                    </div>                    
                </div>`;
         
                e.insertAdjacentHTML('afterbegin', itemEle);           
        },

        renderSpent: () => {
            const rsBtn = document.querySelectorAll(DOM.rsButton);
         
            rsBtn.forEach(rs => {

                rs.textContent = 'Spent';
            })
        },

        renderRemaining: () => {
            const rsBtn = document.querySelectorAll(DOM.rsButton);

            rsBtn.forEach(rs => {

                rs.textContent = 'Remaining';
            })
        },

        renderSpentTab: () => {

            `<div class="list-group budget-data-list">
                    <% summary.forEach( cate => { %>
                        <a href="#" class="list-group-item list-group-item-action budget-data-item">
                            <%= cate.title %>
                            <span class="float-right">$<%= cate.total %> </span>
                        </a>

                    <% })  %>  
                </div>`;
        },

        renderRemainingTab: () => {

            `<div class="list-group budget-data-list">
                    <% summary.forEach( cate => { %>
                        <a href="#" class="list-group-item list-group-item-action budget-data-item">
                            <%= cate.title %>
                            <span class="float-right">$<%= cate.total %> </span>
                        </a>

                    <% })  %>  
                </div>`;
        },

        removeEditForm: removeEditForm,
        removeCategoryForm: removeCategoryForm,
        removeDate: removeDate,
        removeRS: removeRS,
        updateSelectedMonth: updateSelectedMonth,
        removeDateHeader: removeDateHeader,
        renderPlannedTab: renderPlannedTab
    }
})(); 