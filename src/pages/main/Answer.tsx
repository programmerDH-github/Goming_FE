import 'assets/pages/main/answerContents.css'
import Header from "components/auth/Header";
import AnswerNowStep from "components/main/AnswerNowStep";
import ConfirmPopup from "components/ConfirmPopup";
import useAuthStore from "store/modules/Auth";
import AlertTextPopup from "components/AlertTextPopup";
import Footer from "components/Footer";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDefaultSets from "store/modules/Defaults";
import useCardState from "store/modules/CardState";
import useAnsweredList from 'store/modules/Answers';

const Answer = () => {
  const {setHeaderText} = useDefaultSets()
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<string>('')               //답변
  const [isError, setIsError] = useState<boolean>(false)         //에러
  const [btnActive, setBtnActive] = useState<boolean>(true)      //버튼제어
  const [saveClicked, setSaveClicked] = useState<boolean>(false) //저장버튼 클릭여부
  const [isSaved, setIsSaved] = useState<boolean>(false)         //DB연동 성공여부 (저장성공)
  const [needToLogin, setNeedToLogin] = useState<boolean>(false) //로그인안했을 경우 출력 confirm 팝업 처리
  const [confirmText, setConfirmText] = useState<string>('')      //confirm 팝업 텍스트
  const [confrimButtonText, setConfirmButtonText] = useState<string>('') //confirm 팝업 버튼 텍스트
  
  const {oneCard, todayCardSelectStep, updateCardSelectStep, answerQuestion, resetAllCards} = useCardState()   //카드답변횟수(총답변개수(2개일때 마지막))
  const {passAnswer} = useAnsweredList() //답변 건너뛰기
  const {userInfo, isLogin} = useAuthStore() //사용자 정보

  useEffect(() => { 
    if (todayCardSelectStep === 3) {
      setConfirmText("그래도 고밍 페이지로 가시겠어요?")
      setConfirmButtonText("고밍 페이지로 이동하기")
    } else {
      setConfirmText("또한, 오늘의 질문 선택 기회도 그대로 1회 차감됩니다./n그래도 다음 질문 선택 페이지로 가시겠어요?")
      setConfirmButtonText("질문 선택하러 가기")
    }
    setHeaderText('답변 작성하기')
    if (oneCard.length === 0) {
      navigate('/main', {replace:true})
    }
    
  },[])

  /******************************************************************/
  /* @desc 답변                                                     */
  /******************************************************************/
  //답변 작성 핸들러
  const handleAnswer = ({target}:any) => { 
    setAnswer(target.value)
    if (target.value.length > 270 ) {
      setIsError(true);   //에러출력
      setBtnActive(true); //버튼제어
    } else {
      setIsError(false);    //에러없애기
      setBtnActive(false);  //버튼제어
    }
    if(target.value.length === 0) { //버튼제어
      setBtnActive(true);
    }
  }

  /******************************************************************/
  /* @desc 답변 저장로직                                             */
  /******************************************************************/
  //1.답변 저장여부 체크 - confirm popup
  const handleSave = () => {
    setSaveClicked(true)  //confirmpopup 출력
  }

  //2.로그인 체크
  const loginCheck = () => {
    setSaveClicked(false) //팝업 닫기
    //로그인 여부에 따라 [저장, 로그인유도]
    isLogin ? insertAnswer() : setNeedToLogin(false)
  }

  // 로그인 되었을 경우
  // 2.답변 저장 - api 호출 - callbackfunction
  const insertAnswer = async () => {
    const param:ANSWER_CONTENT = {
      qNo: oneCard[0].qno,           //질문 index
      aWriter: userInfo.eml,         //작성자
      aAnswerContent: answer,        //답변 내용
      category: oneCard[0].qcategory //카테고리
    }
    const response = await answerQuestion(param) //답변 저장
    if (response) {
      setIsSaved(true)                  //저장 성공 세팅 
      navigate('/main', {replace:true}) //메인화면으로 이동
    }
  }

  //로그인 안했을 경우
  const goToLogin = () => {
    navigate('/login')  //로그인페이지로 이동
  }

  //다음 질문 카드 뽑으러 가기
  const goToNextQuestion = () => {   
    let newTodayCardSelectStep = todayCardSelectStep
    updateCardSelectStep(++newTodayCardSelectStep) //단계 추가(답변없음)
    navigate('/main', {replace:true})   //새로운 카드 출력 or 캘린더 화면으로 이동처리
  }


  /******************************************************************/
  /* @desc 질문 건너뛰기                                             */
  /******************************************************************/
  const [skipPopup, setSkipPopup] = useState<boolean>(false);
  //질문건너뛰기
  const fncPassAnswer = async () => {
    const param = {
      qNo: oneCard[0].qno, //질문 index
      email: userInfo.eml, //답변작성자
    }

    await passAnswer(param) //답변 건너뛰기
    
    let newTodayCardSelectStep = todayCardSelectStep
    updateCardSelectStep(++newTodayCardSelectStep) //단계 추가(답변없음)
    resetAllCards()                               //카드 초기화
    navigate('/main', {replace:true})             //메인화면으로 이동(카드선택 화면)
  }

  return (
    <>
      <div>
        <Header></Header>
        <div className="answer-wrap">
          <div className="question-wrap">
            {/* 질문 컴포넌트 */}
            <AnswerNowStep />
            {/* 질문 내용 */}
            <p className="question-content body1-bold">{oneCard[0]?.qquestion}</p>
          </div>

          {/* 답변영역 */}
          <div className="answer-content">
            <textarea 
              value={answer} 
              onChange={handleAnswer}  
              placeholder="클릭해서 나의 답변을 작성해보세요!"
              className="answer-textarea body2-regular"
              maxLength={300}
              >
            </textarea>
            <div className='answer-comment-area' >
              {
                isError ? (<p className="answer-error-text caption2-bold answer-error" >270자 이하로 적어주세요.</p>) 
                : (<p className="answer-error-text caption2-bold">&nbsp;</p>)
              }
              <p 
                className={'answer-text-count caption2-bold ' + (isError ? 'answer-error' : '')}
                style={{color: btnActive ? '' : '#96938C'}}
              >{answer.length}/270</p>
            </div>
          </div>

          <div className="answer-btn-area">
            <button 
              type="button" 
              disabled={btnActive} 
              className="answer-btn-confirm btn-p-xl body3-bold" 
              onClick={handleSave}
              >저장하기</button>
            <button type="button" className="answer-btn-cancel btn-s-xl body3-bold" onClick={()=>setSkipPopup(true)}>이번 질문은 넘어갈래요</button>

          </div>
        </div>
      </div>

      {/* 1.답변 저장여부 체크 - 저장하기 버튼 클릭 시 confirm popup 출력 */
        saveClicked && (
          <ConfirmPopup 
            strongText="작성하신 내용을 저장할까요?"            //강조문구
            text="저장 후에는 수정이 불가하며, 저장된/n회고록은 월말에 확인할 수 있게 됩니다."   //일반 텍스트 문구
            confirmText="저장하기"                             //confirm 문구
            cancelText="돌아가기"                              //cancel 문구
            callbackFunction={loginCheck}                     //confirm 확인
            closeCallbackFuntion={()=>setSaveClicked(false)}  //cancel 팝업 닫기
          />
        )
      }

      {/* 2.로그인 했을 경우 출력 */
        isSaved && (
          // 3번째 답변이었을 경우
          todayCardSelectStep === 3 ? (
              <AlertTextPopup 
                strongText="작성하신 오늘의 회고가 저장되었습니다."    //강조문구
                text="오늘 하루도 수고 많았어요 :)"                   //일반문구1
                confirmText="고밍 페이지로 돌아가기"                   //confirm 문구
                callbackFunction={goToNextQuestion}                 //메인페이지로 이동
          />
          ) : (
            <AlertTextPopup 
              strongText="작성하신 오늘의 회고가 저장되었습니다."     //강조문구
              text="참 잘했어요:)"                                  //일반문구1
              text2="이제 다음 질문을 선택하러 가볼까요?"             //일반문구2
              confirmText="질문 선택하러 가기"                       //confirm 문구
              callbackFunction={goToNextQuestion}                  //메인페이지로 이동
            />
          )
          
        )
      }

      {/* 2.로그인 안했을 경우 출력 */
        needToLogin && (
          <ConfirmPopup 
            text="잠깐! 작성하신 내용을 저장하기 위해서는 로그인이 필요합니다!"   //일반 텍스트 문구
            confirmText="로그인 하러 가기"                             //confirm 문구
            cancelText="일단 계속 둘러보기"                            //cancel 문구
            callbackFunction={goToLogin}                              //confirm 확인
            closeCallbackFuntion={()=>setNeedToLogin(false)}          //cancel 팝업 닫기
            isFlex={false}
          />
        )
      }

      {/* skip 눌렀을 경우 */
        skipPopup && (
          <ConfirmPopup 
            strongText="지금 이 페이지를 나가면/n다시 돌아올 수 없어요!"
            text = {confirmText}
            confirmText={confrimButtonText}                   //confirm 문구
            cancelText="돌아가기"                              //cancel 문구
            callbackFunction={fncPassAnswer}               //confirm 확인
            closeCallbackFuntion={()=>setSkipPopup(false)}    //cancel 팝업 닫기
            isFlex={false}
            isReverse={true}
          />
        )
      }


      <Footer></Footer>
    </>
  )
}

type ANSWER_CONTENT = {
  qNo: number
  aWriter: string
  aAnswerContent: string
  category: string
}

export default Answer;

