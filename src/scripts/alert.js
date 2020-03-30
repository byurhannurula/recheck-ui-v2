const alert = document.querySelector('.alert')
const alertOpenButton = document.querySelector('.alert-trigger-btn')
// const modalCloseButton = document.querySelector('.modal-close-btn')

document.addEventListener('keydown', modalClose)

// to show our modal
alertOpenButton.addEventListener('click', (e) => {
  alert.classList.add('is-active')
})

// to close our modal
// modalCloseButton.addEventListener('click', (e) => {
//   modal.classList.remove('is-active')
// })

// console.log(modal)

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
