const templates = (() => {
  const citiesList = `
      <a href="/" class="cities_item" data-code="{{code}}">
        <img src="./src/image/city_{{code}}.jpg" width="80" height="80">
        <span class="name">{{name}}</span>
      </a>
  `;

  const localList = `
      <li class="local_item"><a href="{{areaHomepage}}" target="_blank">{{name}}</a></li>
  `;

  const festivalList = `
      <li class="festival_item">
          <p class="festival_thumb"><img src="{{firstimage}}" style="width:100%"></p>
          <p class="festival_text title">{{title}}</p>
          <p class="festival_text date">{{eventstartdate}} ~ {{eventenddate}}</p>
      </li>
  `;

  const stayList = `
      <li class="stay_item">
        <p class="stay_thumb"><img src="{{firstimage}}" style="width:100%"></p>
        <p class="stay_text title">{{title}}</p>
        <p class="stay_text address">{{addr1}}</p>
        <p class="stay_text tel">{{tel}}</p>
      </li>
  `;

  return {
      citiesList,
      localList,
      festivalList,
      stayList
  }
})();