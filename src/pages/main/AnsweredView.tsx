import { useEffect, useState } from "react"
import useDefaultSets from "store/modules/Defaults"
import 'assets/pages/main/answeredView.css'
import { useLocation } from "react-router-dom"
import fetch from "utils/fetch"
import DateFormatUI from "components/main/DateFormatUI"
import AnsweredCategoryUI from "components/main/AnsweredCategoryUI"
import Header from "components/auth/Header"
import Footer from "components/Footer"
import NavigationBar from "components/NavigationBar"
import useAnsweredList from "store/modules/Answers"

/**
 * @desc 답변 상세 화면
 * @desc 만약 데이터 조회가 안될 시 이전페이지로 이동 하도록 처리
 */
const AnsweredView = () => {
  const {setHeaderText, setIsNavigation} = useDefaultSets()          //header
  const location = useLocation()                    //parameter
  const state = location.state as { a_num: number; };
  const a_num = state.a_num                         //getParameter
  const {answeredView} = useAnsweredList()

  useEffect(() => {
    setHeaderText('답변 상세 보기')
    setIsNavigation(false)

    // 전달받은 값이 존재하지 않을경우
    if (!answeredView) {
      window.history.back()
    } 

    return () => setHeaderText()
  },[])

  //

  return (
    <>
      <div className="answered-view-wrap">
          <Header></Header>
          <div className="answered-view-inner-wrap">
            <div className="answered-list-item-header-wrap caption1-regular">
              <DateFormatUI date={answeredView.date} />
              <AnsweredCategoryUI category={answeredView.category} />
            </div>
            <div className="body1-bold answered-list-item-q answered-list-item-q-2">
              {answeredView.question}
            </div>
            <div className="body2-regular answered-view-item-a">
              {answeredView.answer}
            </div>
          </div>
      </div>
      <Footer></Footer>
    </>
  )
}

// answer 타입 선언
type ANSWER = {
  date: string
  category: string
  question: string
  answer: string
}

export default AnsweredView