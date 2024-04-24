import { useNavigate } from 'react-router-dom';
import {create, StateCreator} from 'zustand'
import { persist, PersistOptions } from "zustand/middleware";
const useNavBarStatus = create<PillListState>((persist as pillListPersist)
  (
    (set) => ({
      status: 1,  //상태값은 1,2,3으로 설정
      updateStatus: (newStatus:number) => {
        set({status: newStatus})
      }
    }),

    {name: "bottom-navigator"}
  )
);

type PillListState = {
  status: number;
  updateStatus: (newStatus: number) => void;
};

type pillListPersist = (
  config: StateCreator<PillListState>,
  options: PersistOptions<PillListState>
) => StateCreator<PillListState>;

export default useNavBarStatus
