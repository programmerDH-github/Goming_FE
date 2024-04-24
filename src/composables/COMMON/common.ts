/**
 * @desc console.log 출력 공통
 */
export const CL = {
  /**
   * @desc 문구: 시작
   * @param {any} text
   */
  DS: (text:any) => console.log(`%c ---- ${text.toString()}  start----`,'background:grey;color:white;'),
  /**
   * @desc 문구: 종료
   * @param {any} text
   */
  DE: (text:any) => console.log(`%c ---- ${text.toString()}  end----`,'background:grey;color:white;'),
  /**
   * @desc 문구: 빨간색
   * @param {any} text
   */
  RED: (text:any) => console.log(`%c ---- ${text.toString()} ----`,'color:red;')
}

export default CL;