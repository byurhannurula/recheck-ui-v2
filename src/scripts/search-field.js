const field = document.querySelector('#search-field')
const filterSection = document.querySelector('.search-filter')

field.addEventListener('focus', () => activateFilter())
field.addEventListener('keydown', e => {
  e.preventDefault()
  deactivateFilter()
})
field.addEventListener('submit', e => {
  e.preventDefault()
  deactivateFilter()
})

const activateFilter = () => filterSection.classList.add('is-active')
const deactivateFilter = () => filterSection.classList.remove('is-active')
