import { budgetController } from './badyet.js';

const appController = (budget => {

    const domStrings = budget.getDoomStrings();
    const keys = budget.getIncomeAndUserKeys();

    const setUpEventListener = () => {

        document.querySelector(domStrings.btnAddGroupCategory).addEventListener('click', addNewCategory, false);

        document.querySelector(domStrings.categoryList).addEventListener('click', clickedOnMain, false);
    };

    const clickedOnMain = (el) => {

        const targetEl = el.target.classList;
     
        if( targetEl.contains(domStrings.btnAddCategoryItem.slice(1)) ) {

            addNewCategoryItem(el);

        } else if ( targetEl.contains(domStrings.btnAddIncomeItem.slice(1)) ) {

            addNewIncomeItem();

        } else if ( targetEl.contains(domStrings.clickerIcon.slice(1))) {

            rotateArrowIcon(el);
        }

    };

    const addNewCategoryItem = (el) => {
  
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

    const domStrings = budget.getDoomStrings();
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