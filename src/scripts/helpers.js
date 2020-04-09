function smartTruncate(elem, baseWidth = 160, firstHalfLength = 10) {
  if (elem.width() < baseWidth || elem.length < firstHalfLength) {
    return elem
  }

  const firstHalf = elem.substring(0, firstHalfLength) + '...'
  const secondHalfWidth = baseWidth - firstHalf.width()
  let tempElem = elem.substring(firstHalfLength, elem.length - 1)

  while (tempElem.width() > secondHalfWidth) {
    tempElem = tempElem.substr(1)
  }

  return firstHalf + tempElem
}

String.prototype.width = function (font) {
  var f = font || '14px Rubik',
    o = $('<div></div>')
      .text(this)
      .css({
        position: 'absolute',
        float: 'left',
        'white-space': 'nowrap',
        visibility: 'hidden',
        font: f
      })
      .appendTo($('body')),
    w = o.width()

  o.remove()

  return w
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

const getClosest = function (elem, selector, className = 'is-active') {
  if (!event.target.closest(selector)) {
    elem.classList.contains(className) ? elem.classList.remove(className) : ''
  }
}

function shortenFileName(fileName, maxLength = 24) {
  if (fileName.length > maxLength) {
    let fileNameAndExtension = getFileNameAndExtension(fileName)

    let name = fileNameAndExtension.dataName
    let ext = fileNameAndExtension.dataExtension

    // //24 - 2 for *. - extension length
    fileName = `${name.substring(0, maxLength - 2 - ext.length)}*.${ext}`
  }

  return fileName
}

function getFileNameAndExtension(fileName) {
  let extension = '.unknown'
  let extensionDotIndex = fileName.lastIndexOf('.')

  if (extensionDotIndex > 0) {
    extension = fileName.substring(extensionDotIndex)
    fileName = fileName.substring(0, extensionDotIndex)
  }

  return {
    dataName: fileName,
    dataExtension: extension
  }
}
