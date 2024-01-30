export function formatNumber(number) {
  // Convert the number to a string and remove any non-digit characters
  let cleanNumber = String(number).replace(/\D/g, '')

  // Split the string into groups of three from the right
  let formattedNumber = cleanNumber.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')

  return formattedNumber
}
