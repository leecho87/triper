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

  const courseList = `
    <li class="course_item">
        <a href="/#detailInfo?contentTypeId={{contenttypeid}}&contentId={{contentid}}">
            <p class="course_thumb"><img src="{{firstimage}}" style="width:100%"></p>
            <p class="course_text title">{{title}}</p>
        </a>
    </li>
    `;
    // <a data-contenttypeid="{{contenttypeid}}" data-contentid="{{contentid}}">
    const courseDetailList = `
    <li>
        <p>{{subnum}}. {{subname}}</p>
        <p><img src="{{subdetailimg}}"></p>
        <p>{{subdetailalt}}</p>
        <p>{{subdetailoverview}}</p>
    </li>
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

  const restaurantList = `
      <li class="restaurant_item">
          <p class="restaurant_thumb"><img src="{{firstimage}}" style="width:100%"></p>
          <p class="restaurant_text title">{{title}}</p>
          <p class="restaurant_text address">{{addr1}}</p>
      </li>
  `;

  return {
      citiesList,
      localList,
      courseList,
      courseDetailList,
      festivalList,
      stayList,
      restaurantList
  }
})();