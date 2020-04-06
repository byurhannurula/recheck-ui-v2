const modals = selectElements('.modal')

const modalOpenButtons = selectElements('.modal-btn')
const modalCloseButtons = selectElements('.modal .modal-header > button')

// to show our modals
modalOpenButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.dataset.type) {
      showModal(selectElement(`.modal.modal-${e.target.dataset.type}`))
    } else {
      showModal(selectElement(`.modal`))
    }
  })
})

// to close our modals
modalCloseButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const active = activeModal()
    closeModal(active)
  })
})

function activeModal() {
  let active = null
  modals.forEach((modal) => {
    if (modal.classList.contains('is-active')) {
      active = modal
    }
  })
  return active
}

function showModal(element) {
  element.classList.toggle('is-active')
}

function closeModal(element) {
  element.classList.contains('is-active')
    ? element.classList.remove('is-active')
    : ''
}
