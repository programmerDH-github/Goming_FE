import { useEffect } from "react";
import AnsweredListContent from "components/main/AnsweredListContent";
import LeftAnswerPeriod from "components/main/LeftAnswerPeriod";
import MyCalendar from "components/main/MyCalendar";
import GoToOnePagerBtn from "components/main/GoToOnePagerBtn";
import useAnsweredList from "store/modules/Answers";
import Header from "components/auth/Header";
import Footer from "components/Footer";
import NavigationBar from "components/NavigationBar";
import useDefaultSets from "store/modules/Defaults";
import useAuthStore from "store/modules/Auth";

/**
 * @설명 답변목록 조회
 * @작성자 김상훈
 * @일자 2023.04.22.
 * @내용 사용자가 답변한 내용 조회
 */
const AnsweredList = () => {
  const { isThisMonth } = useAnsweredList();
  const { setIsNavigation } = useDefaultSets();
  useEffect(() => {
    setIsNavigation(true);
  }, []);

  return (
    <>
      <Header></Header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "0 16px 32px 16px" }}>
          {isThisMonth ? <LeftAnswerPeriod /> : <GoToOnePagerBtn />}
          <MyCalendar />
        </div>
        {/* divider */}
        <div className="answered-list-divider"></div>

        <div style={{ margin: "0 16px" }}>
          <AnsweredListContent />
        </div>
      </div>
      <Footer></Footer>
      <NavigationBar></NavigationBar>
    </>
  );
};

export default AnsweredList;

/**
 * 1. 답변확인까지 남은기간
 * 2. 캘린더
 *  - 이번달 캘린더 조회시 (월 단위로 끊기)
 *    > 답변한 일자 및 횟수 조회
 *      > 캘린더에 표기(css참고)
 *    > 목록 비우기
 *  - 지난달 캘린더 조회시
 *    > 지난달 목록 전체 조회
 *    > 지난달 특정일자 클릭 시
 *      > 해당 일자의 답변 확인
 *
 */
