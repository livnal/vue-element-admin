
import dayjs from 'dayjs'

export function getTodayDate() {
  return dayjs().format('YYYY-MM-DD')
}
export function formatDayHHMM(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
