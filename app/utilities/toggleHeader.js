var temp = 0;
var set = (scrollTop) => {

  var header = document.getElementsByClassName("site-header")[0];
  var body = document.body;

  header.style.display = "none";

  body.style.paddingTop = "0";

  temp = scrollTop;

  window.addEventListener("scroll", handleScroll);
};

var handleScroll = (e) => {
  var header = document.getElementsByClassName("site-header")[0];

  if (window.scrollY > temp) {
    header.style.display = "block";
  } else {
    header.style.display = "none";
  }
}

var reset = () => {

  var header = document.getElementsByClassName("site-header")[0];
  var body = document.body;

  header.style.display = "block";
  body.style.paddingTop = "60px";

  window.removeEventListener('scroll', handleScroll);
}

var toggleHeader = {
  set: set,
  reset: reset
};

export default toggleHeader;
