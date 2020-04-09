let recordsTotal = null
let recordsFiltered = null

const defaultQuery = {
  draw: '1',
  start: 0,
  length: 10,
  search: { value: '' },
  order: [{ column: '3', dir: 'desc' }]
}
let currentQuery = defaultQuery

const prevButton = selectElement('.pagination #prev-btn')
const nextButton = selectElement('.pagination #next-btn')
const paginationInfo = selectElements('.pagination p span')

async function initPagination(entriesPerPage) {
  // Fill tablle with default settings
  loadData(await setParams('length', entriesPerPage))

  let maxRows = entriesPerPage
  let currentPage = 1
  let totalRows = recordsTotal
  let totalPages = Math.ceil(totalRows / maxRows)

  // On change row count update table
  selectElement('#rowCounts').addEventListener('change', function () {
    maxRows = this.value
    totalPages = Math.ceil(totalRows / maxRows)
    updateTable()
  })

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1
  } else if (currentPage > totalPages) {
    currentPage = totalPages
  }

  handleButtons()
  updatePaginationInfo()

  prevButton.addEventListener('click', function () {
    currentPage--
    handleButtons()
    updateTable()
  })

  nextButton.addEventListener('click', function () {
    currentPage++
    handleButtons()
    updateTable()
  })

  async function updateTable() {
    handleButtons()
    // Update pagination info
    updatePaginationInfo()

    // Update table content
    loadData(
      await setParams(
        ['start', 'length'],
        [(currentPage - 1) * maxRows, maxRows]
      )
    )
  }

  function updatePaginationInfo() {
    let startIndex = (currentPage - 1) * maxRows
    let endIndex = Math.min(startIndex + maxRows - 1, totalRows - 1)

    paginationInfo.item(0).textContent = startIndex + 1
    paginationInfo.item(1).textContent = endIndex + 1
    paginationInfo.item(2).textContent = totalRows
  }

  function handleButtons() {
    if (totalPages === 1) {
      prevButton.disabled = true
      nextButton.disabled = true
    } else if (currentPage <= 1) {
      prevButton.disabled = true
      nextButton.disabled = false
    } else if (currentPage >= totalPages) {
      nextButton.disabled = true
      prevButton.disabled = false
    } else {
      nextButton.disabled = false
      prevButton.disabled = false
    }
  }
}

// drawTable - main function
function loadTable() {
  // Default row count is 10
  // Get data and configure pagination
  initPagination(10)

  // Sort elements
  selectElements(
    `#table > thead th:nth-child(0), th:nth-child(2), th:nth-child(3)`
  ).forEach((th) => {
    th.addEventListener('click', async (e) => {
      const el = e.target
      const currentData = el.dataset

      if (currentData.sortdir && currentData.sortdir === 'asc') {
        el.setAttribute('data-sortDir', 'desc')
        loadData(
          await setParams(
            ['orderColumn', 'orderDir'],
            [el.cellIndex.toString(), currentData.sortdir]
          )
        )
      } else if (currentData.sortdir && currentData.sortdir === 'desc') {
        el.setAttribute('data-sortDir', 'asc')
        loadData(
          await setParams(
            ['orderColumn', 'orderDir'],
            [el.cellIndex.toString(), currentData.sortdir]
          )
        )
      } else if (!currentData.sortdir) {
        el.setAttribute('data-sortDir', 'asc')
        loadData(
          await setParams(
            ['orderColumn', 'orderDir'],
            [el.cellIndex.toString(), currentData.sortdir]
          )
        )
      }
    })
  })

  // Element search
  selectElement('.search-form').addEventListener('keyup', async (e) => {
    const searchVal = e.target.value
    if (searchVal.length >= 3 || searchVal.length === 0) {
      loadData(
        await setParams(
          ['start', 'length', 'search'],
          (currentPage - 1) * maxRows,
          maxRows,
          searchVal
        )
      )
    }
  })
}

// Fill table body
function loadData({ data }) {
  const tableBody = selectElement(`#table > tbody`)
  tableBody.innerHTML = ''

  for (let row = 0; row < data.length; row++) {
    const rowElement = dataTemplate(data[row], row)
    tableBody.innerHTML += rowElement
  }

  // Add event listener to copy data id
  selectElements('#table tbody tr > td:nth-child(3)').forEach((td) => {
    td.addEventListener('click', (e) =>
      copyToClipboard(e.target.attributes[0].value)
    )
  })

  $('#selectAll').click(function () {
    var checkAll = $('#selectAll').prop('checked')
    if (checkAll) {
      $('.row').prop('checked', true)
    } else {
      $('.row').prop('checked', false)
    }
  })

  $('.row').click(function () {
    if ($('.row').length === $('.row:checked').length) {
      $('#selectAll').prop('indeterminate', false)
      $('#selectAll').prop('checked', true)
    } else if ($('.row:checked').length === 0) {
      $('#selectAll').prop('indeterminate', false)
    } else {
      $('#selectAll').prop('indeterminate', true)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadTable('#table')
})
