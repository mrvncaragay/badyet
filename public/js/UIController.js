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
        itemData: '.item-data', //YES
        editableForm: '.editable-item-form', //YES
        itemLabel: '.opened-item-label',
        itemPlanned: '.opened-item-planned',
        itemModal: '.close-item-modal'
    }

    const getKeys = {
        incomeId: document.querySelector(DOM.incomeId).value, //YES
        userId: document.querySelector(DOM.userId).value,
        csrfToken: document.querySelector(DOM.csrfToken).value,
        incomeCategoryId: document.querySelector(DOM.incomeCategoryId).value
    }

    const removeEditForm = () => {
        const editForm = document.querySelector(DOM.editableForm);
        if ( !editForm ) return;
        editForm.childNodes[0].parentNode.remove();
    }


    return {
        
        getIncomeAndUserKeys: () => {
            return getKeys;
        },
        
        getDOM: () => { 
            return DOM;
        },

        addItem: (item, type) => { 
             
            const itemEle = `<div class="collapse show item-data" id="${type}-${type === 'income' ? getKeys.incomeId : item.categoryId}" data-itemid="${item.id}">
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
                document.querySelector(classStr += item.categoryId).insertAdjacentHTML('beforeend', itemEle);
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

                
                <div class="modal fade item-data-${item.id}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-danger">
                            <h2 class="modal-title text-white text-right">Delete ${item.label}</h2>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span class="text-white" aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body text-center">
                            <p>Are you sure you want to delete ${item.label}</p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger close-item-modal">Yes, Delete</button>
                            <button type="button" class="btn btn-white" data-dismiss="modal">No, Cancel</button>
                          </div>
                    </div>
                </div>
                </div>        
            </div>`;

            const mainApp = document.querySelector(DOM.mainAppContainer);
            const rect = e.target.getBoundingClientRect();
            const posY = rect.top + mainApp.scrollTop - 15;
     
            document.querySelector(DOM.mainPanelContainer).insertAdjacentHTML('beforeend', itemEle);
            document.querySelector(DOM.editableForm).style.top = `${posY}px`;
        },

        deleteItem: (node) => {

            //remov the button
            document.querySelector('.close-item-modal').remove();
            const itemEle = `<button type="button" class="btn btn-danger"><div class="spinner-border spinner-border-sm text-white" role="status">
                    <span class="sr-only">Loading..</span>
                </div> Deleting...</button>`;
            
                //replace new button with itemEle
            document.querySelector('.modal-footer').insertAdjacentHTML('afterbegin', itemEle);

            //delay removing modal and opened edit form
            setTimeout(() => {
                $(".modal").modal('hide')
                    setTimeout(() => {
                        $(".modal").remove();
                        $('.modal-backdrop').remove();
                        removeEditForm();
                        node.remove();
                    }, 400)           
            }, 600);


            
        },

        removeEditForm: removeEditForm
    }
})(); 