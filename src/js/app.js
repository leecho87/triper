const getInfo = (()=>{
    const apiUrl = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/';
    const apiKey = decodeURIComponent('Q6I%2FZ%2BtN8n3yVqpZvlgFIP8b9xAx8Sv2KgwT3lcFGRU3RJDZ5V09bOOtfLXTC9PW0kg2Ju9fGOWlO4BMrt2LMw%3D%3D');

    const strPad = (date) => {
        return date > 9 ? date : '0' + date;
    };

    const getToday = ( (date) => {
        return [
            date.getFullYear(),
            strPad(date.getMonth()),
            strPad(date.getDate())
        ].join('');
    })(new Date());

    const generateParams = (params) => {
        let data = {
            'ServiceKey' : apiKey,
            'MobileOS': 'ETC',
            'MobileApp': 'AppTest',
            '_type': 'json'
        };

        for(let keyName in params){
            if (!params.hasOwnProperty(keyName)) {
                continue;
            }
            data[keyName] = params[keyName];
        }

        return data;
    };

    return {
        strPad,
        getToday,
        generateParams,
        apiUrl
    }
})();

const getData = async (serviceCode, params) => {
    let data = [];
    await axios.get(getInfo.apiUrl+serviceCode, {
        params : getInfo.generateParams(params)
    })
    .then(res => data = res.data.response.body.items)
    .catch(err => console.error(err));

    if( !(params === undefined) && params.areaCode ){
        data = mergeObj(data.item, citiesInfo[params.areaCode]);
        console.log(data);
    }
    return data;
};

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

const pickEl = (() => {
    // 페이지
    const pages = {
        'all' : document.querySelectorAll('.page'),
        'home' : document.querySelector('#main'),
        'search' : document.querySelector('#search'),
        'location' : document.querySelector('#location'),
        'favorite' : document.querySelector('#favorite'),
    }

    // 리스트
    const citiesArea = document.querySelector('#cities-list');
    const localArea = document.querySelector('#local-list');
    const festivalArea = document.querySelector('#festival-list')
    const stayArea = document.querySelector('#stay-list')

    return {
        pages,
        citiesArea,
        localArea,
        festivalArea,
        stayArea,
    }
})();

const generateList = (template, data) => {
    let apiData = data.item;
    let fragment = document.createElement('div');
    let html = template.replace(/[\n\t\r]+/g, '').trim();
    
    apiData.forEach(item => {
        fragment.innerHTML += html.replace(/{{ *(\w+) *}}/g, (match,key) => {
            if (key === 'firstimage' && item[key] === undefined){
                return 'http://placehold.it/320x100?text=image_not_found'
            }
            if (key === 'homepage'){
                console.log('이건 홈페이지 처리')
            }
            return item[key];
        });
    });
    return fragment.innerHTML;
};

const updateCities = async (code) => {
    let localData = await getData('areaCode', {
        areaCode : code,
        numOfRows : 999
    });
    destory(pickEl.localArea);
    pickEl.localArea.innerHTML = generateList(templates.localList, localData);
}

const destory = (selector) => {
    return selector.innerHTML = '';
}

const bindEvents = () => {        
    document.querySelector('#cities-list').addEventListener('click', clickEvent => {
        clickEvent.preventDefault();
        let target = clickEvent.target;
        updateCities(target.dataset.code);
    });

    document.querySelector('.local-list-close').addEventListener('click', clickEvent => {
        clickEvent.preventDefault();
        let target = clickEvent.target;
        let list = document.querySelector('#local-list');
        if ( target.dataset.state === 'close' ) {
            target.dataset.state = 'open';
            list.style.maxHeight = '999px';
        } else {
            target.dataset.state = 'close';
            list.style.maxHeight = '42px';
        }
    });
};

const init = (async () => {
    // 초기데이터 호출
    const citiesData = await getData('areaCode', {
        numOfRows : 17
    });
    const localData = await getData('areaCode', {
        areaCode : 1,
        numOfRows : 25
    });
    const festivalData = await getData('searchFestival');
    const stayData = await getData('searchStay');

    pickEl.citiesArea.innerHTML = generateList(templates.citiesList, citiesData);
    pickEl.localArea.innerHTML = generateList(templates.localList, localData);
    pickEl.festivalArea.innerHTML = generateList(templates.festivalList, festivalData);
    pickEl.stayArea.innerHTML = generateList(templates.stayList, stayData);

    await bindEvents();
})();