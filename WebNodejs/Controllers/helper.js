const helper = {};

helper.createStarList = (stars) => {
  // console.log(stars);
  const str = `<ul class="list">
    <li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i>${stars[4]}</a></li>
    <li><a href="#">4 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star disable"></i>${stars[3]}</a></li>
    <li><a href="#">3 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star"></i><i class="fa fa-star disable"></i><i
                class="fa fa-star disable"></i>${stars[2]}</a></li>
    <li><a href="#">2 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i
                class="fa fa-star disable"></i><i class="fa fa-star disable"></i><i
                class="fa fa-star disable"></i>${stars[1]}</a></li>
    <li><a href="#">1 Star <i class="fa fa-star"></i><i class="fa fa-star disable"></i><i
                class="fa fa-star disable"></i><i class="fa fa-star disable"></i><i
                class="fa fa-star disable"></i>${stars[0]}</a></li>
</ul>`;
  return str;
};

helper.creatStar = (star)=>{
 
  stars = star?Math.floor(star):0;
  let str = '';
  for (let index = 0; index < stars; index++) {
    str += `<i class="fa fa-star"></i>`
  }
  for (let index = stars; index < 5; index++) {
    str += `<i class="fa fa-star disable"></i>`
  }

  return str;
}

module.exports = helper;
