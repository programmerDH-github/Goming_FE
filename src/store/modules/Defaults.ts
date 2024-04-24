import {create, StateCreator} from 'zustand'
import { persist, PersistOptions } from "zustand/middleware";

/**
 * @desc 공통으로 사용하는 헤더 푸터에 기본 세팅을 처리한다.
 * @작성자 김상훈
 * @작성일자 2023.04.25.
 * 
 * @desc Header
 * @desc Footer
 * @desc Navigation
 * 
 * @param {string} headerText : 헤더텍스트. LeftArrow가 자동으로 출력.
 * @param footer 
 * @param navigation 
 * 
 */
const useDefaultSets = create<DEFAULT_SETS>((persist as pillListPersist) 
((set) => ({
    headerText: '',
    headerIsBgColor: false,
    isNavigation: true,

    /********************************
     * @desc 헤더의 텍스트를 설정한다.
     * @param newHeaderText 
     *********************************/
    setHeaderText: (newHeaderText?: string) => {
      newHeaderText === undefined ||  newHeaderText === '' || newHeaderText === null
        ? set({headerText: ''})
        : set({headerText: newHeaderText})
    },

    setHeaderBgColor: (headerIsBgColor: boolean): void => {
      headerIsBgColor ? set({headerIsBgColor: true}) : set({headerIsBgColor: false})
    },

    setIsNavigation: (newState: boolean):void => {
      set({isNavigation: newState})
    }

  }),
  {name: "default-settings"}
));

type DEFAULT_SETS = {
  // Header 영역 정의
  headerText?: string
  isNavigation: boolean
  setHeaderText: Function
  headerIsBgColor: boolean   //카테고리목록에서만 사용하는 bgcolor 사용
  setHeaderBgColor: Function
  setIsNavigation: Function //네비게이션바 존재유무 세팅
}

type pillListPersist = (
  config: StateCreator<DEFAULT_SETS>,
  options: PersistOptions<DEFAULT_SETS>
) => StateCreator<DEFAULT_SETS>;
export default useDefaultSets;
