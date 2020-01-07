const templates = (() => {
  const citiesList = `
      <a href="/" data-code="{{code}}" style="background-image:url('/src/image/city_{{code}}.jpg')">
          <span class="name">{{name}}</span>
      </a>
  `;

  const localList = `
      <li><a href="{{areaHomepage}}" target="_blank">{{name}}</a></li>
  `;

  const festivalList = `
      <li>
          <p class="festival_thumb"><img src="{{firstimage}}" style="width:100%"></p>
          <p class="festival_text title">{{title}}</p>
          <p class="festival_text date">{{eventstartdate}} - {{eventenddate}}</p>
      </li>
  `;

  const stayList = `
      <div>
          <p>주소 : {{addr1}}</p>
          <p>연락처 : {{tel}}</p>
          <p>이름 : {{title}}</p>
      </div>
  `;

  return {
      citiesList,
      localList,
      festivalList,
      stayList
  }
})();