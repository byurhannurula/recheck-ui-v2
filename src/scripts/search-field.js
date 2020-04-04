const searchBar = selectElement('.search-area')
const searchInput = selectElement('#search-input')

searchInput
  ? searchInput.addEventListener('click', e => {
      searchBar ? searchBar.classList.add('mobile-search') : ''
    })
  : ''
