const selectElement = (o) => document.querySelector(o)
const selectElements = (o) => document.querySelectorAll(o)

const searchBar = selectElement('.search-area')
const searchInput = selectElement('#search-input')

const identityDd = selectElement('.profile-button')
const identityDdButton = selectElement('.profile-button > button.btn')
const identityButton = selectElement('.profile-button .dropdown-link')

function eventListeners() {
  identityButton.addEventListener('click', (e) =>
    copyToClipboard(e.target.value)
  )

  identityDdButton.addEventListener('click', () => {
    identityDd.classList.toggle('is-active')
  })

  searchInput.addEventListener('click', (e) => {
    searchBar ? searchBar.classList.add('mobile-search') : ''
  })
}

window.addEventListener('DOMContentLoaded', function () {
  eventListeners()
})

document.addEventListener(
  'click',
  function (event) {
    getClosest(sidebar, '.menu-button')
    getClosest(identityDd, '.profile-button')
    getClosest(searchBar, '.search-form', 'mobile-search')
  },
  false
)
