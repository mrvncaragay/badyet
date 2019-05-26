import { budgetController } from './badyet.js';

const appController = (budget => {

    const domStrings = budget.getDoomStrings();
    const keys = budget.getIncomeAndUserKeys();

    const setUpEventListener = () => {

        document.querySelector(domStrings.btnAddGroupCategory).addEventListener('click', addNewCategory);

        document.querySelector(domStrings.categoryList).addEventListener('click', rotateArrowIcon);
    };

    const addNewCategory = () => {
        
        axios.post('/app/category', {

            incomeId: keys.incomeId
          })
          .then(success => {

            const { category }  = success.data 

            if( budget.checkTempCategory() ) budget.removeTempCategory();
            budget.addCategory(category);
          })
          .catch(err => console.log(err));       
    };

    const rotateArrowIcon = (e) => {

    const domStrings = budget.getDoomStrings();
        const el = e.target.parentNode.closest(domStrings.clickerIcon);

        console.log(el);



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