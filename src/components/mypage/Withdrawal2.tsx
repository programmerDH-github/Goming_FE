
import { useEffect, useState } from "react"
import WithdrawalInformation from "./WithdrawalInformation"
import useWithdrawalStates from "store/modules/Withdrawals";
/**
 * @설명 회원탈퇴 첫번째 페이지의 내용 컴포넌트
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @param {number} step 단계 
 * @param {Function} setStep useState의 setStep 함수 
 */
const Withdrawal2 = ({step, setStep}: WITHDRAWAL) => {
  const [checkedList, setCheckedList] = useState<Array<string>>([]); //체크박스
  const [itemChecked, setItemChecked] = useState<boolean>(false) //아이템 체크 확인 -> 버튼 활성화용
  const [withdrawalText, setWithdrawalText] = useState<string>('') //textarea 값
  const [withdrawalTextError, setWithdrawalTextError] = useState<boolean>(false) //textarea 에러 확인 -> error 문구 출력용
  const [textCountOverErrorText, setTextCountOverErrorText] = useState<string>('')  //textarea 글자수 관련 에러 문구 '텍스트'
  const {setWithdrawalState} = useWithdrawalStates() //회원탈퇴 관련 states

  // textarea onchange event
  const withdrawalTextKeyupHandler = (e:any) => {
    if (e.target.value.length > 300) {
      setTextCountOverErrorText('최대 길이는 300자 입니다.')
      setWithdrawalTextError(true)
    } else {
      setWithdrawalTextError(false)
    }
    setWithdrawalText(e.target.value)
  }

  //체크박스 체크 확인
  const checkedHandler = (e:any) => {
    //1개이상 선택되었을 경우 확인
    const checkedboxElements = document.getElementsByName("checkbox")
    const checkedboxArray: Array<any> = Array.from(checkedboxElements)
    const checkedboxes: Array<any> = checkedboxArray.filter(item => item.checked)
    if (checkedboxes.length > 0) { 
      const newItem = checkedboxes.map(item => item.value) //체크 된 항목 값 선별
      setCheckedList(newItem) //선택리스트에 추가
      setItemChecked(true) //다음버튼 활성화
    } else {
      setItemChecked(false) //다음버튼 비활성화
    }

    //기타 버튼 체크용
    const otherCheck = document.getElementById('other') as HTMLInputElement
    if (otherCheck.checked === true) {
      document.getElementById('withdrawalTextarea')?.removeAttribute('readOnly')
    } else { //비선택시 내용 작성불가처리 및 초기화
      document.getElementById('withdrawalTextarea')?.removeAttribute('readOnly')
      document.getElementById('withdrawalTextarea')?.setAttribute('readOnly', "readOnly")
      setWithdrawalTextError(false)
      setWithdrawalText("")
      document.getElementById('withdrawalTextareaInfo')?.style.setProperty('color', '#C9C6C0')
    }
  }

  /******************************************************************************** */
  /* 스타일 변경                                                                     */
  /******************************************************************************** */   
  // withdrawalTextError 가 true 일 경우 textarea 하단의 p 태그 color 변경 이벤트
  useEffect(() => {
    if (withdrawalTextError === true) {
      document.getElementById('withdrawalTextareaInfo')?.style.setProperty('color', '#EA4343')  //error
    } else {
      if (withdrawalText.length > 0) {
        document.getElementById('withdrawalTextareaInfo')?.style.setProperty('color', '#3D3938')  //wgray12
      } else {
        document.getElementById('withdrawalTextareaInfo')?.style.setProperty('color', '#C9C6C0')  //wgray06
      }
    }
  },[withdrawalTextError])


  /******************************************************************************** */
  /* 다음 버튼 클릭 이벤트                                                            */
  /******************************************************************************** */
  const updateStep = () => {
    const otherCheck = document.getElementById('other') as HTMLInputElement
    if (otherCheck.checked === true) {
      if( withdrawalText.length < 1 ) {//내용없을시 로직 종료
        setTextCountOverErrorText('기타 선택 시, 답변을 입력해주셔야 합니다.')
        setWithdrawalTextError(true)
        return; 
      } else if (withdrawalText.length > 300) {
        setTextCountOverErrorText('최대 길이는 300자 입니다.')
        setWithdrawalTextError(true)
        return; 
      } else {
        setWithdrawalTextError(false)
      }
    }
    
    if (checkedList.length < 1) {
      return;
    } else {
      // input checkbox 체크된 항목의 값들을 모두 가져와 배열로 저장하기
      const checkedboxElements = document.getElementsByName("checkbox")
      const checkedboxArray: Array<any> = Array.from(checkedboxElements)
      const checkedboxes: Array<any> = checkedboxArray.filter(item => item.checked)
      const checkedboxValues: Array<string> = checkedboxes.map(item => item.value)
      // 기타 선택 시, textarea 값도 저장
      if (otherCheck.checked === true) {
        checkedboxValues.pop()                //기타 선택 시, 마지막 요소 제거
        checkedboxValues.push(withdrawalText) //기타 선택 시, textarea 값 추가
      }
      setWithdrawalState(checkedboxValues)  //store 저장
      setStep(++step) //다음 단계로 이동
    }
  }

  return (
    <>
      <div className='withdrawal-content'>
        {/* 회원탈퇴 공통 텍스트 */}
        <WithdrawalInformation  isLast={false}/> 
        <div className="withdrawal-content-info color-wgray12">
          <p className="body2-bold color-wgray12">
            고밍을 탈퇴하시기에 앞서,<br />
            탈퇴하시는 이유를 알려주세요. <span className="caption1-regular color-wgray10">(중복 선택 가능)</span>
          </p>
          <div className='withdrawal-info word-break-keep-all'>
            <div>
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="#7A7670"/>
              </svg>
            </div>
            <p className='caption1-regular withdrawal-small-info'>
              불편사항을 알려주시면, <br />고밍이 더 나은 서비스를 만드는 데에 큰 도움이 됩니다.
            </p>
          </div>
          <div className="withdrawal-checkbox-wrap body3-regular">
            <div>
              <input className="check-btn" name="checkbox" type="checkbox" id="nofun" onChange={checkedHandler} value={1} />
              <label htmlFor="nofun">재미가 없어요</label>
            </div>
            <div>
              <input className="check-btn" type="checkbox" name="checkbox" id="uncomfortable" onChange={checkedHandler} value={2}/>
              <label htmlFor="uncomfortable">불편해요 (UX/UI)</label>
            </div>
            <div>
              <input className="check-btn" type="checkbox" name="checkbox" id="dontUse" onChange={checkedHandler} value={3}/>
              <label htmlFor="dontUse">잘 사용하지 않아요</label>
            </div>
            <div>
              <input className="check-btn" type="checkbox" name="checkbox" id="noQuestionLike" onChange={checkedHandler} value={4}/>
              <label htmlFor="noQuestionLike">마음에 드는 질문이 없어요</label>
            </div>

            <div>
              {/* 클릭시 textarea 활성화처리 */}
              <input className="check-btn" type="checkbox" name="checkbox" id="other" onChange={checkedHandler} 
              value={5}
              />
              <label htmlFor="other">기타</label>
            </div>
          </div>
          {/* textarea 영역 */}
          <div className="withdrawal-textarea-area">
            <textarea 
              id="withdrawalTextarea"
              readOnly
              value={withdrawalText}
              onChange={withdrawalTextKeyupHandler}
              onKeyUp={withdrawalTextKeyupHandler}
              cols={30} rows={10} 
              placeholder="맘에 드시는 이유가 없다면, 직접 이유를 작성해주세요."
              maxLength={300} 
              className={"withdrawal-textarea body3-regular"}
              style={{outline:
                (withdrawalTextError ? '1px solid #EA4343' : '' )
              }}
            ></textarea>

            {/* 작성오류영역 */}
            <div 
              id="withdrawalTextareaInfo"
              className={'withdrawal-error-area caption2-bold ' + (withdrawalTextError ? 'withdrawal-text-error' : '')}
              >
              <div style={{flex: 1}}>
                <p
                style={{ display: (withdrawalTextError ? 'inline-block' : 'none' ) }}
                
                >{textCountOverErrorText}</p>
              </div>
              <p>{withdrawalText.length}/300</p>
            </div>
          </div>
          {/* 버튼영역 */}
          <div className="withdrawal-button-area">
            <button 
              disabled={!itemChecked}
              type="button" 
              className={'withdrawal-button body3-bold btn-p-xl'} 
              onClick={updateStep}
              >다음</button>
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
export default Withdrawal2