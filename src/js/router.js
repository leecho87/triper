const router = (() => {
  const getHashParams = () => {
    const splitHash = window.location.hash.split('?');
    const hash = (splitHash[0].length <= 0 ? 'home' : splitHash[0].replace('#',''));
    const params = splitHash[1];

    if (params && params !== '') {
      const result = params.split('&').reduce((res, item) => {
        const parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
      }, {});
      return {
        service : hash,
        params : result
      }
    }
    return hash;
  }

  const redirect = page => {
    switch(page){
      case 'home' :
        window.location.hash = 'home';
        break;
      case 'search' :
        window.location.hash = 'search';
        break;
      case 'location' :
        window.location.hash ='location';
        break;
      case 'favorite' :
        window.location.hash = 'favorite';
        break;
      default :
        window.location.hash = 'error';
        break;
    }
  }

  const router = () => {
    const hash = getHashParams();

    if(hash.params === undefined){
      redirect(hash);
    }

  }

  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);
})();