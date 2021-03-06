import { UIController } from './UIController.js'

export const MainController = ((uiController) => {
    
    //let item;
    //let category;
    let monthsData;
    let currentUserIncomes;
    const DOM = uiController.getDOM();
    let nowDate = new Date();
    const budget = uiController.getCurrentBudget();
    //const summary = uiController.getCurrentSummary();

    const addIncome = async (month, year) => {

        try {

            const { data } = await axios.post('/app/income/new', {
                month: month,
                year: year
            })

            uiController.removeDateHeader();
            uiController.showLoading('Creating your budget....');
            currentUserIncomes.push({ month: month, year: parseInt(year) }) //update date picker active
                
            setTimeout(() => {
                
                uiController.showIncomeData(data.newIncome, [data.item]);
                return data.newIncome.id;
               
            }, 2000)
            
            return data.newIncome.id;

        } catch (error) {
            
        }
    }

    const initUserIncomes = async () => {
        try {
            
            const inc = await getIncomes();
            currentUserIncomes = inc.data.incomes; 

        } catch (err) { console.log(err) }
        
    }

    const getIncomes = async () => {
        try {

           return await axios.get('/app/income', {})
            
        } catch (err) {console.log(err) }
            
        
    }

    const addItem = async (categoryId, type) => {
        try {    

            const { data }  = await axios.post('/app/item/new', { categoryId: categoryId });
            uiController.addItem(data.item, type);
        } 
        catch { err => console.log(err) }
    }

    const getItem = async (itemId) => {
        try {

            const { data } = await axios.get(`/app/item/${itemId}`);
            return data.item;

        } catch (err) { console.log(err) }
    }

    const getCategory = async (categoryId) => {
        try {
      
            const { data } = await axios.get(`/app/category/${categoryId}`);
            return data.category;      
            
        } catch (err) { console.log(err) }
    }

    const addGroup = async (id) => {
       
        try {

            const { data } = await axios.post('/app/category/new', { incomeId: id });
            return data.category;

        } catch (err) { console.log(err) }
    }
    
    const updateItem = async (label, planned, id) => {

        try {

            await axios.put('/app/item', {
                id: id,
                label: label,
                planned: planned
            });

            return true;

        } catch (err) {console.log(err)}              
    }

    const updateCategory = async (title, id) => {
        try {
            await axios.put('/app/category', {
                id: id,
                title: title
            });

        } catch (err) {console.log(err)}
        
        return true;
    }

    const itemChange = (oldData, node, fn) => {
    
        return () => {
           
            if(!document.querySelector(DOM.editableItemForm)) return false;
    
            const label = document.querySelector(DOM.itemLabel).value;
            const planned = document.querySelector(DOM.itemPlanned).value;
  
            if( oldData.label === label && oldData.planned === planned ) return false;
                
            updateItem(label, planned, oldData.id)

            const type = node.id.replace(/-\d+/, ''); 
            node.querySelector('.item-label').textContent = `${label}`;
            node.querySelector(`.${type}-planned`).textContent = `$${Math.abs(planned).toFixed(2)}`; 

            if(oldData.planned !== planned) budget.updateIncome();
            fn.updateTotal(oldData.categoryId);
            uiController.renderPlannedTab();

            return true;
        }
        
    }

    const categoryChange = (oldData, node, fn) => {

        return () => {

            if(!document.querySelector(DOM.editableCategoryForm)) return false;

            const title = document.querySelector(DOM.categoryTitle).value;
           
            if( oldData.title === title ) return false;
           
            updateCategory(title, oldData.id);
            node.textContent = `${title}`;
            fn(title);
            uiController.renderPlannedTab();

            return true;
        }
    }

    const deleteItem = async (id) => {
        try {

            await axios.delete(`/app/item/${id}`);
                
        } catch (err) { console.log(err) }
    }

    const deleteCategory = async (id, node) => {
        try {

            await axios.delete(`/app/category/${id}`);

            return true;

        } catch (err) { console.log(err) }
    }

    const clickSelfItem  = (e) => {
       
        const editForm = document.querySelector('.editable-item-form');

        if(!editForm) return false; //return false if there is no edit form
        if(!editForm.contains(e.target)) uiController.removeEditForm(); //did user clicked inside item edit form? if not remove form 
        
        return true;
    }

    const clickSelfCategory  = (e) => {
        const editCategory = document.querySelector('.editable-category-form');

        if(!editCategory) return; //return if there is no edit form
        if(!editCategory.contains(e.target)) uiController.removeCategoryForm(); //did user clicked inside item edit form? if not remove form 
    }

    const clickSelfDate  = (e) => {
        const date = document.querySelector('.date-picker');

        if(!date) return; //return if there is no edit form
        if(!date.contains(e.target)) uiController.removeDate(); //did user clicked inside item edit form? if not remove form 
    }

    const eachFnc = (arr, upTo) => {
        
        const end = upTo || arr.length;
        
        for(let i = 0; i < end; i++) {
            arr[i]();
        }
    }

    const showDatePicker = (move) => {

        if(move) {
            move === 'next' ?  nowDate.setMonth(nowDate.getMonth() + 6) :  nowDate.setMonth(nowDate.getMonth() - 6);
        }

        monthsData = dateBuilder(9, nowDate, (i) => {

            if( i === 1 ) { 

                nowDate.setMonth(nowDate.getMonth() - 4)  //set the starting month
                return nowDate.getMonth();
            }
            
            nowDate.setMonth(nowDate.getMonth() + 1);   

            return nowDate.getMonth()
        });
      
        markUserDates(monthsData); //update array dates with user owned income date
        nowDate.setMonth(nowDate.getMonth() - 4); //9 - 4 = 5 set the month back to mid year month
        uiController.showDatePicker(monthsData); //show date picker to screen
        uiController.updateSelectedMonth(); //add default selected to current income
    }

    const markUserDates = (arr, monthSelected) => {
       
        arr.forEach(date => {
            
            if( !monthSelected ) {

                currentUserIncomes.forEach(udate => {
                    if ( date.month.long === udate.month && date.year === udate.year ) {
                        
                        date.active = true;               
                        return;
                    }                   
                });
            }
                
            if( monthSelected === date.month.long ) {
                date.active = true;
                return;
            } 
        });
    };

    const dateBuilder = (n, date, callback) => {

        if ( n > 12 || n < 0 ) throw 'n must be < 11 and >= 0';
    
        let monthArr = [{short: 'Jan', long: 'January'}, {short: 'Feb', long: 'February'}, {short: 'Mar', long: 'March'}, {short: 'Apr', long: 'April'}, {short: 'May', long: 'May'}, 
                        {short: 'Jun', long: 'June'}, {short: 'Jul', long: 'July'}, {short: 'Aug', long: 'August'}, {short: 'Sep', long: 'September'}, {short: 'Oct', long: 'October'},
                        {short: 'Nov', long: 'November'}, {short: 'Dec', long: 'December'}];
        let arr = [];
        
        for( let i = 1 ; i <=  n; i++ ) {

            arr.push({ month: monthArr[callback(i)], year: date.getFullYear() });
        }
    
        return arr;          
    }

    const showPickedDate = (month, year) => {

        //if(selectedDate.month === month && selectedDate.year === year) return;

        axios.get(`/app/income/${month}/${year}`, {})
            .then(income => {

                if( !income.data.income.length ) {
                                        
                    uiController.noIncome(month, year);

                }  else {   
                    
                    const incomeItems = income.data.income[0].categories.shift(); //remove the first element income in the category

                    income.data.income[0].budget = income.data.budget;

                    uiController.showLoading('Loading...');
                    uiController.removeDateHeader();
                    
                    setTimeout(() => {
                        uiController.showIncomeData(income.data.income[0], incomeItems.items, income.data.income[0].categories, income.data.total); //income info, income items, and categories belongs to income
                    }, 1000)           
                }
            })
            .catch(err => console.log(err));
    }

    const showRS = (e) => {
        
        uiController.showRSPicker(e);
    }

    const renderRemainingRs= () => {

        uiController.renderRemaining();
    }

    const renderSpentRs = () => {
        
        uiController.renderSpent();
    }

    const renderPlannedTab = () => {

        //uiController.renderRemainingTab();
    }

    const renderSpentTab = () => {
        
        //uiController.renderSpentTab();
    }

    const renderRemainingTab = () => {
        
        //uiController.renderRemainingTab();
    }

    return {
        
        addIncome: addIncome,
        addItem: addItem,
        addGroup: addGroup,
        getItem: getItem,
        getCategory: getCategory,
        itemChange: itemChange,
        categoryChange: categoryChange,
        deleteItem: deleteItem,
        deleteCategory: deleteCategory,
        clickSelfItem: clickSelfItem,
        clickSelfCategory: clickSelfCategory,
        clickSelfDate: clickSelfDate,
        eachFnc: eachFnc,
        selectedMonthIncome: uiController.getIncomeAndUserKeys(),
        removeItemForm: uiController.removeEditForm,
        removeCategoryForm: uiController.removeCategoryForm,
        showDatePicker: showDatePicker,
        showPickedDate: showPickedDate,
        initUserIncomes: initUserIncomes(),
        showRS: showRS,
        renderSpentRs: renderSpentRs,
        renderRemainingRs: renderRemainingRs,
        renderPlannedTab: renderPlannedTab,
        renderSpentTab: renderSpentTab,
        renderRemainingTab: renderRemainingTab

    }
})(UIController);