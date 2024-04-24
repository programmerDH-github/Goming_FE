import tacImg from 'assets/images/main/today-answer-completed.png'
import 'assets/components/card-select-main/todayAnswerCompleted.css'
import { useNavigate } from 'react-router-dom'
import Header from 'components/auth/Header'
import useNavBarStatus from 'store/modules/NavBar'
/**
 * @설명 고밍 기록 안내유도 페이지
 * @작성자 김상훈
 * @일자 2023.04.10.
 * @내용 3개의 질문에 답변을 완료한 경우 [고밍기록]페이지로 이동하도록 유도하는 컨텐츠
 */
const TodayAnswerCompleted = () => {
  const navigate = useNavigate()
  const { updateStatus } = useNavBarStatus((state) => state);
  const goToCalendarList = () => {
    updateStatus(2)
    navigate('/answered-list', {replace: true})
  }
  return (
    <>
      <div className="tacompleted-wrap">
        <div className='info-img-wrap'>
          <img src={tacImg} alt="도서및연필이미지" width={146} height={115} />
        </div>
        <div className='info-text-wrap'>
          <p className='headline3'>오늘의 질문선택과<br/>회고기록을 모두 완료했어요!</p>
          <p className='body2-regular'>이번 달, 나의 고밍 기록 현황을<br/> 보러 가볼까요?<br/></p>
        </div>
        <div className='info-btn-wrap'>
          <button className='btn-p-xl body3-bold' onClick={goToCalendarList}>나의 고밍 기록 보러 가기</button>
        </div>
      </div>
    </>
  )
}

export default TodayAnswerCompleted
