const $ = o => document.querySelector(o)
const $$ = o => document.querySelectorAll(o)

const menuButton = $('.menu-button')
const closeButton = $('.close-button')

const sidebar = $('.sidebar')
const sidebarNav = $('.sidebar .nav')
const navItems = $$('.nav .nav--item')

const identityDd = $('.identity-dd-button')
const identityDdButton = $('.identity-dd-button > button.btn')
const identityCopyButton = $('.identity-dd-button > .dropdown .dropdown-link')

window.addEventListener('DOMContentLoaded', eventListeners())

// Listen for all clicks on the document
document.addEventListener('click', e => {
  handleOuterClick(e, '.sidebar', sidebar)

  // If the click happened inside the the container
  // const el = e.target.closest('.identity-dd-button .dropdown')
  // console.log(el)
  // if (!el) return

  // // Otherwise, run our code...
  // identityDd.classList.contains('is-active')
  //   ? identityDd.classList.remove('is-active')
  //   : ''
})

function eventListeners() {
  menuButton.addEventListener('click', () => {
    !sidebar.classList.contains('is-active')
      ? sidebar.classList.add('is-active')
      : ''
  })

  closeButton.addEventListener('click', () => {
    sidebar.classList.contains('is-active')
      ? sidebar.classList.remove('is-active')
      : ''
  })

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()

      const activeElement = sidebarNav.querySelector('.is-active')

      activeElement.classList.contains('is-active')
        ? activeElement.classList.remove('is-active')
        : ''

      item.classList.contains('is-active')
        ? item.classList.remove('is-active')
        : item.classList.add('is-active')
    })
  })

  identityCopyButton.addEventListener('click', e => {
    copyToClipboard(e.target.value)
  })

  identityDdButton.addEventListener('click', () => {
    identityDd.classList.contains('is-active')
      ? identityDd.classList.remove('is-active')
      : identityDd.classList.add('is-active')
  })
}

function handleOuterClick(e, closestElement, element) {
  // If the click happened inside the the container
  const el = e.target.closest(closestElement)
  if (!el) return

  // Otherwise, run our code...
  element.classList.contains('is-active')
    ? element.classList.remove('is-active')
    : ''
}

function copyToClipboard(valueToCopy) {
  // Create a 'hidden' input
  var aux = document.createElement('input')
  // Assign it the value of the specified element
  aux.setAttribute('value', valueToCopy)
  // Append it to the body
  document.body.appendChild(aux)
  // Highlight its content
  aux.select()
  // Copy the highlighted text
  document.execCommand('copy')
  // Remove it from the body
  document.body.removeChild(aux)
}
