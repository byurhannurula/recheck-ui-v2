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

function updateQuery() {
  localStorage.setItem(
    'recheckSettings',
    JSON.stringify(currentQuery, (key, value) => {
      return value
    })
  )
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

  updateQuery()
  return await getData()
}

async function getData() {
  if (localStorage.getItem('recheckSettings')) {
    currentQuery = JSON.parse(localStorage.getItem('recheckSettings'))
  } else {
    updateQuery()
  }

  const queryParams = formatParams(currentQuery)
  const authParams = `api=1&token=9ac5df10-7a76-11ea-a768-5f2acbeed30b`
  // 5e0539e0-7a4e-11ea-b307-416a00bd38d3
  const queryUrl = `https://beta.recheck.io/data/created?${authParams}&${queryParams}`

  try {
    const response = await fetch(queryUrl)
    let data = null
    if (response.status === 200) {
      data = await response.json()
      recordsTotal = data.recordsTotal
      recordsFiltered = data.recordsFiltered
      return data
    } else {
      console.log('🚨  ERROR while getting data from API!')
      return null
    }
  } catch (error) {
    console.log(error)
  }
}

function dataState(state) {
  switch (state) {
    case 'complete':
      return ['report', 'primary', 'Completed']
    case 'new':
    case 'in_progress':
    case 'broadcasted':
    case 'retry':
      return ['loading', 'default', 'In Progress']
    case 'pre-new':
    case 'error_chain':
    case 'error_exceed':
    case 'error_network':
    case 'error':
    case 'unknown':
      return ['error', 'danger', 'Error']
    default:
      return ['error', 'danger', 'Error']
  }
}

const dataTemplate = (object, id) => {
  const docState = dataState(object.txStatus)

  return `
    <tr>
      <td>
        <input type="checkbox" class="row" name="row" value="${id + 1}" />
      </td>
      <td>${shortenFileName(`${object.dataName}${object.dataExtension}`)}</td>
      <td value=${object.dataId}>
        ${smartTruncate(object.dataId)}
        <svg class="icon icon-clipboard">
          <use xlink:href="#icon-clipboard" />
        </svg>  
      </td>
      <td>${new Date(object.dateCreated).toLocaleString()}</td>
      <td>
        <span class="badge ${object.category.toLowerCase()}">
          ${object.category}
        </span>
      </td>
      <td>
        ${
          object.keywords.length > 15
            ? object.keywords.substring(0, 12).concat('..')
            : object.keywords
        }
      </td>
      <td>
        <button type="button" class="btn btn-${docState[1]} btn-icon btn-small">
          ${
            docState[0] === 'loading'
              ? `<div class="icon loader loader-sm"></div>`
              : `<svg class="icon icon-${docState[0]}">
              <use xlink:href="#icon-${docState[0]}"></use>
            </svg>`
          }
          ${docState[2]}
        </button>
      </td>
    </tr>
  `
}
