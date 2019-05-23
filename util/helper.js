

exports.getCurrentMonth = () => {
    const date = new Date();

    return date.getMonth();
}

exports.getMonth = (num) => {
    let month;

     switch(num) {
        case 12: 
            return month = 'December';
            break;
        case 11: 
            month = 'November';
            break;
        case 10: 
            month = 'October';
            break;
        case 9: 
            month = 'September';
            break;
        case 8: 
            month = 'Auguest';
            break;
        case 7: 
            month = 'July';
            break;
        case 6: 
            month = 'June';
            break;
        case 5: 
            month = 'May';
            break;
        case 4: 
            month = 'April';
            break;
        case 3: 
            month = 'March';
            break;
        case 2: 
            month = 'Febraury';
            break;
        case 1: 
            month = 'January';
            break;
    }

    return month;
}