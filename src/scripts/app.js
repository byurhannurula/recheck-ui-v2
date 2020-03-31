const $ = o => document.querySelector(o)
const $$ = o => document.querySelectorAll(o)

// window.addEventListener('DOMContentLoaded', () => {
//   drawTable()
// })

// const data = [
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     'Category',
//     'Keywords, test...',
//     '<a href="#">In Progress</a>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     'Category',
//     'Keywords, test...',
//     '<a href="#">View Certificate</a>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     'Category',
//     'Keywords, test...',
//     '<a href="#">In Progress</a>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     'Category',
//     'Keywords, test...',
//     '<a href="#">In Progress</a>'
//   ],
//   [
//     '<input type="checkbox" />',
//     'document.pdf',
//     '0x3B362c9bab6C8694c278D12E79aBb94e5D943805',
//     new Date().toISOString().split('T')[0],
//     'Category',
//     'Keywords, test...',
//     '<a href="#">View Certificate</a>'
//   ]
// ]

// function drawTable() {
//   // get the reference for the body
//   const tableHead = document.querySelector('#table > thead')
//   const tableBody = document.querySelector('#table > tbody')

//   // creating rows
//   for (var r = 0; r < data.length; r++) {
//     const row = document.createElement('tr')

//     // create cells in row
//     for (var c = 0; c < data[r].length; c++) {
//       const cell = document.createElement('td')
//       if (c === 2) {
//         cell.innerHTML = data[r][c].substring(0, 15).concat('...')
//       } else {
//         cell.innerHTML = data[r][c]
//       }
//       row.appendChild(cell)
//     }

//     tableBody.appendChild(row) // add the row to the end of the table body
//   }
// }
