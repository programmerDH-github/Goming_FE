import { useNavigate } from 'react-router-dom'
import WithdrawalInformation from './WithdrawalInformation'
import 'assets/components/withdrawalComponents.css'

/**
 * @설명 회원탈퇴 첫번째 페이지의 내용 컴포넌트
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {number} step 단계 
 * @param {Function} setStep useState의 setStep 함수 
 */
const Withdrawal1 = ({step, setStep}: WITHDRAWAL) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='withdrawal-content'>
        {/* 회원탈퇴 공통 텍스트 */}
        <WithdrawalInformation isLast={false}/> 
        {/* 본문 */}
        <div className='withdrawal-content-info color-wgray12'>
          <p className='body2-bold  word-break-keep-all'>
            고밍에서 작성하신 모든 질문과 답변이 삭제되며,<br />
            삭제된 정보는 다시 복구할 수 없습니다.
          </p>
          <p className='body2-bold word-break-keep-all' style={{marginTop: "12px"}}>
            탈퇴를 계속 진행하시겠습니까?
          </p>
          
          <div className='caption1-regular withdrawal-info word-break-keep-all'>
            <div>
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="#7A7670"/>
              </svg>
            </div>
            <p className='caption1-regular withdrawal-small-info'>
              탈퇴하시기 전에 간직하고 싶은 답변이 있다면,<br/>
              <strong>고밍 기록</strong>에서 그간의 기록을 다운받아 주세요.
            </p>
          </div>

          <div className='withdrawal-button-area'>
            <button className='withdrawal-button withdrawal-yes btn-s-xl body3-bold' type="button" onClick={() => setStep(++step)}>네</button>
            <button className='withdrawal-button withdrawal-no btn-p-xl body3-bold' type="button" onClick={() => navigate(-1)}>아니오</button>
          </div>
        </div>
      </div>
      </>
  )
}
type WITHDRAWAL = {
  step: number
  setStep: Function
}
export default Withdrawal1