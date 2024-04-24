import { TYPE_USER_INFO } from "types/authTypes";
import { persist, PersistOptions } from "zustand/middleware";
import { create, StateCreator } from "zustand";

interface AUTH_STATE {
  userInfo: TYPE_USER_INFO; //사용자 정보
  isLogin: boolean; //로그인 여부
  isInfoChange: boolean; //개인정보 변경 여부
  updateLoginStatus: (newLoginState: boolean, userInfo: TYPE_USER_INFO) => void; //로그인 상태 변경
  updateInfoChangeStatus: (newInfoChange: boolean) => void; // 회원정보 변경 여부
  withdrawalUser: (email: string) => boolean; //회원탈퇴로직
  logout: () => void; //로그아웃
}

const useAuthStore = create<AUTH_STATE>(
  (persist as pillListPersist)(
    (set) => ({
      userInfo: {
        usrNo: null,
        eml: "",
        usrNm: null,
        snsClsCd: null,
        snsToken: null,
        gndrClsCd: null,
        brdt: "",
        joinDtm: null,
        lastLgnDtm: null,
        updateDtm: null,
        whdwlDtm: null,
      },
      isLogin: false,
      isInfoChange: false,
      updateLoginStatus: (
        newLoginState: boolean,
        userInfo: TYPE_USER_INFO
      ): void => {
        set({ isLogin: newLoginState });
        set({ userInfo: userInfo });
      },
      updateInfoChangeStatus: (newInfoChange: boolean): void => {
        set({ isInfoChange: newInfoChange });
      },

      /**
       * @desc 회원탈퇴
       * @param email
       * @returns {boolean}
       */
      withdrawalUser: (email: string | null): boolean => {
        const param = { eml: email };
        //const result = fetch(`${process.env.REACT_APP_API_URL}/api/widthdrawalUser`, param)   //db
        set({ isLogin: false }); //islogin
        set({ userInfo: initialUserState }); //reset
        return true;
      },

      /**
       * @desc 로그아웃
       * @returns N/A
       */
      logout: (): void => {
        set({ isLogin: false }); //islogin
        set({ userInfo: initialUserState }); //reset
      },
    }),

    /*******************************************
     * api 종료
     ********************************************/
    { name: "authStateStore" }
  )
);

const initialUserState = {
  usrNo: null,
  eml: "",
  usrNm: null,
  snsClsCd: null,
  snsToken: null,
  gndrClsCd: null,
  brdt: "",
  joinDtm: null,
  lastLgnDtm: null,
  updateDtm: null,
  whdwlDtm: null,
};

//persist
type pillListPersist = (
  config: StateCreator<AUTH_STATE>,
  options: PersistOptions<AUTH_STATE>
) => StateCreator<AUTH_STATE>;

export default useAuthStore;
