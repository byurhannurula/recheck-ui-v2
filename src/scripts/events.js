const identityDd = selectElement('.identity-dd-button')
const identityDdButton = selectElement('.identity-dd-button > button.btn')
const identityCopyButton = selectElement(
  '.identity-dd-button > .dropdown .dropdown-link'
)

window.addEventListener('DOMContentLoaded', eventListeners())

// Listen for all clicks on the document
document.addEventListener('click', e => {
  handleOuterClick(e, '.sidebar', sidebar)
})

function eventListeners() {
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
