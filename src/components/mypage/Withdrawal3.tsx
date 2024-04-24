import { useState } from "react"
import WithdrawalInformation from "./WithdrawalInformation"
import useWithdrawalStates from "store/modules/Withdrawals"

/**
 * @설명 회원탈퇴 세번째 페이지의 내용 컴포넌트
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {number} step 단계 
 * @param {Function} setStep useState의 setStep 함수 
 */
const Withdrawal3 = ({step, setStep}: WITHDRAWAL) => {
  const [withdrawalText, setWithdrawalText] = useState<string>('') //textarea 값
  const {setWithdrawalState, withdrawal} = useWithdrawalStates() //회원탈퇴 관련 states
  //탈퇴하기 버튼 클릭 이벤트
  const withdrawalLastStep = async () => {
    //store 에서 회원탈퇴 저장 및 api 호출
    setWithdrawalState(withdrawalText)
    const result = await withdrawal() //회원탈퇴 api 호출
    if (result === false) {
      setStep(++step)
    } else {
      //모든 로직 종료 후 step 값 변경
       setStep(++step)
    }
  }
  return (
    <>
      <div className='withdrawal-content'>
        {/* 회원탈퇴 공통 텍스트 */}
        <WithdrawalInformation isLast={true}/> 
        <div className='body2-bold withdrawal-content-info'>
          <p className='word-break-keep-all mb-12'>
            그동안 고밍을 사용하시면서<br/>
            ‘나’를 돌아보고 하루하루를 의미있는 습관으로<br/>
            채워나가는 경험을 하셨길 바랍니다. 
          </p>
          <p className='withdrawal-font-size-16 word-break-keep-all' style={{marginTop: '12px'}}>
            마지막으로 고밍에게 남기고 싶은 말이 있다면 남겨주세요 :) 
          </p>

          {/* textarea  */}
          <div style={{marginTop: '12px'}}>
            <textarea 
              id="withdrawalTextarea2"
              value={withdrawalText}
              onChange={(e) => setWithdrawalText(e.target.value)}
              className="withdrawal-textarea body3-regular" cols={30} rows={10} 
              placeholder="글자 수 제한없이, 고밍에게 하고 싶은 말을 자유롭게 남겨 주세요.&#13;&#10;좋았던 점, 개선되었으면 하는 점 등, 뭐든지 좋아요."
              maxLength={1000}
              ></textarea>
          </div>

          <div className='withdrawal-button-area'>
            <button className='withdrawal-button btn-p-xl body3-bold' type="button" onClick={() => withdrawalLastStep()}>탈퇴하기</button>
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
export default Withdrawal3