
export const budgetController = (() => {

  

    return {


        checkTempCategory: () => {
           
            return document.querySelector(DOM.removableCategory) ? true : false;
        },

        removeTempCategory: () => {

            document.querySelector(DOM.removableCategory).remove();                   
        },

        editItemForm: (posY, item) => {
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
            </div>
            
            <div class="modal fade item-data-${item.id}" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                    ...
                    </div>
                </div>
            </div>`;

            
            document.querySelector(DOM.mainPanelContainer).insertAdjacentHTML('beforeend', itemEle);
            document.querySelector(DOM.editableForm).style.top = `${posY}px`;
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

                    
            document.querySelector(DOM.categoryList).insertAdjacentHTML('beforeend', itemEle);
        }
    }

})();