const qs = selector => {
    return document.querySelector(selector);
}

const qsa = selector => {
    return document.querySelectorAll(selector);
}

const $on = (target, type, callback) => {
    target.addEventListener(type, callback);
}

const dateFormatter = (eventDate) => {
    let strDate = eventDate.toString();
    let year = strDate.substring(0, 4);
    let month = strDate.substring(4, 6);
    let day = strDate.substring(6, 8);

    return `${year}-${month}-${day}`;
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