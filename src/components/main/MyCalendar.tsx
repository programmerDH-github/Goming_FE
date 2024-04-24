import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import LeftArrow from "assets/images/left-vector.png";
import RightArrow from "assets/images/right-vector.png";
import {
  SELECT_ICON,
  ANSWER_STEP_1,
  ANSWER_STEP_2,
  ANSWER_STEP_3,
} from "./MyCalendar-Images.js";
import "assets/components/answered-list/custom-calendar.css";
import useAnsweredList from "store/modules/Answers";
import useAuthStore from "store/modules/Auth";
import useDefaultSets from "store/modules/Defaults";
import dateFormat from "composables/MAIN/MyCalenderDateFormat";
import CL from "composables/COMMON/common";

/**
 * @설명 캘린더
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 캘린더 전체 내용 출력
 * @todo 총N개의 답변 수정필요
 */
const MyCalendar = () => {
  const {
    answeredList,
    getAnsweredList,
    getAnsweredCount,
    initAnsweredList,
    updateIsThisMonth,
    setSelectedMonth,
    setSelectDate,
    getAnsweredDateCount,
    initAnsweredDateCount,
    answeredDateCount,
  } = useAnsweredList();

  const { userInfo } = useAuthStore((state) => state);
  const { setHeaderText } = useDefaultSets();

  const [selectedDate, setValue] = useState<any>(new Date()); //calendar - 선택일자
  const today = new Date();
  const [textlabelControl, setTextLabel] = useState<Date>(today); // [선택,오늘] 라벨 제어
  const todayYearMonth = dateFormat.getYearAndMonth(today); //금일 연월
  // const todayMonth = today.getMonth() + 1; //이번달
  // const minDate = today.getDate(); //오늘이후날짜 비활성화 -> 내일날짜
  const [showCalendar, setShowCalendar] = useState<boolean>(true); //calendar 보이기 숨기기 처리
  const [activeCalendarBtn, setActiveCalendarBtn] = useState<boolean>(false); //calendar 보이기숨기기 버튼 - active/disabled 처리

  // const [mark, setMark] = useState<Array<string>>([]);

  /****************************************************************************
   * 오늘 날짜 관련 요소 사용 - 캘린더관련
   ****************************************************************************/
  //day 클릭 이벤트
  const updateDate = async (nextValue: any) => {
    //초기화
    if (selectedDate) {
      //선택한 일자가 같은 경우
      if (selectedDate.getDate() === nextValue.getDate()) {
        setSelectedMonth(nextValue.getMonth()); //선택된 월 store 세팅
        setValue(null);
        setActiveCalendarBtn(true); //리스트만보기 버튼
        getMonthData(nextValue); //전체목록 초기화 및 [월] 데이터 조회

      } else {//선택한 일자가 다른 경우 
        setTextLabel(nextValue); //[선택-오늘]변경제어
        setValue(nextValue); //현재선택된날짜설정
        setActiveCalendarBtn(false); //리스트만보기 버튼        
        getDayData(nextValue); //전체목록 초기화 및 재조회
      }
    }
    //일자를 선택했을 경우 ----------------------------------------------------------------------------------------
    else {
      setTextLabel(nextValue); //[선택-오늘]변경제어
      setValue(nextValue); //현재선택된날짜설정
      getDayData(nextValue); //전체목록 초기화 및 재조회
      setActiveCalendarBtn(false); //리스트만보기 버튼
    }
  };

  // [월] 이동 이벤트 - RightArrow control
  /**
   * @desc [월] 이동 이벤트
   * @param {Date} nextValue
   * @param
   * @returns {void}
   */
  const CheckIsThisMonth = async ({
    action,
    activeStartDate,
    value,
    view,
  }: any) => {
    initAnsweredList(); //답변목록 초기화
    initAnsweredDateCount(); //날짜별 답변개수 초기화

    //선택한 월의 답변한 개수 조회
    await getAnsweredDateCount({
      date: dateFormat.getYearAndMonth(activeStartDate),
      email: userInfo.eml,
    });

    // 이동한 월이 당월일 경우, 오늘 날짜가 선택되도록 처리
    if (dateFormat.getYearAndMonth(activeStartDate) === todayYearMonth) {
      setValue(today); //선택일자 오늘로 변경
      setTextLabel(today); //라벨영역제어
      updateIsThisMonth(true); //원페이저 다운로드 표시
      setActiveCalendarBtn(false); //리스트만보기 버튼 비활성화
    } else {
      setValue(null); //선택한[일] 초기화
      setTextLabel(activeStartDate); //라벨영역제어
      updateIsThisMonth(false); //남은기간표시
      getMonthData(activeStartDate); //월간데이터 조회
      setActiveCalendarBtn(true); //리스트만보기 버튼 active
    }

    setSelectedMonth(activeStartDate.getMonth() + 1); //선택된 월 store 세팅
    if (dateFormat.getYearAndMonth(activeStartDate) >= todayYearMonth) {
      //활성화된날짜 >= 오늘연월 ?
      updateIsThisMonth(true); //원페이저 다운로드 표시
    } else {
      updateIsThisMonth(false); //남은기간표시
    }

    setSelectDate(activeStartDate);
  };

  // 해당 일자의 데이터 목록 [월/일]별 조회
  const getQnAList = async (date: Date, type: String) => {
    // type 에 따른 date 포맷 변경
    const convertedDate =
      type === "month"
        ? dateFormat.getYearAndMonth(date)
        : dateFormat.getYearAndMonthAndDay(date);
    const param = { email: userInfo.eml, date: convertedDate };

    //해당 일자의 데이터가 없을 때, api 호출하지 않음
    const hasData = answeredDateCount?.findIndex(
      (item) => item.date.toString() === convertedDate
    ); // 동일한 일자인지 체크
    if (type === "day" && hasData === -1) {
      initAnsweredList()
    } else {
      await getAnsweredList(param); //date, count 포맷 데이터 조회
    }

    if (type === "month") {
      //월
      getAnsweredCount({
        date: convertedDate.split("-"),
        email: userInfo.eml,
        type: type,
      });
    } else {
      //일
      getAnsweredCount({
        date: convertedDate,
        email: userInfo.eml,
        type: type,
      });
    }
  };

  //& 해당 [월]의 데이터 목록 조회
  const getMonthData = (date: any) => {
    getQnAList(date, "month");
  };

  // 해당 월의 [일] 데이터 목록 조회
  const getDayData = (date: any) => {
    getQnAList(date, "day");
  };

  /****************************************************************************
   * 데이터 설정
   ****************************************************************************/
  /**
   * @desc 데이터가 있는 날짜의 nodeList를 체크 -> 값과 비교 -> 클래스 추가
   */
  const updateCalendarWithDesign = () => {
    const dayLists = Array.from(document.querySelectorAll("abbr")); //노드item
    dayLists.forEach((item, index) => {
      if (index < 7) {
        item.classList.add("body3-regular"); //[월-일] 폰트 지정
      } else {
        item.classList.add("body3-bold"); //일자 폰트 지정
      }
    });
  };

  /****************************************************************************
   * 일반 기능 함수
   ****************************************************************************/
  // 달력 보이기/숨기기 처리
  const controlCalendarArea = () => {
    const calendarContent = document.getElementsByClassName(
      "react-calendar__viewContainer"
    )[0] as HTMLBodyElement;
    const calendarLabels = document.getElementById(
      "calendarLabels"
    ) as HTMLBodyElement;
    calendarContent.style.display = showCalendar ? "none" : "block"; //true -> hide, false -> show
    calendarLabels.style.display = showCalendar ? "none" : "flex"; //true -> hide, false -> show
    setShowCalendar(!showCalendar); //state 변경
  };

  /****************************************************************************
   * 컴포넌트 렌더링 시 호출 함수
   ****************************************************************************/
  // textlabelControl 변경 시, 실행
  useEffect(() => {
    updateCalendarWithDesign(); //달력 디자인 변경
  }, [textlabelControl]);

  //1회만 실행
  useEffect(() => {
    const newMonth: any = dateFormat.getYearAndMonth(today);
    getQnAList(newMonth, "month");
    setSelectDate(selectedDate); //cardstore 에 selectedDate 기본 설정
    getAnsweredDateCount({
      date: dateFormat.getYearAndMonth(today),
      email: userInfo.eml,
    });
    getAnsweredCount({
      date: dateFormat.getYearAndMonth(today).split("-"),
      email: userInfo.eml,
      type: "month",
    }); //해당일자 데이터 조회
    setHeaderText("");
  }, []);
  /****************************************************************************/

  //date format 변경
  const transformDate = ({ date, locale }: any) => {
    const day: string = (new Date(date).getMonth() + 1).toString(); //월-문자화
    const newDay: string = day.length === 1 ? "0" + day : day;
    const newDate: string =
      new Date(date).getFullYear().toString() + ". " + newDay;
    return newDate;
  };

  return (
    <>
      <div className="calendar-wrap">
        {/* 달력 */}
        <Calendar
          className="custom-calendar"
          onChange={updateDate}
          value={selectedDate}
          navigationLabel={({ date, label, locale, view }) =>
            transformDate({ date, locale }).replace(" ", "")
          }
          formatDay={(locale, date) => date.getDate().toString()}
          prevLabel={<img src={LeftArrow} alt={"<"} width={24} height={24} />}
          prev2Label={null} //첫달선택  << 없애기
          nextLabel={<img src={RightArrow} alt={">"} width={24} height={24} />}
          next2Label={null} //마지막달선택 >> 없애기
          minDetail="month" //최소 디테일 : [월]
          maxDetail={"month"} //최대 디테일 : [월]
          locale={"ko"}
          showNeighboringMonth={false} //이전,이후 날짜 show/hide
          //[월]이동 이벤트
          onActiveStartDateChange={({ action, activeStartDate, value, view }) =>
            CheckIsThisMonth({ action, activeStartDate, value, view })
          }
          //tile 스타일지정
          tileClassName={({ date, view }) => {
            const convertedDate = dateFormat.getYearAndMonthAndDay(date); //연-월-일 포맷 변경
            const index = answeredDateCount?.findIndex(
              (item) => item.date.toString() === convertedDate
            ); // 동일한 일자인지 체크

            if (index > -1) {
              return "cal-item-" + answeredDateCount[index].count;
            }
          }}
        />

        {/* 달력 숨기기 버튼 */}
        <div className="calendar-aside-btn-wrap">
          <button
            className="btn-p-xs caption1-bold"
            onClick={controlCalendarArea}
            disabled={!activeCalendarBtn}
          >
            {
              // 1. 캘린터 보일 경우/ 안보일 경우      - text
              // 2. 날짜를 선택했을 경우 / 안했을 경우 - disabled
              showCalendar ? "리스트만 보기" : "캘린더도 보기"
            }
          </button>
        </div>
      </div>

      {/* 하단 라벨 영역 */}
      <div className="answer-list-labels-wrap" id="calendarLabels">
        {dateFormat.getYearAndMonth(textlabelControl) <= todayYearMonth && ( //선택일자 <= 금일자
          <div className="answer-list-labels caption1-bold">
            <img src={SELECT_ICON} alt="" width={12} height={12} />
            {dateFormat.isSameDay(textlabelControl, today) ? (
              <span>오늘</span> /* 1. 당월 */
            ) : (
              <span>선택</span> /* 2. 전월 */
            )}
          </div>
        )}{" "}
        {/* 3. 미래 시점 : 표시안함*/}
        <div className="answer-list-labels caption1-bold">
          <img src={ANSWER_STEP_1} alt="" width={12} height={12} />
          답변1회
        </div>
        <div className="answer-list-labels caption1-bold">
          <img src={ANSWER_STEP_2} alt="" width={12} height={12} />
          답변2회
        </div>
        <div className="answer-list-labels caption1-bold">
          <img src={ANSWER_STEP_3} alt="" width={12} height={12} />
          답변3회
        </div>
      </div>
    </>
  );
};

export default MyCalendar;
