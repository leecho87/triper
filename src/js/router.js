const router = ( () => {
  const error = document.querySelector('#error');

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
    other() {
      error.innerHTML = '주소가 잘못되었습니다.';
    }
  }

  const router = () => {
    const getHash = location.hash.replace('#','');
    const hash = (getHash.length <= 0 ? 'home' : getHash);
    (routes[hash] || routes.other)();
  }

  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);
})();