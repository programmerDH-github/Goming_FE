import {create, StateCreator} from 'zustand'
import { persist, PersistOptions } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";

const useETCQuestionStore = create<ETC_QS>((set) => ({
  etcQuestionList: Array<ETC_QS_TYPE>() || [], //원본데이터
  sortedQuestionList: Array<ETC_QS_TYPE>() || [], //sort 등이 적용된 데이터

  //데이터 조회 로직
  getETCQuestionList: async (param: SEARCH) => {
    const res: AxiosResponse = await axios.get<Array<ETC_QS_TYPE>>(`${process.env.REACT_APP_API_URL}/api/question/questions?page=${param.page}&size=${param.size}`)
    const setList = res ? res.data ? res.data.content : [] : []
    if (param.page === 1) {
      set({
        etcQuestionList: setList,
        sortedQuestionList: setList
      })
    } else {
      set({
        etcQuestionList: [...useETCQuestionStore.getState().etcQuestionList, ...setList],
        sortedQuestionList: [...useETCQuestionStore.getState().etcQuestionList, ...setList]
      })
    }
  },

  //검색 sort
  getSortedQuestionList: (param: string) => {
    const sortedList = [...useETCQuestionStore.getState().etcQuestionList]
    
    if(param !== "") { //검색어 입력 이벤트
      const newSortedList = sortedList.filter((item) => {
        if (item.qquestion.toLowerCase().includes(param.toLowerCase()) || item.qwriter.toLowerCase().includes(param.toLowerCase())) {
          return item
        }
      })
      set({sortedQuestionList: newSortedList})
    } else {
      set({sortedQuestionList: sortedList})
    }
  },

  //삭제
  deleteQuestion: async (param: number) => {
    //get 방식으로 qno 전달
    await axios.get(`${process.env.REACT_APP_API_URL}/api/question/delete?qno=${param}`)
    //재조회 없이 filtering 처리 (성능상 이점)
    const newQuestionList = useETCQuestionStore.getState().etcQuestionList.filter((item) => item.qno !== param)
    set({etcQuestionList: newQuestionList, sortedQuestionList: newQuestionList})
  },

  //수정
  updateQuestion: async (param: ETC_QS_TYPE) => {
    const p = {
      qNo: param.qno,
      qQuestion: param.qquestion,
      qCategory: param.qcategory,
      qWriter: param.qwriter,
    }

    await axios.post(`${process.env.REACT_APP_API_URL}/api/question/update`, p)
    const newQuestionList = useETCQuestionStore.getState().etcQuestionList.map((item) => {
      if(item.qno === param.qno) {
        return param
      } else {
        return item
      }
    })
    set({etcQuestionList: newQuestionList, sortedQuestionList: newQuestionList})
  }
}));



type ETC_QS = {
  etcQuestionList: Array<ETC_QS_TYPE>;
  sortedQuestionList: Array<ETC_QS_TYPE>;
  getETCQuestionList: (param: SEARCH) => Promise<void>;
  getSortedQuestionList: (param: string) => void;
  deleteQuestion: (param: number) => Promise<void>;
  updateQuestion: (param: ETC_QS_TYPE) => Promise<void>;
}

export type ETC_QS_TYPE = {
  qno: number;
  qquestion: string;
  qcategory: string;
  qwriter: string;
  qcreatedAt: string;
}

export type SEARCH = {
  page: number;
  size: number;
}

export default useETCQuestionStore;


