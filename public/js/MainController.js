import { UIController } from './UIController.js'

export const MainController = ((uiController) => {

    let item;
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
     
            uiController.editForm(data.item, e); //create a clicked item edit form
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

    const itemChange = () => {
        if(!document.querySelector('.editable-item-form')) return;
 
        const label = document.querySelector('.opened-item-label').value;
        const planned = document.querySelector('.opened-item-planned').value;

        if( item.label === label && item.planned === planned ) return;

        updateItem(label, planned, item.id)
        targetElement.querySelector('.item-label').textContent = `${label}`;
        targetElement.querySelector('.item-planned').textContent = `$${planned}`; 
    }

    const deleteItem = async (node, id) => {
        try {

            await axios.delete(`/app/item/${id}`);
            uiController.deleteItem(node);
        } catch (err) { console.log(err) }
    }

    return {
        
        addItem: addItem,
        getItem: getItem,
        addGroup: addGroup,
        itemChange: itemChange,
        deleteItem: deleteItem
    }
})(UIController);