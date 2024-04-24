export const dateFormat = {
  /**
   * @desc 날짜를 입력 시, 연월을 출력합니다.
   * @param {any} date
   * @returns {Date} "YYYY-MM"
   */ 
  getYearAndMonth: (date:any) => {
    const year = new Date(date).getFullYear()
    const month = (new Date(date).getMonth() + 1).toString()
    const newMonth:string = month.length === 1 ? '0' + month : month

    return year.toString() + '-' + newMonth
  },

  /**
   * @desc 날짜를 입력 시, 연월일을 출력합니다.
   */
  getYearAndMonthAndDay: (date:any) => {
    const year = new Date(date).getFullYear()
    const month = (new Date(date).getMonth() + 1).toString()
    const newMonth:string = month.length === 1 ? '0' + month : month
    const day = (new Date(date).getDate()).toString()
    const newDay:string = day.length === 1 ? '0' + day : day

    return year.toString() + '-' + newMonth + '-' + newDay
  },

  /**
   * @desc 같은 일자인지 비교
   * @param {Date} date1
   * @param {Date} date2
   * @returns {boolean} true: 같은일, false: 다른일
   */
  isSameDay: (date1:Date, date2:Date) => {
    const Newdate1:string = date1.toString().slice(0,15)
    const Newdate2:string = date2.toString().slice(0,15)
    return new Date(Newdate1).toLocaleDateString() === new Date(Newdate2).toLocaleDateString() 
  },

  KoreaLocale: {
    weekdays: ['일','월','화','수','목','금','토'],
    weekStartsOn: 0,
  }
}

export default dateFormat