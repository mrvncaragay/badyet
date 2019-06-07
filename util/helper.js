
exports.getmonthYear = () => {
    const date = new Date();
    let monthYear;

     switch(date.getMonth()) {
        case 11: 
            return monthYear = ['December', date.getFullYear()];
        case 10: 
            return  monthYear = ['November', date.getFullYear()];
        case 9: 
            return monthYear = ['October', date.getFullYear()];
        case 8: 
            return monthYear = ['September', date.getFullYear()];
        case 7: 
            return monthYear = ['Auguest', date.getFullYear()];
        case 6: 
            return monthYear = ['July', date.getFullYear()];
        case 5: 
            return monthYear = ['June', date.getFullYear()];
        case 4: 
            return monthYear = ['May', date.getFullYear()];
        case 3: 
            return monthYear = ['April', date.getFullYear()];
        case 2: 
            return monthYear = ['March', date.getFullYear()];
        case 1: 
            return monthYear = ['Febraury', date.getFullYear()];
        case 0: 
            return monthYear = ['January', date.getFullYear()];
    }

    return monthYear;
}

exports.getUniqueIds = (arrA, arrB) => {

    let items_id = arrB.filter(val => {
        return arrA.includes(val);
    });

    return items_id;
}

/* Get total Income items skip - to skipp the first element in the array*/ 
exports.getTotal = (obj, skip) => {

    let total = {
        income: 0,
        category: 0
    };

    obj.forEach( (element, i) => {

        if( skip && i === 0 ) return;

        if ( element.items ) {
            
            element.items.forEach(item => {
                total.category += parseFloat(item.planned);
            });
        }

        total.income += parseFloat(element.planned);
    });

    return total
}

exports.dataPicker = (fields, object = {}) => {

    const [first, ...remaining] = fields.split(".")

    return (remaining.length) ? deepPick(remaining.join("."), object[first]) : object[first]  
}