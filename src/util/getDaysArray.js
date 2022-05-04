import { formatDateMonthDay } from './formatDate'

export const getDaysArray = (s, e) => {
  let start = new Date(s)
  let end = new Date(e)

  const arr = []
  while (start <= end) {
    const currStart = new Date(start)
    const formatedDate = formatDateMonthDay(currStart)
    arr.push(formatedDate)
    start.setDate(start.getDate() + 1)
  }

  return arr
}

export const getTimeSpanData = (timeSpan, data) => {
  let timeSpanData = []
  const endDate = new Date().getTime()
  let startDate = new Date()

  switch (timeSpan.value) {
    case 'week':
      startDate.setDate(startDate.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1)
      break
    case 'six-month':
      startDate.setMonth(startDate.getMonth() - 6)
      break
    case 'year':
      startDate.setFullYear(new Date().getFullYear() - 1)
      break
    case 'all':
      startDate = Math.min.apply(
        Math,
        data.map(o => o.date)
      )
      break
    default:
      break
  }

  timeSpanData = data
    .filter(el => el.date >= startDate)
    .map(el => {
      const currDate = el.date
      const weight = el.weight
      return {
        ...el,
        x: formatDateMonthDay(currDate),
        y: weight,
      }
    })
  console.log(timeSpanData)

  return {
    labels: getDaysArray(startDate, endDate),
    data: timeSpanData,
  }
}
