import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type REGISTER_INFO = {
  usr_no: number;
  email: string;
  nickName: string;
  password: string;
  gender: boolean;
  birthDt: string;
};

type PillListState = {
  registerInfo: Array<REGISTER_INFO>;
  insertId: (registerInfo: REGISTER_INFO) => void;
  updateId: (nickName: string, password: string, usr_no: number) => void;
};

type pillListPersist = (
  config: StateCreator<PillListState>,
  options: PersistOptions<PillListState>
) => StateCreator<PillListState>;

const testRegisterStore = create<PillListState>(
  (persist as pillListPersist)(
    (set) => ({
      registerInfo: [
        {
          usr_no: 0,
          email: "test@gmail.com",
          nickName: "테스터22",
          password: "12341234",
          gender: true,
          birthDt: "2000-02-02",
        },
      ],
      insertId: (registerInfo: REGISTER_INFO): void =>
        set((state) => ({
          registerInfo: state.registerInfo.concat(registerInfo),
        })),
      updateId: (nickName: string, password: string, usr_no: number): void =>
        set((state) => ({
          registerInfo: state.registerInfo.map((e) => {
            console.log(e);
            if (e.usr_no === usr_no) {
              console.log({ ...e, nickName, password });
              return { ...e, nickName, password };
            } else {
              return e;
            }
          }),
        })),
    }),
    {
      name: "testRegister",
    }
  )
);

export default testRegisterStore;
