//사용자 정보 타입
export interface TYPE_USER_INFO {
  usrNo: string | null;
  eml: string;
  usrNm: string | null;
  snsClsCd: number | null;
  snsToken: string | null;
  gndrClsCd: string | null;
  brdt: string;
  joinDtm: string | null;
  lastLgnDtm: number | null;
  updateDtm: number | null;
  whdwlDtm: number | null;
}
