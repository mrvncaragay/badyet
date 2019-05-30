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
    STATE.income.id = uiController.getIncomeAndUserKeys().incomeId;

    const setUpEventListener = () => {

        document.querySelector(DOM.mainPanelContainer).addEventListener('click', clickOnMainPanel, false); //category list container
        document.querySelector(DOM.rightPanelContainer).addEventListener('click', clickOnMainRightPanel, false); //category list container
        document.querySelector(DOM.leftPanelContainer).addEventListener('click', clickOnMainLeftPanel, false); //category list container
        document.querySelector(DOM.mainAppContainer).addEventListener('scroll', closeOpenedForm, false);
    };

    const closeOpenedForm = () => {
        mainController.itemChange();
        uiController.removeEditForm();
    }

    const clickOnMainLeftPanel = e => {
        mainController.itemChange();
        uiController.removeEditForm();
    }

    const clickOnMainRightPanel = e => {
        mainController.itemChange();
        uiController.removeEditForm();
    }

    const clickOnMainPanel = e => {
        
        const targetClassList = e.target.classList;
      
        if( targetClassList.contains(DOM.btnAddIncomeItem.slice(1))) {

            mainController.itemChange();
            mainController.addItem(STATE.income.categoryId, 'income');
            uiController.removeEditForm();
        
        } else if ( targetClassList.contains(DOM.btnAddCategoryItem.slice(1) )) {

            mainController.itemChange();
            STATE.category.id = e.target.previousElementSibling.value;
            mainController.addItem(STATE.category.id, 'category');
            uiController.removeEditForm();

        } else if (  targetClassList.contains(DOM.editable.slice(1) )) {
            
            STATE.item.id = e.target.closest(DOM.itemData).dataset.itemid;
            mainController.getItem(STATE.item.id, e);
            mainController.itemChange();
            uiController.removeEditForm();
         
        } else if ( targetClassList.contains(DOM.btnAddCategory.slice(1) )) {
            
            mainController.itemChange();
            mainController.addGroup(STATE.income.id);
            uiController.removeEditForm();
            
        } else if ( targetClassList.contains(DOM.clickerIcon.slice(1) )) {

            targetClassList.toggle('fa-rotate-180')
           
        } else {
            mainController.itemChange();
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