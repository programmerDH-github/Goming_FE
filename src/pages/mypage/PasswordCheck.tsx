import { useEffect, useState } from "react";
import useAuthStore from "store/modules/Auth";
import Auth from "store/modules/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "components/auth/Header";
import "assets/pages/auth/passwordCheck.css";
import useDefaultSets from "store/modules/Defaults";
import Footer from "components/Footer";
import fetch from "utils/fetch";
import AlertTextPopup from "components/AlertTextPopup";
/**
 * @설명 마이페이지 - 비밀번호 확인
 * @작성자 김상훈
 * @일자 2023.03.17. 금요일
 * @내용 비밀번호 확인 후 이동
 * @TODO backend-connection
 */
const PasswordCheck: React.FC = () => {
  const { setHeaderText, setIsNavigation } = useDefaultSets();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, userInfo } = useAuthStore((state) => state);
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswrodVerify] = useState<boolean>(true);
  const [passwordChecked, setPasswordChecked] = useState<boolean>(true); //비밀번호 데이터베이스 확인 결과
  const { updateInfoChangeStatus } = Auth((state) => state); // zustand로 가져온 임시데이터

  //미로그인 시 로그인 화면으로 이동
  useEffect(() => {
    if (!isLogin) {
      //navigate('/login') //임시주석
    }
    setHeaderText("개인 정보 수정");
    setIsNavigation(false);
  }, []);

  //유효성 검사 이벤트


  //유효성 검사 -> 계정정보 확인 프로세스
  const verifyCheck = async (): Promise<void> => {

    //계정정보 확인
    const rst = await fetch.post("/api/users/passwordConfirm", {
      eml: userInfo.eml,
      password: password,
    });
    console.log(rst);
    if (rst.data === true) {
      //일치확인
      updateInfoChangeStatus(true);
      navigate("/mypage", { replace: true, state: { from: location.pathname } }); //해당 history를 제거
      setPasswordChecked(false);
    } else {


      setPasswordChecked(false);



    }
  };

  return (
    <>
      <div className="pw-check-whole-wrap">
        <Header></Header>
        <div className="pw-check-wrap">
          <h1 className="pw-check-title body1-bold">비밀번호 재확인</h1>
          <p className="pw-check-text body3-regular">
            개인 정보를 수정하기 전에,
            <br />
            비밀번호를 다시 한 번 확인해주세요.
          </p>

          <div className="pw-check-input-area">
            <label className="pw-check-label " htmlFor="password">
              비밀번호
            </label>
            <div className="pw-check-input-wrap">
              <input
                type="password"
                id="password"
                className="pw-check-input"
                value={password}

                onChange={(e) => setPassword(e.target.value)}
                style={{
                  border: passwordChecked ? "" : "1px solid tomato",
                }}

                maxLength={30}
                placeholder="현재 비밀번호를 입력해주세요."
              />

              {/* <button type="button">
              
            </button> */}
            </div>

            {passwordChecked ? (
              <p className="pw-check-error-before-area">&nbsp;</p>
            ) : (
              <>
                <p className="pw-check-color-error">
                  비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                </p>
                <AlertTextPopup
                  text={"비밀번호가 일치하지 않습니다."}
                  callbackFunction={() => setPasswordChecked(true)}
                />
              </>
            )}
          </div>
          <button
            className="pw-check-btn btn-p-xl body3-bold"
            type="button"
            onClick={verifyCheck}
          >
            확인
          </button>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default PasswordCheck;
