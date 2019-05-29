
    const removeEditableForm = () => {

        middleDOM.editForm = document.querySelector(domStrings.editableForm);

        if ( !middleDOM.editForm ) return;

        //update the item if the input values changed. before we remove the edit form
        updateItem(currentItemSelected);
        
        //middleDOM.editForm.childNodes[0].parentNode.remove();
    }

    const updateItem = (item) => {
        const label = document.querySelector(domStrings.itemLabel).value;
        const planned = document.querySelector(domStrings.itemPlanned).value;

        if( item.label === label && item.planned === planned ) return;

        axios.put(`/app/item`, {
            id: item.id,
            label: label,
            planned: planned
        })
        .then(success => {
            //item already deleted and cant see the elements in the view since it is promise.
            // document.querySelector(domStrings.itemLabel).value = label;
            // document.querySelector(domStrings.itemPlanned).value = planned;

            STATE.item.targetLabel.textContent = '$' + label;
            STATE.item.targetPlanned.textContent = '$' + planned;
        })
        .catch(err => console.log(err));
    };

    // const insertEditableForm = el => {

    //    STATE.item.targetLabel = el.target.parentNode.querySelector('.item-label');
    //    STATE.item.targetPlanned = el.target.parentNode.querySelector('.item-planned');
       
    //     //console.log(el.target.getElementsByTagName('span')[0]);
    //     //check if there is and edit form open if there is remove it.


    //     const mainAppContainer = document.querySelector('.main-app-container');
    //     const rect = el.target.getBoundingClientRect();
    //     const posY = rect.top + mainAppContainer.scrollTop; //target element top + main container scroll top

    //     const itemId = el.target.closest(domStrings.itemData).dataset.itemid;
    //     axios.get(`/app/item/${itemId}`)
    //     .then(success => {

    //         currentItemSelected = success.data.item;
    //         budget.editItemForm(posY - 25, currentItemSelected);
    //     })
    //     .catch(err => console.log(err));
    // };

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

  
        const el = e.target.parentNode.closest(domStrings.clickerIcon);

        if( el ) el.classList.toggle('fa-rotate-180');
    };

