const $ = o => document.querySelector(o)
const $$ = o => document.querySelectorAll(o)

// window.addEventListener('DOMContentLoaded', () => {
//   drawTable()
// })

// const tableHeadData = [
//   {
//     '<input type="checkbox" />',
//     'Document Name',
//     'Document ID',
//     'Date',
//     'Category',
//     'Keywords',
//     'Certificate'
//   }
// ]

// const tableBodyData = [
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-red">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-green">Category</span>',
//     'Keywords, test...',
//     '<button type="button" class="btn btn-primary btn-small btn-icon">View Certificate</button>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-blue">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-orange">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-yellow">Category</span>',
//     'Keywords, test...',
//     '<button type="button" class="btn btn-primary btn-small btn-icon">View Certificate</button>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-red">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-green">Category</span>',
//     'Keywords, test...',
//     '<button type="button" class="btn btn-primary btn-small btn-icon">View Certificate</button>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-blue">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-orange">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-yellow">Category</span>',
//     'Keywords, test...',
//     '<button type="button" class="btn btn-primary btn-small btn-icon">View Certificate</button>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-red">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-green">Category</span>',
//     'Keywords, test...',
//     '<button type="button" class="btn btn-primary btn-small btn-icon">View Certificate</button>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-blue">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-orange">Category</span>',
//     'Keywords, test...',
//     `<button type="button" class="btn btn-default btn-small btn-icon">
//       <div class="icon loader loader-sm"></div>
//       In Progress
//     </button>`
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     '<span class="badge badge-yellow">Category</span>',
//     'Keywords, test...',
//     '<button type="button" class="btn btn-primary btn-small btn-icon">View Certificate</button>'
//   ]
// ]

// function drawTable() {
//   // fill table head
//   const tableHead = document.querySelector('#table > thead')
//   // creating head rows
//   for (var r = 0; r < tableHeadData.length; r++) {
//     const row = document.createElement('tr')

//     // create cells in row
//     for (var c = 0; c < tableHeadData[r].length; c++) {
//       const cell = document.createElement('th')
//       cell.innerHTML = tableHeadData[r][c]
//       row.appendChild(cell)
//     }

//     tableHead.appendChild(row) // add the row to the end of the table body
//   }

//   // fill table body
//   const tableBody = document.querySelector('#table > tbody')

//   // creating rows
//   for (var r = 0; r < tableBodyData.length; r++) {
//     const row = document.createElement('tr')

//     // create cells in row
//     for (var c = 0; c < tableBodyData[r].length; c++) {
//       const cell = document.createElement('td')
//       cell.innerHTML = tableBodyData[r][c]
//       // if (c === 2) {
//       //   cell.innerHTML = tableBodyData[r][c].substring(0, 15).concat('...')
//       // } else {
//       //   cell.innerHTML = tableBodyData[r][c]
//       // }
//       row.appendChild(cell)
//     }

//     tableBody.appendChild(row) // add the row to the end of the table body
//   }

//   // on click check checkbox
//   $$('#table > tbody tr').forEach(row => {
//     row.addEventListener('click', () => {
//       if (row.childNodes[0].childNodes[0].checked) {
//         row.childNodes[0].childNodes[0].checked = false
//       } else {
//         row.childNodes[0].childNodes[0].checked = true
//       }

//       $$('#table > tbody tr').forEach(row => {
//         if (row.childNodes[0].childNodes[0].checked) {
//           $('#table > thead tr input[type="checkbox"]').indeterminate = true
//         }
//       })
//     })
//   })
// }
