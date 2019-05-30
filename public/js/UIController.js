export const UIController = (() => {

    const DOM = {

        mainAppContainer: '.main-app-container', //YES
        mainPanelContainer: '.main-panel-container', //YES
        rightPanelContainer: '.right-panel-container',
        leftPanelContainer: '.left-panel-container',
        categoryList: '.category-list',
        btnAddCategory: '.add-category-button', //YES
        btnAddIncomeItem: '.add-income-item-button',
        btnAddCategoryItem: '.add-category-item-button',
        incomeId: '.income_id',
        userId: '.user_id',
        incomeCategoryId: '.income-category-id', //YES
        categoryId: '.category_id',
        csrfToken: '.csrf_token',
        removableCategory: '.removable-category',
        incomeList: '.data-incomes-list', //YES
        categoriesList: '.categories-list', //can delete later
        categoriesItemsList: '.category-items-list-', //YES
        clickerIcon: '.clicker', //YES
        editable: '.editableItem', //YES
        itemData: '.item-data',
        editableForm: '.editable-item-form', //YES
        itemLabel: '.opened-item-label',
        itemPlanned: '.opened-item-planned'
    }

    const getKeys = {
        incomeId: document.querySelector(DOM.incomeId).value, //YES
        userId: document.querySelector(DOM.userId).value,
        csrfToken: document.querySelector(DOM.csrfToken).value,
        incomeCategoryId: document.querySelector(DOM.incomeCategoryId).value
    }


    return {
        
        getIncomeAndUserKeys: () => {
            return getKeys;
        },
        
        getDOM: () => { 
            return DOM;
        },

        addItem: (item, type) => { 
             
            const itemEle = `<div class="collapse show item-data" id="${'type-' + getKeys.incomeId}" data-itemid="${item.id}">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6 editableItem">
                            <span class="income-header-income item-label">${item.label}</span>      
                        </div>
                        <div class="col-6">
                            <div class="row text-right income-header-pr-text">
                                <span class="col-6 editableItem item-planned">$0.0${item.planned}</span>
                                <span class="col-6">$0.0${item.spend}</span>
                            </div>
                        </div>
                    </div>          
                </div>
            </div>`;

            if ( type === 'income' ) {
                
                document.querySelector(DOM.incomeList).insertAdjacentHTML('beforeend', itemEle); 
                   
            } else {

                let classStr = DOM.categoriesItemsList;
                classStr += item.categoryId;
                document.querySelector(classStr).insertAdjacentHTML('beforeend', itemEle);
            }
        },

        addCategory: (category) => {
            const itemEle = `<div class="data-item">
                <div class="col-12 income-header">
                    <div class="row">
                        <div class="col-6">
                                <span class="">
                                    <span class="income-header-income editableItem">${category.title}</span>
                                </span>
                                <button type="button" class="btn no-focus"><i data-toggle="collapse" data-target="#category-${category.id}>" class="fas fa-caret-up clicker"></i></button>

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
             
                document.querySelector(DOM.categoryList).insertAdjacentHTML('beforeend', itemEle);
        },

        editForm: (item, e) => {
           
            const itemEle = `<div class="card editable-item-form">
                <div class="row editable-form form-inline"> 
                    
                    <i data-toggle="modal" data-target=".item-data-${item.id}" class="fas fa-times"></i>
                    <div class="col-6">
                        <input class="form-control form-control-lg opened-item-label" type="text" value="${item.label}" >   
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-6">
                                <input class="form-control text-right form-control-lg opened-item-planned" type="text" value="${item.planned}">     
                            </div>
                            <div class="col-6">
                                <input class="form-control text-right form-control-lg" type="text" value="${item.spend}">     
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="modal fade item-data-${item.id}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                        ...
                        </div>
                    </div>
                </div>          
            </div>`;

            
            const mainPanel= document.querySelector(DOM.mainPanelContainer);
            const rect = e.target.getBoundingClientRect();
            const posY = rect.top; //target element top + main container scroll top

            document.querySelector(DOM.mainAppContainer).insertAdjacentHTML('beforeend', itemEle);
            document.querySelector(DOM.editableForm).style.top = `${posY}px`;
            document.querySelector(DOM.editableForm).style.left = `${rect.left}px`;

        },

        removeEditForm: () => {
            const editForm = document.querySelector(DOM.editableForm);

            if ( !editForm ) return;
            editForm.childNodes[0].parentNode.remove();
        }

    }
})(); 