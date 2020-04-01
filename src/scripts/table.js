// drawTable - main function
function drawTable(tableElement, headData, bodyData) {
  // First of all fill the table
  Object.entries(headData).length !== 0 ? fillHead(tableElement, headData) : ''
  bodyData.length !== 0 ? fillBody(tableElement, bodyData) : ''

  // Default row count is 10
  configurePagination(10)

  // on change row count update table
  $('#rowCounts').addEventListener('change', function() {
    configurePagination(this.value)
  })
}

// 1. Fill table head
function fillHead(tableSelector = 'table', data) {
  if (!tableSelector) return
  if (!data) return

  const dataArray = Object.values(data)

  const tableHead = $(`${tableSelector} > thead`) // get thead from table
  const row = document.createElement('tr') // creating head row

  // create cells in row
  for (let column = 0; column < dataArray.length; column++) {
    const cell = document.createElement('th')
    cell.innerHTML = dataArray[column]
    row.appendChild(cell)
  }

  tableHead.appendChild(row) // add the row to the table thead
}

// 2. Fill table body
function fillBody(tableSelector = 'table', data) {
  if (!tableSelector) return
  if (!data) return

  const tableBody = $(`${tableSelector} > tbody`) // get thead from table

  for (let row = 0; row < data.length; row++) {
    const rowElement = document.createElement('tr') // creating the row
    const columnArray = Object.values(data[row]) // Convert objects to array

    // create cells in row
    for (let column = 0; column < columnArray.length; column++) {
      const cellElement = document.createElement('td')

      cellElement.innerHTML = columnArray[column]
      rowElement.appendChild(cellElement)
    }

    tableBody.appendChild(rowElement) // add the row to the table thead
  }
}

function configurePagination(numberOfEntries) {
  const prevButton = $('.pagination #prev-btn')
  const nextButton = $('.pagination #next-btn')
  const paginationRowInfo = $$('.pagination p span')

  let perPage = numberOfEntries
  let currentPage = 0
  let pageIncrement = 0

  // Remove all the rows
  $('#table tbody').innerHTML = ''

  // Fill table with number of entries
  fillBody('#table', bodyData.slice(0, perPage))

  // find num rows and pages count
  let numRows = $$('#table tbody tr').length
  let numPages = Math.ceil(numRows / perPage)

  console.log('number of rows', numRows)
  console.log('number of pages', numPages)

  // Update static info from pagination
  updatePaginationInfo()

  // TODO: Disable buttons if there is no pages, etc...
  // if (numPages <= 1) {
  //   prevButton.disabled = true
  //   nextButton.disabled = true
  // }
  // if (currentPage === 0) {
  //   prevButton.disabled = true
  // }

  // TODO: Can we know on initial load how much files user have and

  nextButton.addEventListener('click', () => {
    pageIncrement++
    currentPage++
    if (pageIncrement > numPages - 1) {
      pageIncrement = numPages - 1
      nextButton.disabled = true
    } else {
      nextButton.disabled = false
    }
    console.log(pageIncrement)
    showTableRows(pageIncrement)
  })
  prevButton.addEventListener('click', () => {
    pageIncrement--
    currentPage--
    if (pageIncrement < 0) {
      pageIncrement = 0
      prevButton.disabled = true
    } else {
      prevButton.disabled = false
    }
    console.log(pageIncrement)
    showTableRows(pageIncrement)
  })

  function showTableRows(currentPage) {
    // Remove all the rows from DOM
    $('#table tbody').innerHTML = ''

    // Replace number from pagination
    updatePaginationInfo()

    // Fill table again
    fillBody(
      '#table',
      bodyData.slice(currentPage * perPage, (currentPage + 1) * perPage)
    )
  }

  function updatePaginationInfo() {
    // Replace number from pagination
    paginationRowInfo.item(0).textContent = currentPage * perPage
    paginationRowInfo.item(1).textContent = (currentPage + 1) * perPage
    paginationRowInfo.item(2).textContent = numRows
  }
}

window.addEventListener(
  'DOMContentLoad',
  drawTable('#table', headData, bodyData)
)

// Filter function with jquery
// var table = $('table')
// $('#phone_header, #facility_header, #spec_header, #city_header').each(
//   function() {
//     var th = $(this),
//       thIndex = th.index(),
//       inverse = false

//     th.click(function() {
//       table
//         .find('td')
//         .filter(function() {
//           return $(this).index() === thIndex
//         })
//         .sortElements(
//           function(a, b) {
//             return $.text([a]) > $.text([b])
//               ? inverse ? -1 : 1
//               : inverse ? 1 : -1
//           },
//           function() {
//             // parentNode is the element we want to move
//             return this.parentNode
//           }
//         )

//       inverse = !inverse
//     })
//   }
// )
