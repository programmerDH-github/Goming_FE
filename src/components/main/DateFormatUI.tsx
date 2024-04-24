/**
 * @작성일자 2023.04.26.
 * @작성자 김상훈
 * @desc 답변 날짜 포맷출력
 * @param {string} date
 */
const DateFormatUI = ({date}:any) => {
  
  const korean_days = ["일","월","화","수","목","금","토"];
  //요일 반환 함수
  const getThisDate = (date:any) => {

    return (
      new Date(date).toLocaleDateString() 
      + ' ' 
      + korean_days[new Date(date).getDay()] 
      + '요일'
    )
  }
  return (
    <>
      <p  className="answered-list-item-date">{getThisDate(date)}</p>
    </>
  )
}

export default DateFormatUI

const style = {
  padding: '4px 8px',
  backgroundColor: 'var(--wgray02)',
  color: 'var(--wgray12)'
} 
