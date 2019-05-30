import { UIController } from './UIController.js'

export const MainController = ((uiController) => {

    let item;
    let targetElement;

    const addItem = async (categoryId, type) => {
        try {    
            const { data }  = await axios.post('/app/item/new', { categoryId: categoryId });
            itemChange();
            item = data.item;
            //uiController.removeEditForm();
            uiController.addItem(data.item, type);
        } 
        catch { err => console.log(err) }
    }

    const getItem = async (itemId, e) => {
        try {
            const { data } = await axios.get(`/app/item/${itemId}`);
            itemChange();
            item = data.item;
            targetElement = e.target.parentNode;
            uiController.editForm(data.item, e); //create a clicked item edit form

        } catch (err) { console.log(err) }
    }

    const addGroup = async (incomeId) => {
        try {
            itemChange();
            //uiController.removeEditForm();
            const { data } = await axios.post('/app/category/new', { incomeId: incomeId });
            uiController.addCategory(data.category);

        } catch (err) { console.log(err) }
    }
    
    const updateItem = async (label, planned, id) => {
        try {
          const result = await axios.put('/app/item', {
                id: id,
                label: label,
                planned: planned
            });

            return result.data.success;
        } catch (err) {console.log(err)}              
    }

    const itemChange = () => {
        
        if(!document.querySelector('.editable-item-form')) return;

        const label = document.querySelector('.opened-item-label').value;
        const planned = document.querySelector('.opened-item-planned').value;

        if( item.label === label && item.planned === planned ) return;
 
         updateItem(label, planned, item.id)
         .then(result => {
            if ( !result ) return;

            targetElement.querySelector('.item-label').textContent = label;
            targetElement.querySelector('.item-planned').textContent = planned;
            uiController.removeEditForm();

         })
         .catch(err => console.log(err)) 
    }

    const setTargetElement = (target) => {
        targetElement = target;
    }

    return {
        
        addItem: addItem,
        getItem: getItem,
        addGroup: addGroup,
        itemChange: itemChange,
        setTargetElement: setTargetElement
    }
})(UIController);