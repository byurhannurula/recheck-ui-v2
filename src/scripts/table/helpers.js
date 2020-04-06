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
  const authParams = `api=1&token=c1030e40-77cf-11ea-a768-5f2acbeed30b`
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
    // return data
  } catch (error) {
    console.log(error)
  }
}

const dataTemplate = (object) => {
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
      <td>
        ${
          object.keywords.length > 15
            ? object.keywords.substring(0, 12).concat('..')
            : object.keywords
        }
      </td>
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
