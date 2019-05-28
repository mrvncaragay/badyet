import { budgetController } from './badyet.js';

const appController = (budget => {

    const domStrings = budget.getDoomStrings();
    const keys = budget.getIncomeAndUserKeys();
    let item;
    
    const setUpEventListener = () => {

        document.querySelector(domStrings.btnAddGroupCategory).addEventListener('click', addNewCategory, false); //add group button
        document.querySelector(domStrings.categoryList).addEventListener('click', clickedOnMain, false); //category list container
        document.querySelector('.right-panel-container').addEventListener('click', clickOnMainRightPanel, false); //category list container
        document.querySelector('.left-panel-container').addEventListener('click', clickOnMainLeftPanel, false); //category list container
        //need to fix main date panel to remove open editable form
    };

    const clickOnMainLeftPanel = (el) => {
        removeEditableForm();
    }

    const clickOnMainRightPanel = (el) => {
        removeEditableForm();
    }

    const clickedOnMain = (el) => {

        const targetEl = el.target.classList;

        if( targetEl.contains(domStrings.btnAddCategoryItem.slice(1) )) {
 
            addNewCategoryItem(el);

        } else if ( targetEl.contains(domStrings.btnAddIncomeItem.slice(1) )) {
 
            addNewIncomeItem();

        } else if ( targetEl.contains(domStrings.clickerIcon.slice(1) )) {
 
            rotateArrowIcon(el);

        } else if (  targetEl.contains(domStrings.editable.slice(1) )) {
            
            insertEditableForm(el);

        } else {

            removeEditableForm();
        }
    }
    

    const removeEditableForm = () => {

        const editForm = document.querySelector(domStrings.editableForm);

        if ( !editForm ) return;

        //When we close the item check if the values have changed!
        const label = document.querySelector(domStrings.itemLabel).value;
        const planned = document.querySelector(domStrings.itemPlanned).value;
        
        console.log(label, planned);

        editForm.childNodes[0].parentNode.remove();
    }

    const updateEditFormIfChangeOccurs = (item) => {
        console.log('called again!')
        //const itemId = el.target.closest(domStrings.itemData).dataset.itemid;

    }   

    const insertEditableForm = el => {

        //check if there is and edit form open if there is remove it.
        removeEditableForm();

        const mainAppContainer = document.querySelector('.main-app-container');
        const rect = el.target.getBoundingClientRect();
        const posY = rect.top + mainAppContainer.scrollTop; //target element top + main container scroll top

        const itemId = el.target.closest(domStrings.itemData).dataset.itemid;
        axios.get(`/app/item/${itemId}`)
        .then(success => {

            item = success.data.item;
            budget.editItemForm(posY - 25, item);
            //Enable the edit form open state
            //document.querySelector(domStrings.editableForm).addEventListener('click', updateEditFormIfChangeOccurs, false);
        })
        .catch(err => console.log(err));
    };

 
    const addNewCategoryItem = el => {

            removeEditableForm();
            const categoryId = el.target.previousElementSibling.value;
        
            axios.post('/app/category-item', {

                categoryId: categoryId
            })
            .then(success => {
    
                const { item }  = success.data 
                budget.addCategoryItem(item);
              })
              .catch(err => console.log(err)); 
    };

    const addNewIncomeItem = () => {

        removeEditableForm();
        axios.post('/app/income-item', {

            label: 'Paycheck',
            categoryId: keys.incomeCategoryId
        })
        .then(success => {

            const { item }  = success.data 

            budget.addIncomeItem(item);
            
          })
          .catch(err => console.log(err)); 
    };

    const addNewCategory = () => {
        
        removeEditableForm();
        axios.post('/app/category', {

            incomeId: keys.incomeId
          })
          .then(success => {

            const { category }  = success.data 

            if( budget.checkTempCategory() ) budget.removeTempCategory();

            budget.addCategory(category);
            setUpEventListener();
          })
          .catch(err => console.log(err));       
    };

    const rotateArrowIcon = (e) => {

        removeEditableForm();
        const el = e.target.parentNode.closest(domStrings.clickerIcon);

        if( el ) el.classList.toggle('fa-rotate-180');
    };



    return {
        init: () => {
            setUpEventListener();
        }
    };

})(budgetController);

appController.init();




// (() => {

//     document.querySelector('#btn-sign-in').addEventListener('click', alertMe);

//     function alertMe() {
//         document.querySelector('#btn-sign-in').remove();

//         const newButton = `<button class="btn btn-primary btn-block" type="button" disabled>
//             <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//             Signing in...
//         </button>`;

//         document.querySelector('.main-form-policy').insertAdjacentHTML('beforebegin', newButton);
//         document.querySelector('#form-sign-in').submit();
//     };
// })();