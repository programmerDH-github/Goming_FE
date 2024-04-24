import SelectionCard from "components/main/SelectionCard"
import 'assets/pages/main/mainContent.css'
import NowSelectionStep from "components/main/NowSelectionStep"
import TodayDate from "components/main/TodayDate"
import useCardState from "store/modules/CardState"
import TodayAnswerCompleted from "components/main/TodayAnswerCompleted"
import { useEffect, useState } from "react"
import useDefaultSets from "store/modules/Defaults"
import Header from "components/auth/Header"
import Footer from "components/Footer"
import NavigationBar from 'components/NavigationBar'
import { useNavigate } from "react-router-dom"
import useAuthStore from "store/modules/Auth"
/**
 * @설명 카드 뽑기 메인 화면
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const MainContent = () => {
  const navigate = useNavigate()
  const {setHeaderText, setIsNavigation} = useDefaultSets(state => state)
  const {userInfo} = useAuthStore();
  const {
    todayCardSelectStep,      //금일 남은 답변 횟수
    getCardSelectStep,        //금일 남은 답변 횟수 가져오기 [1-3]
    todayCardSelectStatus,    //금일 카드 뽑기 가능 여부
    getCards,                 //4개의 카드 정보 가져오기
    fourCards,                //4개의 카드 정보
    oneCard,                  //단일 카드 정보
    updateTodayCardSelectStatus //금일 카드 뽑기 가능 여부 업데이트
  } = useCardState()          //카드 상태 관리 store

  useEffect(() => {
    (async () => {
    updateTodayCardSelectStatus(true)
    
    setHeaderText('')
    setIsNavigation(true)

    /*******************************************************************
     * 메인로직
     *******************************************************************/
    await getCardSelectStep(userInfo.eml)     //금일 남은 답변 횟수 가져오기 [1-3]
    
    if (todayCardSelectStep > 3) {      //3번 모두 답변했을 경우
      updateTodayCardSelectStatus(false)  //금일 카드 뽑기 가능 여부 업데이트

    } else {
      if(fourCards.length === 0 && oneCard.length === 0) {    // 4개의 카드 정보가 없을 경우
        getCards(userInfo.eml)        // 4개의 카드 정보 가져오기 or 단일 카드 정보 조회
      } 
    }
  })()
    return () => setIsNavigation(false)
  },[])

  if (!todayCardSelectStatus) {  //더이상 안될경우 (3개초과)
    return (
      <>
        <div className="main-content-area">
          <Header></Header>
          <div style={{margin: '0 16px'}}>
            <TodayAnswerCompleted />
          </div>
        </div>
        <Footer></Footer>
        <NavigationBar />
      </>
    )
  } else {
    return (
        <>
          <div className="main-content-area">
            <Header></Header>
            <div style={{margin: '0 16px'}}>
              <TodayDate />      {/* 금일자, 사용자정보 */}
              <NowSelectionStep /> {/* 잔여 선택회수 */}
              <SelectionCard/>  {/* 카드 4개 출력 */}
            </div>
          </div>
          <Footer></Footer>
          <NavigationBar />
        </>
      )
  }
  
}

export default MainContent