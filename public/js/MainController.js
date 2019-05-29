import { UIController } from './UIController.js'

export const MainController = ((uiController) => {

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
            uiController.removeEditForm();
            uiController.editForm(data.item, e);
            
        } catch (err) { console.log(err) }
    }

    return {
        
        addItem: addItem,
        getItem: getItem
    }
})(UIController);