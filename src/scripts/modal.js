const modals = selectElements('.modal')

const modalOpenButtons = selectElements('.modal-btn')
const allModalCloseButtons = selectElements('[aria-label="modal-close"]')

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

// add listener to all modal for esc key
document.addEventListener('keydown', (e) => {
  const active = activeModal()
  if (active) {
    if (e.keyCode === 27) {
      closeModal(active)
    }
  }
})

// ==========================================================================

const modalDroparea = selectElement('#droparea')
const dropareaInput = selectElement('.modal-upload .file-upload')
const modalBody = selectElement('.modal-upload .modal-body')

document.addEventListener('dragover', (e) => e.preventDefault())
modalDroparea.addEventListener('drop', (e) => {
  e.preventDefault()
  handleFileUpload(e)
})

modalDroparea.addEventListener('click', () => dropareaInput.click())
dropareaInput.addEventListener('change', (e) => handleFileUpload(e))

async function handleFileUpload(e) {
  const file =
    e.type === 'drop'
      ? e.dataTransfer.files[0]
      : e.type === 'change'
      ? e.target.files[0]
      : ''

  if (!file) return

  if (file.length > 1) {
    console.log('Please drop only one file.')
    return
  }

  let fileSize = file.size
  console.log('File size: ', fileSize)

  let fileNameExtension = getFileNameAndExtension(file.name)
  console.log('Filename:', fileNameExtension)

  const payload = await readFileAsync(file)

  let fileObj = {
    dataName: fileNameExtension.dataName,
    dataExtension: fileNameExtension.dataExtension,
    payload: payload,
    category: '',
    keywords: ''
  }

  console.log(fileObj)
}
