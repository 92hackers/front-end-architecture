let temp = 0;

const handleScroll = () => {
  const header = document.getElementsByClassName('site-header')[0];

  if (window.scrollY > temp) {
    header.style.display = 'block';
  } else {
    header.style.display = 'none';
  }
}

const set = (scrollTop) => {
  const header = document.getElementsByClassName('site-header')[0];
  const body = document.body;

  header.style.display = 'none';

  body.style.paddingTop = '0';

  temp = scrollTop;

  window.addEventListener('scroll', handleScroll);
};

const reset = () => {
  const header = document.getElementsByClassName('site-header')[0];
  const body = document.body;

  header.style.display = 'block';
  body.style.paddingTop = '60px';

  window.removeEventListener('scroll', handleScroll);
}

const toggleHeader = {
  set,
  reset,
}

export default toggleHeader;
