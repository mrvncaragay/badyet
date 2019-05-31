import { UIController } from './UIController.js';
import { MainController } from './MainController.js';

const appController = ((uiController, mainController) => {

    const STATE = {
        item: {}, //YES
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
        mainController.categoryChange();
        uiController.removeEditForm();
        uiController.removeCategoryForm();
    }

    const clickOnMainLeftPanel = e => {
        mainController.itemChange();
        mainController.categoryChange();
        uiController.removeEditForm();
        uiController.removeCategoryForm();
    }

    const clickOnMainRightPanel = e => {
        mainController.itemChange();
        mainController.categoryChange();
        uiController.removeEditForm();
        uiController.removeCategoryForm();
    }

    const clickOnMainPanel = e => {
        
        const targetClassList = e.target.classList;
      
        if( targetClassList.contains(DOM.btnAddIncomeItem.slice(1))) {

            mainController.itemChange();
            mainController.categoryChange();
            mainController.addItem(STATE.income.categoryId, 'income');
            uiController.removeCategoryForm();
            uiController.removeEditForm();
        
        } else if ( targetClassList.contains(DOM.btnAddCategoryItem.slice(1) )) {

            mainController.itemChange();
            mainController.categoryChange();
            STATE.category.id = e.target.previousElementSibling.value;
            mainController.addItem(STATE.category.id, 'category');
            uiController.removeCategoryForm();
            uiController.removeEditForm();

        } else if (  targetClassList.contains(DOM.editableItem.slice(1) )) {
            
            STATE.item.id = e.target.closest(DOM.itemData).dataset.itemid;
            STATE.item.node = e.target.closest(DOM.itemData);
            mainController.getItem(STATE.item.id, e);
            mainController.itemChange();
            mainController.categoryChange();
            uiController.removeCategoryForm();
            uiController.removeEditForm();
         
        } else if ( targetClassList.contains(DOM.editableCategory.slice(1) )) {

            STATE.category.id = e.target.dataset.categoryid;
            STATE.category.node = e.target.closest(DOM.dataItem);
            mainController.getCategory(STATE.category.id, e);
            mainController.categoryChange();
            uiController.removeCategoryForm();
            uiController.removeEditForm();

        } else if ( targetClassList.contains(DOM.btnAddCategory.slice(1) )) {
            
            mainController.itemChange();
            mainController.categoryChange();
            mainController.addGroup(STATE.income.id);
            uiController.removeEditForm();
            uiController.removeCategoryForm();
            
        } else if ( targetClassList.contains(DOM.clickerIcon.slice(1) )) {

            mainController.itemChange();
            mainController.categoryChange();

            targetClassList.toggle('fa-rotate-180');

            uiController.removeEditForm();
            uiController.removeCategoryForm();
           
        } else if(e.target.classList.contains(DOM.itemModal.slice(1))) {

            mainController.deleteItem(STATE.item.node, STATE.item.id);

        } else if(e.target.classList.contains(DOM.categoryModal.slice(1))) {
            
            mainController.deleteCategory(STATE.category.node, STATE.category.id);

        } else {

            mainController.itemChange();
            mainController.categoryChange();
            mainController.clickSelfItem(e);
            mainController.clickSelfCategory(e);
    
         }
    }

    return {
        init: () => {
            setUpEventListener();
        }
    };

})(UIController, MainController);

appController.init();