const modal = $('.modal')
const modalOpenButton = $('.modal-open-btn')
const modalCloseButton = $('.modal-close-btn')

document.addEventListener('keydown', modalClose)

// to show our modal
modalOpenButton.addEventListener('click', (e) => {
  modal.classList.add('is-active')
})

// to close our modal
modalCloseButton.addEventListener('click', (e) => {
  modal.classList.remove('is-active')
})

console.log(modal)

function modalClose(e) {
  if (!e.keyCode || e.keyCode === 27) {
    // code to close modal goes here
  }
}

// mOverlay.addEventListener('click', (e) => {
//   if (e.target == modal.parentNode) {
//     modalClose(e)
//   }
// }, false)
