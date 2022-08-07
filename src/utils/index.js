import moment from 'moment'

export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1)
}

export function getDaysDiff(start, end) {
  return moment(end).startOf('day').diff(moment(start).startOf('day'), 'days')
}
