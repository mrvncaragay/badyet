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
        editableItem: '.editableItem', //YES
        editableCategory: '.editableCategory', //YES
        itemData: '.item-data', //YES
        dataItem: '.data-item', //YES
        editableItemForm: '.editable-item-form', //YES
        editableCategoryForm: '.editable-category-form', //YES
        itemLabel: '.opened-item-label',
        itemPlanned: '.opened-item-planned',
        categoryTitle: '.opened-category-label',
        itemModal: '.close-item-modal',
        categoryModal: '.close-category-modal'
    }

    const getKeys = {
        incomeId: document.querySelector(DOM.incomeId).value, //YES
        userId: document.querySelector(DOM.userId).value, 
        csrfToken: document.querySelector(DOM.csrfToken).value,
        incomeCategoryId: document.querySelector(DOM.incomeCategoryId).value //YES
    }

    //separate this category
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
                                <span class="col-6 editableItem item-planned">$${item.planned}</span>
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
                            <span class="income-header-income editableCategory category-title" data-categoryid="${category.id}">${category.title}</span>
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
                                    <button type="button" class="btn btn-danger close-category-modal">Yes, Delete</button>
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

        deleteCategory: (node) => {

             //remov the button
             document.querySelector('.close-category-modal').remove();
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
                         removeCategoryForm();
                         node.remove();
                     }, 500)           
             }, 800);
        },

        removeEditForm: removeEditForm,

        removeCategoryForm: removeCategoryForm
    }
})(); 