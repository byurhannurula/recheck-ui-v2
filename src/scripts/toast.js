const alertTemplate = state => `
  <div class="content">
    <svg class="icon icon-${state || 'info'}">
      <use xlink:href="#icon-${state || 'info'}"></use>
    </svg>
    <p></p>
  </div>
  <button type="button" aria-labell="alert-close">OK</button>
`

const alert = {
  init() {
    this.hideTimeout = null

    this.el = document.createElement('div')
    this.el.className = 'alert'
    this.el.setAttribute('data-animation', 'on')

    document.body.appendChild(this.el)
  },
  notify(state, message) {
    clearTimeout(this.hideTimeout)

    this.el.innerHTML = alertTemplate(state)
    this.el.querySelector('.content p').textContent = message

    if (state) {
      this.el.classList.remove(
        'alert-info',
        'alert-error',
        'alert-warning',
        'alert-success'
      )
      this.el.classList.add(`alert-${state}`, 'is-active')
    }

    this.hideTimeout = setTimeout(() => this.closeAlert(this.el), 2000)
  },
  closeAlert(element) {
    element.classList.contains('is-active')
      ? element.classList.remove('is-active')
      : ''
  }
}

document.addEventListener('DOMContentLoaded', alert.init())
