import "assets/components/alertTextPopup.css";
/**
 * @설명 알럿창 컴포넌트(공통)
 * @작성자 김상훈
 * @생성일자 2023.04.05.
 * @Todo parameter 공통 처리
 * @param {string} strongText 강조 텍스트 내용
 * @param {string} text 출력할 텍스트 내용
 * @param {string} text2 출력할 텍스트 내용2
 * @param {string} confirmText 버튼 텍스트
 * @param {Function} callbackFunction 호출할 콜백함수
 */
const AlertTextPopup = ({
  strongText,
  text,
  text2,
  text2Style,
  confirmText = "확인",
  callbackFunction,
}: TYPE_ALERT) => {
  return (
    <>
      <div className="alert-bg" id="alertModal">
        <div className="relative">
          <div className="modal">
            {strongText && (
              <h1
                className="headline3 color-gray13"
                style={{
                  textAlign: "center",
                  wordBreak: "keep-all",
                  marginBottom: "12px",
                }}
              >
                {strongText}
              </h1>
            )}
            <div className="modal-text-area">
              <p className="body2-regular" style={{ whiteSpace: "pre-line" }}>
                {text}
              </p>
              {text2 ? (
                <>
                  <p className="body2-regular" style={text2Style}>
                    {text2}
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="modal-btn-area">
              <button
                type="button"
                className="btn-p-xl body3-bold"
                onClick={() => callbackFunction()}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
type TYPE_ALERT = {
  strongText?: string;
  text: string;
  text2?: string;
  text2Style?: object;
  confirmText?: string;
  callbackFunction: Function;
};

export default AlertTextPopup;
