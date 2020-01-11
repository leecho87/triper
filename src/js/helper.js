const qs = selector => {
    return document.querySelector(selector);
}

const qsa = selector => {
    return document.querySelectorAll(selector);
}

const $on = (target, type, callback) => {
    if( target.length > 1 ){
        for(let i=0; i<target.length; i++){
            target[i].addEventListener(type, callback);        
        }
    }else{
        target.addEventListener(type, callback);
    }
}

const dateFormatter = (eventDate, flag) => {
    let symbol = flag || '-';
    let strDate = eventDate.toString();
    let year = strDate.substring(0, 4);
    let month = strDate.substring(4, 6);
    let day = strDate.substring(6, 8);

    return `${year}${symbol}${month}${symbol}${day}`;
}

const mergeObj = (arr1, arr2) => {
    let idx = 0;
    let obj = {
        item : []
    };

    while(idx < arr1.length){
      if(arr1[idx].code === arr2[idx].code){
          obj.item.push({...arr1[idx],...arr2[idx]})
      }
      idx = idx+1
    }

    return obj;
}

const getToday = ( (date) => {
    const strPad = (date) => {
        return date > 9 ? date : '0' + date;
    };

    return [
        date.getFullYear(),
        strPad(date.getMonth()),
        strPad(date.getDate())
    ].join('');
})(new Date());