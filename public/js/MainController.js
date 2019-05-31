import { UIController } from './UIController.js'

export const MainController = ((uiController) => {

    let item;
    let category;
    let targetElement;

    const addItem = async (categoryId, type) => {
        try {    
            const { data }  = await axios.post('/app/item/new', { categoryId: categoryId });
            itemChange();
            item = data.item;
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
            itemChange();
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
        if(!document.querySelector('.editable-item-form')) return;
 
        const label = document.querySelector('.opened-item-label').value;
        const planned = document.querySelector('.opened-item-planned').value;

        if( item.label === label && item.planned === planned ) return;

        updateItem(label, planned, item.id)
        targetElement.querySelector('.item-label').textContent = `${label}`;
        targetElement.querySelector('.item-planned').textContent = `$${planned}`; 
    }

    const categoryChange = () => {
        if(!document.querySelector('.editable-category-form')) return;
 
        const title = document.querySelector('.opened-category-title').value;
        
        if( category.title === title ) return;

        updateCategory(title, category.id)
        targetElement.querySelector('.category-title').textContent = `${title}`;
    }

    const deleteItem = async (node, id) => {
        try {

            await axios.delete(`/app/item/${id}`);
            uiController.deleteItem(node);
            
        } catch (err) { console.log(err) }
    }

    const deleteCategory = async (node, id) => {
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
        clickSelfCategory: clickSelfCategory
    }
})(UIController);