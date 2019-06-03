import { UIController } from './UIController.js'

export const MainController = ((uiController) => {

    let item;
    let category;
    let targetElement;
    const DOM = uiController.getDOM();
    let nowDate = new Date();
    let incomes;

    const initUserIncomes = async () => {
        try {
            
            const inc = await getIncomes();
            incomes = inc.data.incomes; 

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

    const getItem = async (itemId, e) => {
        try {
            const { data } = await axios.get(`/app/item/${itemId}`);

            item = data.item;
            targetElement = e.target.parentNode.parentNode.parentNode;
            uiController.editItem(data.item, e); //create a clicked item edit form

        } catch (err) { console.log(err) }
    }

    const getCategory = async (categoryId, e) => {
        try {

            const { data } = await axios.get(`/app/category/${categoryId}`);
            category = data.category;
            targetElement = e.target.parentNode;

            uiController.editCategory(category, e);
            
        } catch (err) { console.log(err) }
    }

    const addGroup = async (incomeId) => {

        try {

            const { data } = await axios.post('/app/category/new', { incomeId: incomeId });
            uiController.addCategory(data.category);

        } catch (err) { console.log(err) }
    }
    
    const updateItem = async (label, planned, id) => {

        try {

            await axios.put('/app/item', {
                id: id,
                label: label,
                planned: planned
            });

        } catch (err) {console.log(err)}              
    }

    const updateCategory = async (title, id) => {
        try {
            await axios.put('/app/category', {
                id: id,
                title: title
            });

        } catch (err) {console.log(err)} 
    }

    const itemChange = () => {
        if(!document.querySelector(DOM.editableItemForm)) return;
 
        const label = document.querySelector(DOM.itemLabel).value;
        const planned = document.querySelector(DOM.itemPlanned).value;

        if( item.label === label && item.planned === planned ) return;

        updateItem(label, planned, item.id)
        targetElement.querySelector('.item-label').textContent = `${label}`;
        targetElement.querySelector('.item-planned').textContent = `$${planned}`; 
    }

    const categoryChange = () => {
        if(!document.querySelector(DOM.editableCategoryForm)) return;
 
        const title = document.querySelector(DOM.categoryTitle).value;
        
        if( category.title === title ) return;

        updateCategory(title, category.id)
        targetElement.querySelector(DOM.selectedCateTitle).textContent = `${title}`;
    }

    const deleteItem = async (node, id) => {
        try {

            await axios.delete(`/app/item/${id}`);
            uiController.deleteItem(node);
            
        } catch (err) { console.log(err) }
    }

    const deleteCategory = async (id, node) => {
        try {

            await axios.delete(`/app/category/${id}`);
            uiController.deleteCategory(node);

        } catch (err) { console.log(err) }
    }

    const clickSelfItem  = (e) => {
        const editForm = document.querySelector('.editable-item-form');

        if(!editForm) return; //return if there is no edit form
        if(!editForm.contains(e.target)) uiController.removeEditForm(); //did user clicked inside item edit form? if not remove form 
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

    const clearUpdateForm = (arr, upTo) => {
        
        const end = upTo || arr.length;
        for(let i = 0; i < end; i++) {
            arr[i]();
        }
    }

    const showDatePicker = async (move) => {
 
        if(move) {
            move === 'next' ?  nowDate.setMonth(nowDate.getMonth() + 6) :  nowDate.setMonth(nowDate.getMonth() - 6);
        }

        const getMonths = dateBuilder(9, nowDate, (date, i) => {

            if( i === 1 ) { 

                date.setMonth(date.getMonth() - 4)  //set the starting month
                return date.getMonth();
            }
            
            date.setMonth(date.getMonth() + 1);   

            return date.getMonth()
        });


        
        nowDate.setMonth(nowDate.getMonth() - 4); //9 - 4 = 5 set the month back to mid year month
        uiController.showDatePicker(getMonths);
    }

    const initMonthPicker = () => {
        
        return datepicker('#date-picker', {
            //disableYearOverlay: true,
            disableMobile: false,
            disabler: date => date.getMonth(),
            
            onMonthChange: instance => {

                checkSelectedMonth(instance.currentMonthName, instance.currentYear);
            },

            onHide: instance => {
                //month = instance.currentMonthName
                // console.log(, instance.currentYear)

            }
        });       
        //picker.setMin(new Date(2019, 0, 1))
        //picker.setMax(new Date(2020, 0, 1))
        //picker.remove();
    }

    const dateBuilder = (n, date, callback) => {

        if ( n > 12 || n < 0 ) throw 'n must be < 11 and >= 0';
    
        let monthArr = [{short: 'Jan', long: 'January'}, {short: 'Feb', long: 'February'}, {short: 'Mar', long: 'March'}, {short: 'Apr', long: 'April'}, {short: 'May', long: 'May'}, 
                        {short: 'Jun', long: 'June'}, {short: 'Jul', long: 'July'}, {short: 'Aug', long: 'August'}, {short: 'Sep', long: 'September'}, {short: 'Oct', long: 'October'},
                        {short: 'Nov', long: 'November'}, {short: 'Dec', long: 'December'}];
        let arr = [];
        
        for( let i = 1 ; i <=  n; i++ ) {

            //incomes this is an income array that user has. think if a way to include this on the month picker

            arr.push({ month: monthArr[callback(date, i)], year: date.getFullYear() });
        }
    
        return arr;          
    }

    const showPickedDate = (month, year) => {

        
        axios.get(`/app/income/${month}/${year}`, {})

        .then(income => {

            console.log(income)
            window.Income = income;
            // console.log(income.data.income[0].month);
            // console.log(income.data.income[0]);
            // console.log(income.data.income[0].categories); //pop the first item its the month
          
       
            if( !income.data.income.length ) {

                uiController.noIncome(month, year);

            }  else {
                uiController.showLoading();

                 setTimeout(() => {
                    //uiController.showIncomeData(income.data.income[0], income.data.income[0].categories.shift());
                }, 3000)           
            }

        })
        .catch(err => console.log(err));
    }

    return {
        
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
        clearUpdate: clearUpdateForm,
        selectedMonthIncome: uiController.getIncomeAndUserKeys(),
        removeItemForm: uiController.removeEditForm,
        removeCategoryForm: uiController.removeCategoryForm,
        showDatePicker: showDatePicker,
        showPickedDate: showPickedDate,
        initUserIncomes: initUserIncomes()

    }
})(UIController);