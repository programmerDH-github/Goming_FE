import axios, { AxiosResponse } from 'axios'
import {create} from 'zustand'

type TYPE_WITHDRAWAL = {
  withdrawalState: Array<any>    //회원탈퇴 사유 및 내용 저장
  setWithdrawalState: Function   //회원탈퇴 내용 저장
  withdrawal: Function           //회원탈퇴 서비스 호출
}
/**
 * 1. 재미가없어요
 * 2. 불편해요
 * 3. 잘 사용하지 않아요
 * 4. 마음에 드는 질문이 없어요
 * 5. 기타
 */

//회원탈퇴 상태 저장소
const useWithdrawalStates = create<TYPE_WITHDRAWAL>((set) => ({
  withdrawalState: [],

  //회원탈퇴 사유 및 내용 저장
  setWithdrawalState: (newWithdrawalState: any): void => {
    useWithdrawalStates.getState().withdrawalState.push(newWithdrawalState)  
  }, 

  //회원탈퇴 서비스 호출
  withdrawal: async (email:string): Promise<boolean> => {
    const withdrawalInfo = useWithdrawalStates.getState().withdrawalState
    const param = { //회원탈퇴 정보
      email,
      withdrawalInfo
    }
    const result: AxiosResponse<any> = await axios.post(`${process.env.REACT_APP_API_URL}/api/withdrawal`, param) 
    return result.data
  }
}));


export default useWithdrawalStates

