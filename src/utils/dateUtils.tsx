
// YYYY-MM-DD 형태의 문자열로 반환
export const getDateFormat01 = (getDate: GET_DATE_FORMAT_01) => {
  const date = new Date(getDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month}-${day}`
}
type GET_DATE_FORMAT_01 = string | Date

/**
 * @desc YYYY-MM 형태의 문자열로 변환
 * @parameter date : Date
 * @return YYYY-MM
 */
export const parseYearAndMonth = (date: Date | String) => {
  const year = new Date(date.toString()).getFullYear() 
  let month = (new Date(date.toString()).getMonth() + 1).toString()
  month = month.length === 1 ? `0${month}` : month

  return `${year}-${month}`
}