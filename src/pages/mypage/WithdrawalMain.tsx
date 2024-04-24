import {useEffect, useState} from 'react'
import Header from 'components/auth/Header'
import { motion } from "framer-motion";
import Withdrawal1 from 'components/mypage/Withdrawal1';
import Withdrawal2 from 'components/mypage/Withdrawal2';
import Withdrawal3 from 'components/mypage/Withdrawal3';
import ConfirmPopup from 'components/ConfirmPopup';
import AlertTextPopup from 'components/AlertTextPopup';
import { useNavigate } from 'react-router-dom';
import useDefaultSets from 'store/modules/Defaults';
import Footer from 'components/Footer';
import useAuthStore from 'store/modules/Auth';

/**
 * @설명 회원탈퇴 첫번째 페이지
 * @작성자 김상훈
 * @생성일자 2023.04.06.
 * @TODO motion 적용, BE연결
 */
const WithdrawalMain = () => {
  const {setHeaderText,setIsNavigation} = useDefaultSets()

  useEffect(()=>{
    setHeaderText('회원 탈퇴')
    setIsNavigation(false)
    return () => {
      setHeaderText('')
      setIsNavigation(true)
    }
  },[])

  const navigate = useNavigate()
  const [step, setStep] = useState(1) //컴포넌트 단계 제어
  const [withdrawalCompleted, setWithdrawalCompleted] = useState<boolean>(false)
  const {userInfo, withdrawalUser} = useAuthStore((state)=>state)

  //탈퇴버튼을 최종적으로 눌렀을 경우
  const withdrawalAction = () => { 
    setStep(5)                     //popup안보이게 처리
    withdrawalUser(userInfo.eml)   //회원탈퇴로직
    setWithdrawalCompleted(true)   //메인으로이동 팝업출력
  }

  //탈퇴 완료 시 이동할 페이지 : 로그인
  const moveToMain = () => {
    navigate('/login', {replace: true}) //navigate 초기화
  }

  return (
    <>
    <div>
      <Header></Header>
      <div style={{margin: '0 16px'}}>
        <motion.div
            // key={step}
            // src={imgList[page]}
            // initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
            // animate={{ opacity: 1,  x: 0 }}
            // exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
        >

        {
          step === 1 ? (<Withdrawal1 step={step} setStep={setStep}/>)
            : (step === 2 ? (<Withdrawal2 step={step} setStep={setStep}/>) 
              : (<Withdrawal3 step={step} setStep={setStep}/>)
            ) 
        }
        
        </motion.div>

        { //step === 4 일시 탈퇴하기 알림 팝업
          step === 4 ? (
          <ConfirmPopup 
            text="고밍을 탈퇴하시겠습니까?" 
            confirmText={'아니오'}
            cancelText={'네'}
            callbackFunction={() => setStep(3)} 
            closeCallbackFuntion={withdrawalAction} 
            />
          ) : ''
        }
        { //회원 탈퇴 완료시
          withdrawalCompleted === true ? (
          <AlertTextPopup strongText='고밍의 탈퇴가 완료되었습니다.' text="감사합니다!" callbackFunction={moveToMain} />
          ) : ''
        }
      </div>
    </div>
    <Footer></Footer>
    </>
  ) 
}

export default WithdrawalMain