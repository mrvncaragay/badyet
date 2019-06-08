import { UIController } from './UIController.js';
import { MainController } from './MainController.js';

const appController = ((uiController, mainController) => {

    const income = {  //current month budget
        id: mainController.selectedMonthIncome.incomeId,
        categoryId: mainController.selectedMonthIncome.incomeCategoryId
    }

    const DOM = uiController.getDOM();
    const summary = uiController.getCurrentSummary();

    const formRemover = [ mainController.removeItemForm, mainController.removeCategoryForm, uiController.removeRS, uiController.removeDate ];
    const updateListener = [];

    const setUpEventListener = () => {

        document.querySelector('.main-date').addEventListener('click', clickOnDatePanel, false); //category list container
        document.querySelector(DOM.mainPanelContainer).addEventListener('click', clickOnMainPanel, false); //category list container
        document.querySelector(DOM.rightPanelContainer).addEventListener('click', clickOnMainRightPanel, false); //category list container
        document.querySelector(DOM.leftPanelContainer).addEventListener('click', clickOnMainLeftPanel, false); //category list container
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
            
            uiController.removeDate();
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

        if( updateListener.length > 0 ) {

            mainController.eachFnc(updateListener);  
        }

        mainController.eachFnc(formRemover);
        
    }

    const clickOnMainRightPanel = e => {

        if( updateListener.length > 0 ) {

            mainController.eachFnc(updateListener);  
        }

        mainController.eachFnc(formRemover);

        const targetClassList = e.target.classList;

        if( targetClassList.contains(DOM.tabDataPlanned.slice(1))) {
            
            mainController.renderPlannedTab();
           
            console.log('planned')

        } else if( targetClassList.contains(DOM.tabDataSpent.slice(1))) {
            
            mainController.renderSpentTab();
            console.log('spent')

        } else if( targetClassList.contains(DOM.tabDataRemaining.slice(1))) {
            
            mainController.renderRemainingTab();
            console.log('remaining')
            
        }
        
    }

    //uiController.updateBudgetSummary(data);

    const clickOnMainPanel = e => {

        if( updateListener.length > 0 ) {

            mainController.eachFnc(updateListener);  
        }
        
        const targetClassList = e.target.classList;
      
        if( targetClassList.contains(DOM.btnAddIncomeItem.slice(1))) {
         
            mainController.eachFnc(formRemover);  
            mainController.addItem(income.categoryId, 'income');
        
        } else if ( targetClassList.contains(DOM.btnAddCategoryItem.slice(1) )) {
            
            mainController.eachFnc(formRemover);  
            const catId = e.target.previousElementSibling.value;    
            mainController.addItem(catId, 'category');

        } else if ( targetClassList.contains(DOM.editableItem.slice(1) )) {

            const node = e.target.closest(DOM.itemData);     
       
            mainController.getItem(node.dataset.itemid)
                .then(data => { 

                    uiController.editItem(data, e.target);
                    updateListener.pop();
                    updateListener.push(mainController.itemChange(data, node, summary)); 
                })
                .catch(err => console.log(err))

            mainController.eachFnc(formRemover);  
            
        } else if ( targetClassList.contains(DOM.editableCategory.slice(1) )) {
         
            const node = e.target;
        
            mainController.getCategory(node.dataset.categoryid)
                .then(data => {

                    const fn = summary.setTitle(data.id);
                    uiController.editCategory(data, e);  
                    updateListener.pop();
                    updateListener.push(mainController.categoryChange(data, node, fn )); //add function to   
                })  
                .catch(err => console.log(err));

            mainController.eachFnc(formRemover);     

        } else if ( targetClassList.contains(DOM.btnAddCategory.slice(1) )) {
    
            mainController.addGroup(income.id)
                .then(data => {

                    uiController.addCategory(data);
                    summary.insert(data);
                    uiController.renderPlannedTab();
                }) 
                .catch(err => console.log(err))

            mainController.eachFnc(formRemover);
        
            
        } else if ( targetClassList.contains(DOM.clickerIcon.slice(1) )) {
 
            targetClassList.toggle('fa-rotate-180');   
            mainController.eachFnc(formRemover);  
           
        } else if ( targetClassList.contains(DOM.itemModal.slice(1))) {

            mainController.deleteItem(e.target.dataset.itemid)
                .then(() => {

                    uiController.deleteItem(e.target.dataset.itemid);

                })
                .catch(err => console.log(err))

        } else if ( targetClassList.contains(DOM.categoryModal.slice(1))) {

        
           mainController.deleteCategory(e.target.dataset.categoryid)
            .then(() => {
     
                summary.remove(e.target.dataset.categoryid);
                uiController.deleteCategory(e.target.dataset.categoryid);

            })
            .catch(err => console.log(err))

        } else if ( targetClassList.contains(DOM.btnAddIncome.slice(1))) {

            const monthYear = document.querySelector('#date-picker').dataset
            mainController.addIncome(monthYear.month, monthYear.year)
                .then((id) => {
                    income.id = id;
                })
                .catch(err => console.log(err))
       
        } else if ( targetClassList.contains(DOM.rsButton.slice(1))) {  

            mainController.eachFnc(formRemover);  
            mainController.showRS(e.target);

        } else if ( targetClassList.contains(DOM.rsButtonRemaining.slice(1))) {

            mainController.eachFnc(formRemover)
            mainController.renderRemainingRs();

        } else if ( targetClassList.contains(DOM.rsButtonSpent.slice(1))) {

            mainController.eachFnc(formRemover);  
            mainController.renderSpentRs();
    
        } else {

            uiController.removeRS();
            mainController.clickSelfItem(e);
            mainController.clickSelfCategory(e)
         }
    }

    return {
        init: () => {
            setUpEventListener();
            uiController.getCurrentSummary().init();
        }
    };

})(UIController, MainController);

appController.init();