import { create } from "zustand";
import axios from "axios";
import {parseYearAndMonth} from "utils/dateUtils";

type ANSWER_LIST = {
  answeredList: ANSWER_TYPE; //답변목록
  getAnsweredList: Function; //답변목록 조회
  initAnsweredList: Function; //답변목록 초기화

  answeredDateCount: Array<any>; //월 혹은 일별 답변 개수
  getAnsweredDateCount: Function; //해당 date의 qna count 조회
  initAnsweredDateCount: Function; //해당 날짜의 답변목록개수 목록 초기화

  answeredCount: Number; //답변한 개수
  getAnsweredCount: Function; //답변한 개수 조회
  initAnsweredCount: Function; //답변 개수 초기화

  answeredView: ANSWER; //답변상세 내용 1개
  updateAnsweredView: Function; //답변상세 내용 저장 혹은 삭제

  isThisMonth: boolean; //MyCalendar 기준, 페이지의 당월 상태 유무
  updateIsThisMonth: Function; //페이지의 당월 상태변경함수

  selectedMonth: string; //현재선택되어진 월
  setSelectedMonth: Function; //현재선택되어진 월 set
  selectedDate: string; //선택한 날짜
  setSelectDate: Function; //선택한 날짜 저장

  passAnswer: Function; //이번 질문은 넘어갈래요
};

type ANSWER = {
  //qna 리스트 목록 객체
  date: string;
  category: string;
  question: string;
  answer: string;
};

type ANSWER_TYPE = {
  content: Array<any>;
  page: number;
  size: number;
  totalElements: number;
};

/**
 * @desc 해당 date 가 이번 달 이상인지 체크 
 * - 년도도 체크 해야함
 * - 일자는 체크하지않음
 * @uses dateUtils
 * @returns {boolean} true: 날짜 이후, false: 날짜 이전
 */
const checkIsMonthOver = (date: Array<any>|string): boolean => {
  const parsedDate = typeof date === "string" ? date : date[0] + "-" + date[1]
  return parseYearAndMonth(parsedDate) >= parseYearAndMonth(new Date())
}

/**
 * @desc Main - QNA List 상태관리
 */
const useAnsweredList = create<ANSWER_LIST>((set) => ({
  answeredList: { content: [], page: 0, size: 0, totalElements: 0 },
  answeredCount: 0,
  answeredDateCount: [],
  answeredView: { date: "", question: "", category: "", answer: "" },
  isThisMonth: true,
  selectedDate: "", //선택한 날짜
  selectedMonth: (new Date().getMonth() + 1).toString(),

  /**
   * @desc 해당 월의 qna 리스트 조회
   * @return answeredList update
   */
  getAnsweredList: async (param: any) => {
    //param.date 가 이번 달 혹은 미래의 경우, api 를 조회하지 않고 빈 배열 반환
    if (checkIsMonthOver(param.date)) {
      set({answeredList: { content: [], page: 0, size: 0, totalElements: 0 }});
    } else {
      param.size = param.size === undefined || null || "" ? 15 : param.size;
      param.page = param.page === undefined || null || "" ? 1 : param.page;

      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/question/answered/${
          param.email
        }/${param.date.toString()}?size=${param?.size}&page=${param?.page}`
      );
      if (typeof result?.data === "object") {
        if (result.data?.content?.length > 0) {
          // answer 컬럼의 값이 존재하지 않을 경우 목록에서 해당 객체를 제거
          for (let i = 0; i < result?.data.content.length; i++) {
            if (result?.data.content[i]) {
              if (result.data.content[i]?.answer.trim().length === 0) {
                result?.data.content.splice(i, 1);
                i--;
              }
            }
          }
          const newList = result?.data ? result?.data : []; //값이 없을 경우 빈 배열로 초기화
          set({ answeredList: newList });
        } else {
          set({
            answeredList: {
              content: result?.data,
              page: 0,
              size: 100,
              totalElements: result?.data.length,
            },
          });
        }
      } else {
        set({answeredList: { content: [], page: 0, size: 0, totalElements: 0 }});
      }
    }    
  },

  /**
   * @desc 해당 date의 qna count 를 리스트로 조회
   */
  getAnsweredDateCount: async (param: any) => {
    if (checkIsMonthOver(param.date)) {
      set({ answeredCount: 0 });
      set({ answeredDateCount: [] });
    } else {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/question/answeredCountDatesInMonth/${param.email}/${param.date}`
      );
      set({ answeredDateCount: result?.data });
    }
  },

  /**
   * @desc 해당 날짜의 답변목록개수 목록 초기화
   */
  initAnsweredDateCount: (): void => {
    set({ answeredDateCount: [] });
  },

  /**
   * @desc 해당 월의 qna 리스트 초기화
   */
  initAnsweredList: (): void => {
    set({ answeredList: { content: [], page: 0, size: 0, totalElements: 0 } });
  },

  /**
   * @desc 해당 월에 답변한 개수 조회
   * @param date
   * @param email
   * @param type
   */
  getAnsweredCount: async (param: any) => {
    if (checkIsMonthOver(param.date)) {
      set({ answeredCount: 0 });
    } else {
      let url: string = `${process.env.REACT_APP_API_URL}/api/question/answeredCount/${param.email}/`;

      if (param.type === "month") {
        //월
        url += `${param.date[0]}/${param.date[1]}`;
        const result = await axios.get(url);
        const count = result?.data.count ? result?.data.count : 0;
        set({ answeredCount: count });
      } else if (param.type === "day") {
        //일
        url += `${param.date}`;
        const result = await axios.get(url);
        const count = result?.data ? result?.data : 0;
        set({ answeredCount: count });
      }
    }
    
  },

  /**
   * @desc 해당 date의 답변 개수 초기화
   */
  initAnsweredCount: (): void => {
    set({ answeredCount: 0 });
  },

  /**
   * @desc 당월 view update
   */
  updateIsThisMonth: (newState: boolean): void => {
    set({ isThisMonth: newState });
  },

  /**
   * @desc 현재 선택된 월 set 함수
   */
  setSelectedMonth: (newState: number): void => {
    set({ selectedMonth: newState.toString() });
  },

  /**
   * @desc selectedDate 상태값 세팅
   */
  setSelectDate: (date: string): void => {
    set({ selectedDate: date });
  },

  /**
   * @desc 답변상세 내용 저장 혹은 삭제
   */
  updateAnsweredView: (newState: any): void => {
    newState === null
      ? set({
          answeredView: { date: "", question: "", category: "", answer: "" },
        })
      : set({ answeredView: newState });
  },

  /**
   * @desc 이번 질문은 넘어갈래요
   */
  passAnswer: async (param: any): Promise<void> => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/answers/passAnswer`,
        param,
        { withCredentials: false }
      );
    } catch (error) {
      console.log(error)
    }
  },
}));

type GET_LIST = {
  email: string;
  month?: string | number;
  date?: Date;
};
export default useAnsweredList;
