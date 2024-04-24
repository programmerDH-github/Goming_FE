import 'assets/components/answered-list/left-answer-period.css'

/**
 * @설명 이번달 남은 기간
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 해당월 남은 일자 출력 컴포넌트
 * @todo: 부모 컴포넌트에서 날짜의 해당월 요소 전달받아서 로직 처리
 */
const LeftAnswerPeriod = () => {
  const thisMonth = new Date().getMonth()+1                                     //이번달
  const totalDays = new Date(new Date().getFullYear(), thisMonth, 0).getDate(); //이번달 총일수
  const leftDays = (totalDays - new Date().getDate() + 1).toString()                //남은일수
  const leftDaysAry = Array.from(leftDays)                                      //배열로변경

  //만약 배열길이가 1개면, 0으로 1번째 요소 입력. (map 돌리기전에)
  leftDaysAry.length < 2 && leftDaysAry.unshift('0')

  return (
    <>
      <div className="left-answer-period">
        <p className='body3-bold '>이번 달 답변 확인까지 남은 기간</p>
        <div className="left-answer-period-datearea">
          <p className="left-answer-period-cover-white">D</p>
          <p className="left-answer-period-text-white">-</p>
          <p className="left-answer-period-cover-white">{leftDaysAry[0]}</p>
          <p className="left-answer-period-cover-white">{leftDaysAry[1]}</p>
        </div>
      </div>
    </>
  )
}

export default LeftAnswerPeriod