// Date Formatter
export function formatDate(timestamp) {
  const dateObject = new Date(timestamp)

  const day = dateObject.getDate().toString().padStart(2, '0')
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObject.getFullYear()

  return `${day}.${month}.${year}`
}

// Number Formatter

export function formatNumber(number) {
  let cleanNumber = String(number).replace(/\D/g, '')

  let formattedNumber = cleanNumber.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')

  return formattedNumber
}

// Status Options

export const optionsStatus = [
  { id: 'Barchasi', name: 'Barchasi' },
  { id: 'Yangi', name: 'Yangi' },
  { id: 'Moderatsiyada', name: 'Moderatsiyada' },
  { id: 'Tasdiqlangan', name: 'Tasdiqlangan' },
  { id: 'Bekor qilingan', name: 'Bekor qilingan' }
]

// University type options

export const optionsType = [
  { id: 'Barchasi', name: 'Barchasi' },
  { id: 'Bakalavr', name: 'Bakalavr' },
  { id: 'Magistr', name: 'Magistr' }
]

// Pagination generator

export function generatePaginationData(currentPagination, totalCardNumber, currentPageCardsNumber) {
  const lastPagination = Math.ceil(totalCardNumber / currentPageCardsNumber)
  const firstPagination = 1
  let arr = []

  let leftSide = []

  if (currentPagination - firstPagination > 3) {
    leftSide = [firstPagination, '...', currentPagination - 1]
  } else if (currentPagination - firstPagination < 3) {
    for (let i = firstPagination; i < currentPagination; i++) {
      leftSide.push(i)
    }
  } else {
    leftSide = [firstPagination, firstPagination + 1, currentPagination - 1]
  }

  let rightSide = []
  if (lastPagination - currentPagination > 3) {
    rightSide = [currentPagination + 1, '...', lastPagination]
  } else if (lastPagination - currentPagination < 3) {
    for (let i = currentPagination + 1; i <= lastPagination; i++) {
      rightSide.push(i)
    }
  } else {
    rightSide = [currentPagination + 1, currentPagination + 2, lastPagination]
  }
  arr = [...leftSide, currentPagination, ...rightSide]
  return arr
}
