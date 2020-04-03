const selectElement = o => document.querySelector(o)
const selectElements = o => document.querySelectorAll(o)

document.addEventListener('click', function (event) {
  getClosest(sidebar, '.menu-button');
  getClosest(identityDd, '.identity-dd-button');
  getClosest(searchBar, '#search-input', 'mobile-search');
}, false);