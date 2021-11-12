export const showTime = function(date) {
  const formatDate = new Date(date)
  let minutes = formatDate.getMinutes() < 10 ? '0' + formatDate.getMinutes() : formatDate.getMinutes()
  return formatDate.getHours() + ':' + minutes
}