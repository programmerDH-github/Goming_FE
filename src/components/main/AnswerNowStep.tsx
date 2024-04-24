import { useEffect, useState } from "react"
import useCardState from "store/modules/CardState";

/**
 * @설명 N번째 질문 텍스트
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const AnswerNowStep = () => {
  const [nowSelectionStep, setSelectionStep] = useState<number>(1);
  const [stepText, setStepText] = useState<string>('');
  const {todayCardSelectStep} = useCardState()   //카드 뽑기 단계 조회

  useEffect(()=>{
    if (todayCardSelectStep > 3) {
      console.log('오늘의 카드 뽑기 단계가 3을 초과했습니다.')
    } else {
      setSelectionStep(todayCardSelectStep)               //질문회차 값 세팅
      switch (todayCardSelectStep) {
      case 1: setStepText('첫'); break;
      case 2: setStepText('두'); break;
      case 3: setStepText('세'); break;
      default: setStepText('첫'); break;
    }
  }
  },[])

  return (
    <>
      <div className="caption1-regular" style={{width: '75px', height: '24px', padding: '4px 8px', color:'#3D3938', marginTop:'24px', marginLeft:'16px', borderRadius:'4px', background:'#E9E7E2', textAlign:'center',  }}>
        {stepText}번째 질문
      </div>
    </>
  )
}

export default AnswerNowStep