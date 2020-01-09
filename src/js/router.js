const router = ( () => {
  const error = document.querySelector('#error');

  const getHashParams = () => {
    const splitHash = window.location.hash.split('?');
    const hash = splitHash[0].replace('#','');
    const params = splitHash[1];

    if (params && params !== '') {
      const result = params.split('&').reduce((res, item) => {
        const parts = item.split('=');
        res[parts[0]] = parts[1];
        console.log('[getHashParams] res = ', res)
        console.log('[getHashParams] hash = ', hash)
        return res;
      }, {})
    }
  }

  const routes = {
    'home' : () => {
      window.location.hash = '#home';
    },
    'search' : () => {
      window.location.hash = '#search';
    },
    'location' : () => {
      window.location.hash = '#location';
    },
    'favorite' : () => {
      window.location.hash = '#favorite';
    },
    'detailInfo' : () => {
      console.log('window.location.search', window.location.search)
    },
    other() {
      // error.innerHTML = '주소가 잘못되었습니다.';
    }
  }

  const router = () => {
    const getHash = location.hash.replace('#','');
    const hash = (getHash.length <= 0 ? 'home' : getHash);
    (routes[hash] || routes.other)();
    getHashParams();
  }

  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);
})();