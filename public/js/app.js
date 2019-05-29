import { UIController } from './UIController.js';
import { MainController } from './MainController.js';

const appController = ((uiController, mainController) => {

    const STATE = {
        item: {}, //YES
        user: {}, 
        income: {}, //YES
        category: {} //YES
    };

    const DOM = UIController.getDOM();
    STATE.income.categoryId = uiController.getIncomeAndUserKeys().incomeCategoryId;

    //const middleDOM = {};
    //let currentItemSelected;

    const setUpEventListener = () => {

        //document.querySelector(DOM.btnAddGroupCategory).addEventListener('click', addNewCategory, false); //add group button
        document.querySelector(DOM.mainPanelContainer).addEventListener('click', clickOnMainPanel, false); //category list container
        document.querySelector(DOM.rightPanelContainer).addEventListener('click', clickOnMainRightPanel, false); //category list container
        document.querySelector(DOM.leftPanelContainer).addEventListener('click', clickOnMainLeftPanel, false); //category list container
        //need to fix main date panel to remove open editable form
    };

    const clickOnMainLeftPanel = e => {
        uiController.removeEditForm();
    }

    const clickOnMainRightPanel = e => {
        uiController.removeEditForm();
    }

    const clickOnMainPanel = e => {
        
        const targetClassList = e.target.classList;
        
        if( targetClassList.contains(DOM.btnAddIncomeItem.slice(1))) {

            mainController.addItem(STATE.income.categoryId, 'income');
        
        } else if ( targetClassList.contains(DOM.btnAddCategoryItem.slice(1) )) {

            STATE.category.id = e.target.previousElementSibling.value;
            mainController.addItem(STATE.category.id, 'category');

        } else if (  targetClassList.contains(DOM.editable.slice(1) )) {
            
            STATE.item.id = e.target.closest(DOM.itemData).dataset.itemid;
            mainController.getItem(STATE.item.id, e);

        } else if ( targetClassList.contains(DOM.editableForm.slice(1) )) {
 
            console.log('inside editable')

        } else if ( targetClassList.contains(DOM.clickerIcon.slice(1) )) {
 
            //rotateArrowIcon(el);

        } else {
            uiController.removeEditForm();
        }
    }




    return {
        init: () => {
            setUpEventListener();
        }
    };

})(UIController, MainController);

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