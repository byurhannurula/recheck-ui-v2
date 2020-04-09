const modals = selectElements('.modal')

const modalOpenButtons = selectElements('.modal-btn')
const allModalCloseButtons = selectElements('[aria-label="modal-close"]')

// add listener to all modal for esc key
// modals.forEach((modal) => {
//   modal.addEventListener('keydown', () => {
//     const active = activeModal()
//     console.log(active)
//   })
// })

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
allModalCloseButtons.forEach((btn) => {
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

// ==========================================================================

const uploadModal = selectElement(`#droparea`)
const uploadInput = selectElement('.modal-upload .file-upload')

window.addEventListener('dragenter', (e) => e.preventDefault(), false)
window.addEventListener('dragover', (e) => e.preventDefault(), false)
uploadModal.addEventListener('drop', (e) => {
  e.preventDefault()
  handleFileUpload(e)
}, false)

uploadModal.addEventListener('click', () => uploadInput.click(), false)

uploadInput.addEventListener('click', (e) => {
  handleFileUpload(e)
})

function handleFileUpload(e) {
  console.log(e)
  const file =
    e.type === 'click'
      ? e.target.files[0]
      : e.type === 'drop'
      ? e.dataTransfer.files[0]
      : ''

  // if (!file) return

  console.log(file)
}
