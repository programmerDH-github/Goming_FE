import {useState} from 'react'
import useETCQuestionStore, { ETC_QS_TYPE } from "store/modules/ETC_QuestionList"
import 'assets/components/etc/popup.css'

/**
 * @desc 수정할 질문 내용을 입력하는 팝업창
 * @param {Objcet} props
 */
const ETCUpdatePopup = ({updateActive, setUpdateActive}:PROPS ) => {
  const {updateQuestion} = useETCQuestionStore()
  const [q, setQ] = useState(updateActive.qquestion)
  const [w, setW] = useState(updateActive.qwriter)
  const [c, setC] = useState(updateActive.qcategory)

  //CLOSE POPUP
  const close = () => {
    setUpdateActive({qno:0, qquestion:"", qwriter:"", qcategory:"", qcreatedAt:""})
  }

  const handleQ = (e:React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)
  const handleW = (e:React.ChangeEvent<HTMLInputElement>) => setW(e.target.value)
  const handleC = (e:React.ChangeEvent<HTMLSelectElement>) => setC(e.target.value)

  //update question
  const uq = async () => {
    if (q === "" || w === "" || c === "") {
      alert("모든 항목을 입력해주세요.")
    } else {
      if (updateActive.qcategory === c && updateActive.qquestion === q && updateActive.qwriter === w) {
        close()
      } else {
        const param = {
          qno: updateActive.qno,
          qquestion: q,
          qwriter: w,
          qcategory: c,
          qcreatedAt: updateActive.qcreatedAt
        }
        await updateQuestion(param)
        close()
      }
    }
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header">
          <h2>질문 수정</h2>
          <button className="close-btn" onClick={close}>X</button>
        </div>
        <div className="popup-body">
          <div className="popup-body-inner">
            <div className="popup-body-inner-left">
              <div className="popup-body-inner-body">
                <label htmlFor="q">질문</label>
                <input type="text" name="q" id="q" value={q} onChange={handleQ} maxLength={69} />
              </div>
              <div className="popup-body-inner-body">
                <label htmlFor="w">작성자</label>
                <input type="text" name="w" id="w" value={w} onChange={handleW} maxLength={49} />
              </div>
              <div className="popup-body-inner-body">
                <label htmlFor="c">카테고리</label>
                <select name="c" id="c" value={c} onChange={handleC}>
                  <option value="일상">일상</option>
                  <option value="꿈">꿈</option>
                  <option value="취향">취향</option>
                  <option value="탐구">탐구</option>
                  <option value="기억">기억</option>
                </select>
              </div>
            </div>
          </div>
          <div className="popup-footer">
            <button className="popup-footer-btn" onClick={close}>취소</button>
            <button className="popup-footer-btn" onClick={uq}>수정</button>
          </div>
        </div>
      </div>
    </div>

  )
}

type PROPS = {
  updateActive: ETC_QS_TYPE
  setUpdateActive: React.Dispatch<React.SetStateAction<ETC_QS_TYPE>>
}

export default ETCUpdatePopup