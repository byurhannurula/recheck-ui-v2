const identityDd = selectElement('.identity-dd-button')
const identityDdButton = selectElement('.identity-dd-button > button.btn')
const identityCopyButton = selectElement(
  '.identity-dd-button > .dropdown .dropdown-link'
)

window.addEventListener('DOMContentLoaded', eventListeners())

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

