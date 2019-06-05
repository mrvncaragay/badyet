import { UIController } from './UIController.js';
import { MainController } from './MainController.js';

const appController = ((uiController, mainController) => {

    const income = {  //current month budget
        id: mainController.selectedMonthIncome.incomeId,
        categoryId: mainController.selectedMonthIncome.incomeCategoryId
    }

    const itemSelected = {}
    const categorySelected = {}
    const DOM = uiController.getDOM();

    const forms = [  mainController.itemChange, mainController.categoryChange, mainController.removeItemForm, mainController.removeCategoryForm, uiController.removeDate ];

    const setUpEventListener = () => {

        document.querySelector('.main-date').addEventListener('click', clickOnDatePanel, false); //category list container
        document.querySelector(DOM.mainPanelContainer).addEventListener('click', clickOnMainPanel, false); //category list container
        document.querySelector(DOM.rightPanelContainer).addEventListener('click', clickOnMainRightPanel, false); //category list container
        document.querySelector(DOM.leftPanelContainer).addEventListener('click', clickOnMainLeftPanel, false); //category list container
        document.addEventListener('keypress', (e) => {
            if ( e.key === 13 || e.which === 13 ) mainController.clearUpdate(forms);
        }); //keypress enter
    };

    const clickOnDatePanel = e => {

        const targetClassList = e.target.classList;

        if ( targetClassList.contains(DOM.btnDate.slice(1))) {

            const datebox = document.querySelector('.date-picker');
            e.target.querySelector('.fa-caret-up').classList.toggle('fa-rotate-180');

            if ( !datebox ) {
                
                mainController.showDatePicker();
            } else {

                if(  datebox.style.visibility === 'hidden')  {

                    datebox.style.visibility = 'visible';
                    return;       
                }
                datebox.style.visibility = 'hidden';       
            }
             
        } else if (targetClassList.contains('prevDate')) {
            
            uiController.removeDate()
            mainController.showDatePicker('prev');


        } else if (targetClassList.contains('nextDate')) {
 
            uiController.removeDate()
            mainController.showDatePicker('next');


        } else if (targetClassList.contains('date-settings')) {

            uiController.removeDate()
            mainController.showPickedDate(e.target.children[0].dataset.month, e.target.children[1].innerHTML);

        }else {
            
            mainController.clickSelfDate(e);
        }
        
    }

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

            mainController.addGroup();
            mainController.clearUpdate(forms);
            
        } else if ( targetClassList.contains(DOM.clickerIcon.slice(1) )) {

            targetClassList.toggle('fa-rotate-180');
            mainController.clearUpdate(forms);
           
        } else if(e.target.classList.contains(DOM.itemModal.slice(1))) {

            mainController.deleteItem(itemSelected.node, itemSelected.id);

        } else if(e.target.classList.contains(DOM.categoryModal.slice(1))) {
            
            mainController.deleteCategory(categorySelected.id , categorySelected.node);

        } else if(e.target.classList.contains(DOM.btnAddIncome.slice(1))) {

            mainController.addIncome();
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