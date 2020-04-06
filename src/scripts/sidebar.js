const menuButton = selectElement('.menu-button')
const closeButton = selectElement('.close-button')

const sidebar = selectElement('.sidebar')
const sidebarNav = selectElement('.sidebar .nav')
const navItems = selectElements('nav.nav .nav--item')

menuButton.addEventListener('click', (e) => {
  sidebar.classList.toggle('is-active')
})

closeButton.addEventListener('click', () => {
  sidebar.classList.contains('is-active')
    ? sidebar.classList.remove('is-active')
    : ''
})

navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation()
    // e.preventDefault()
    const activeElement = sidebarNav.querySelector('.is-active')

    activeElement.classList.contains('is-active')
      ? activeElement.classList.remove('is-active')
      : ''

    item.classList.toggle('is-active')
  })
})
