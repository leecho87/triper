const getInfo = (()=>{
    const apiUrl = '//api.visitkorea.or.kr/openapi/service/rest/KorService/';
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

const pickEl = (() => {
    // 페이지
    const pages = {
        'all' : qsa('.page'),
        'home' : qs('#main'),
        'search' : qs('#search'),
        'location' : qs('#location'),
        'favorite' : qs('#favorite'),
    }

    // 리스트
    const citiesArea = qs('#cities-list');
    const localArea = qs('#local-list');
    const festivalArea = qs('#festival-list');
    const stayArea = qs('#stay-list');

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
            if (key === 'eventstartdate' || key === 'eventenddate'){
                return dateFormatter(item[key])
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
    $on(pickEl.citiesArea, 'click', clickEvent => {
        clickEvent.preventDefault();
        let target = clickEvent.target;
        updateCities(target.dataset.code);
    });
    
    $on(qs('.local-list-close'), 'click', clickEvent => {
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
    const festivalData = await getData('searchFestival', {
        arrange : 'C',
    });
    const stayData = await getData('searchStay', {
        arrange : 'C',
    });

    pickEl.citiesArea.innerHTML = generateList(templates.citiesList, citiesData);
    pickEl.localArea.innerHTML = generateList(templates.localList, localData);
    pickEl.festivalArea.innerHTML = generateList(templates.festivalList, festivalData);
    pickEl.stayArea.innerHTML = generateList(templates.stayList, stayData);

    await bindEvents();
})();