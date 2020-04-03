let recordsTotal = null
let recordsFiltered = null

const defaultQuery = {
  draw: '1',
  start: 0,
  length: 10,
  search: { value: '' },
  order: [{ column: '4', dir: 'asc' }]
}
let currentQuery = defaultQuery

function formatParams(params) {
  let result = new URLSearchParams()

  result.append('draw', params.draw)
  result.append('start', params.start)
  result.append('length', params.length)
  result.append('search[value]', params.search.value)
  result.append('order[0][column]', params.order[0].column)
  result.append('order[0][dir]', params.order[0].dir)

  return result.toString()
}

async function setParams(propNames, propValues) {
  let isArray = Array.isArray(propNames) || Array.isArray(propValues)

  if (!isArray) {
    propNames = [propNames]
    propValues = [propValues]
  }

  if (propNames.length !== propValues.length) {
    return alert('error')
  }

  for (let i = 0; i < propNames.length; i++) {
    switch (propNames[i]) {
      case 'start':
        currentQuery.start = propValues[i]
        break
      case 'length':
        currentQuery.length = propValues[i]
        break
      case 'search':
        currentQuery.search.value = propValues[i]
        break
      case 'orderColumn':
        currentQuery.order[0].column = propValues[i]
        break
      case 'orderDir':
        currentQuery.order[0].dir = propValues[i]
        break
    }
  }

  localStorage.setItem(
    'recheckSettings',
    JSON.stringify(currentQuery, (key, value) => {
      return value
    })
  )

  return await getData()
}

async function getData() {
  if (localStorage.getItem('recheckSettings')) {
    currentQuery = JSON.parse(localStorage.getItem('recheckSettings'))
  } else {
    localStorage.setItem(
      'recheckSettings',
      JSON.stringify(currentQuery, (key, value) => {
        return value
      })
    )
  }

  const queryParams = formatParams(currentQuery)
  const authParams = `api=1&token=2f65a310-758d-11ea-a768-5f2acbeed30b`
  const queryUrl = `https://beta.recheck.io/data/created?${authParams}&${queryParams}`

  try {
    const res = await fetch(queryUrl)
    const data = await res.json()
    recordsTotal = data.recordsTotal
    recordsFiltered = data.recordsFiltered

    return data
  } catch (error) {
    console.log(error)
  }
}

async function configurePagination(numberOfEntries) {
  const prevButton = selectElement('.pagination #prev-btn')
  const nextButton = selectElement('.pagination #next-btn')
  const paginationRowInfo = selectElements('.pagination p span')

  let perPage = numberOfEntries
  let currentPage = 1
  let pageIncrement = 1

  // Fill table with number of entries
  fillBody(await setParams('length', 10))

  // Search data
  selectElement('#search-field').addEventListener('submit', e => {
    e.preventDefault()
    const val = selectElement('#search-field').value
    setParams('search', val)
  })

  // find num rows and pages count
  let numRows = recordsTotal
  let numPages = Math.ceil(numRows / perPage)

  console.log('number of rows', numRows)
  console.log('number of pages', numPages)
  console.log('current page number', currentPage, pageIncrement)

  // // Update static info from pagination
  updatePaginationInfo(currentPage)

  // TODO: Disable buttons if there is no pages, etc...
  // .....

  // TODO: Can we know on initial load how much files user have and
  nextButton.addEventListener('click', () => {
    pageIncrement++
    if (pageIncrement > numPages - 1) {
      pageIncrement = numPages - 1
      nextButton.disabled = true
    } else {
      nextButton.disabled = false
    }
    console.log('pageIncrement', pageIncrement)
    showTableRows(pageIncrement)
  })
  prevButton.addEventListener('click', () => {
    pageIncrement--
    if (pageIncrement < 0) {
      pageIncrement = 0
      prevButton.disabled = true
    } else {
      prevButton.disabled = false
    }
    console.log(pageIncrement)
    showTableRows(pageIncrement)
  })

  async function showTableRows(pageNumber) {
    // Remove all the rows from DOM
    selectElement('#table tbody').innerHTML = ''

    updatePaginationInfo(pageNumber)

    // Fill table again
    fillBody(
      await setParams(
        ['start', 'length'],
        [pageNumber * perPage, (pageNumber + 1) * perPage]
      )
    )
  }

  function updatePaginationInfo(pageNumber) {
    console.log('Elements on the page', pageNumber * perPage)
    // Replace number from pagination
    paginationRowInfo.item(0).textContent = 1 + (pageNumber - 1) * perPage
    paginationRowInfo.item(1).textContent = pageNumber * perPage
    paginationRowInfo.item(2).textContent = numRows
  }
}

// drawTable - main function
function drawTable() {
  // Default row count is 10
  // Get data and configure pagination
  configurePagination(10)

  // on change row count update table
  selectElement('#rowCounts').addEventListener('change', function() {
    configurePagination(this.value)
  })
}

const dataTemplate = object => {
  const btnClass =
    object.txStatus === 'complete'
      ? 'primary'
      : object.txStatus === 'error'
      ? 'danger'
      : 'default'

  const btnContent =
    object.txStatus === 'complete'
      ? 'Completed'
      : object.txStatus === 'error'
      ? 'Error'
      : 'In Progress'
  return `
    <tr>
      <td><input type="checkbox" /></td>
      <td>${shortenFileName(`${object.dataName}${object.dataExtension}`)}</td>
      <td value=${object.dataId}>
        ${object.dataId.replace(
          object.dataId.substring(10, object.dataId.length - 10),
          '...'
        )}
        <svg class="icon icon-clipboard">
          <use xlink:href="#icon-clipboard" />
        </svg>
      </td>
      <td>${new Date(object.dateCreated).toLocaleString()}</td>
      <td>
        <span class="badge badge-red">${object.category}</span>
      </td>
      <td>${object.keywords}</td>
      <td>
        <button type="button" class="btn btn-${btnClass} btn-icon btn-small">
        ${
          object.txStatus === 'complete'
            ? `<svg class="icon icon-report"> <use xlink:href="#icon-report" /> </svg>`
            : `<div class="icon loader loader-sm"></div>`
        }
          ${btnContent}
        </button>
      </td>
    </tr>
  `
}

// Fill table body
function fillBody(content) {
  const data = content.data
  console.log('Data for the current page', data)
  const tableBody = selectElement(`#table > tbody`)

  for (let row = 0; row < data.length; row++) {
    const rowElement = dataTemplate(data[row])

    tableBody.innerHTML += rowElement
  }

  selectElements('#table tbody tr > td:nth-child(3)').forEach(td => {
    td.addEventListener('click', e =>
      copyToClipboard(e.target.attributes[0].value)
    )
  })
}

function shortenFileName(fileName, maxLength = 24) {
  if (fileName.length > maxLength) {
    let fileNameAndExtension = getFileNameAndExtension(fileName)

    let name = fileNameAndExtension.dataName
    let ext = fileNameAndExtension.dataExtension

    // //29 - 2 for *. - extension length
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

document.addEventListener('DOMContentLoaded', () => {
  drawTable('#table')
})
