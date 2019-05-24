
exports.getmonthYear = () => {
    const date = new Date();
    let monthYear;

     switch(date.getMonth()) {
        case 12: 
            return monthYear = ['December', date.getFullYear()];
        case 11: 
            return  monthYear = ['November', date.getFullYear()];
        case 10: 
            return monthYear = ['October', date.getFullYear()];
        case 9: 
            return monthYear = ['September', date.getFullYear()];
        case 8: 
            return monthYear = ['Auguest', date.getFullYear()];
        case 7: 
            return monthYear = ['July', date.getFullYear()];
        case 6: 
            return monthYear = ['June', date.getFullYear()];
        case 5: 
            return monthYear = ['May', date.getFullYear()];
        case 4: 
            return monthYear = ['April', date.getFullYear()];
        case 3: 
            return monthYear = ['March', date.getFullYear()];
        case 2: 
            return monthYear = ['Febraury', date.getFullYear()];
        case 1: 
            return monthYear = ['January', date.getFullYear()];
    }

    return monthYear;
}