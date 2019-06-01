import { UIController } from './UIController.js';
import { MainController } from './MainController.js';

const appController = ((uiController, mainController) => {

    const income = {  //current month budget
        id: uiController.getIncomeAndUserKeys().incomeId,
        categoryId: uiController.getIncomeAndUserKeys().incomeCategoryId
    }

    const itemSelected = {}
    const categorySelected = {}
    const DOM = UIController.getDOM();

    const forms = [  mainController.itemChange, mainController.categoryChange, uiController.removeEditForm, uiController.removeCategoryForm ];

    const setUpEventListener = () => {

        document.querySelector(DOM.mainPanelContainer).addEventListener('click', clickOnMainPanel, false); //category list container
        document.querySelector(DOM.rightPanelContainer).addEventListener('click', clickOnMainRightPanel, false); //category list container
        document.querySelector(DOM.leftPanelContainer).addEventListener('click', clickOnMainLeftPanel, false); //category list container
    };

    const clickOnMainLeftPanel = e => {

        mainController.clearUpdate(forms);
    }

    const clickOnMainRightPanel = e => {

        mainController.clearUpdate(forms);
    }

    const clickOnMainPanel = e => {
        
        const targetClassList = e.target.classList;
      
        if( targetClassList.contains(DOM.btnAddIncomeItem.slice(1))) {

            mainController.clearUpdate(forms);
            mainController.addItem(income.categoryId, 'income');
        
        } else if ( targetClassList.contains(DOM.btnAddCategoryItem.slice(1) )) {
            
            const catId = e.target.previousElementSibling.value;;
            mainController.clearUpdate(forms);
            mainController.addItem(catId, 'category');

        } else if (  targetClassList.contains(DOM.editableItem.slice(1) )) {
            
            itemSelected.id = e.target.closest(DOM.itemData).dataset.itemid;
            itemSelected.node = e.target.closest(DOM.itemData);
            mainController.getItem(itemSelected.id, e);
            mainController.clearUpdate(forms);
         
        } else if ( targetClassList.contains(DOM.editableCategory.slice(1) )) {

            categorySelected.id = e.target.dataset.categoryid;
            categorySelected.node = e.target.closest(DOM.dataItem);
            mainController.getCategory(categorySelected.id, e);
            mainController.clearUpdate(forms);

        } else if ( targetClassList.contains(DOM.btnAddCategory.slice(1) )) {
            
            mainController.addGroup(income.id);
            mainController.clearUpdate(forms);
            
        } else if ( targetClassList.contains(DOM.clickerIcon.slice(1) )) {

            targetClassList.toggle('fa-rotate-180');
            mainController.clearUpdate(forms);
           
        } else if(e.target.classList.contains(DOM.itemModal.slice(1))) {

            mainController.deleteItem(itemSelected.node, itemSelected.id);

        } else if(e.target.classList.contains(DOM.categoryModal.slice(1))) {
            
            mainController.deleteCategory(categorySelected.id , categorySelected.node);

        } else {

            mainController.clearUpdate(forms, 2);
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