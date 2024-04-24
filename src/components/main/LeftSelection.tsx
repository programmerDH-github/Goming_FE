/**
 * @설명 잔여 질문뽑기 횟수 안내
 * @작성자 김상훈
 * @일자 2023.04.10.
 * @내용 잔여 질문뽑기 횟수 안내
 */
const LeftSelection = ({todayLeftCount}: LEFT_COUNT) => {
  return (
    <>
      <div>
        <p>남은 질문 뽑기 횟수 : {todayLeftCount}</p>  
      </div>    
    </>
  )
}
type LEFT_COUNT = {
  todayLeftCount: number
}
export default LeftSelection