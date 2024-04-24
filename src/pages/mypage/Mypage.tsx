import Auth from "store/modules/Auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectBox from "components/common/SelectBox";
import Footer from "components/Footer";
import useDefaultSets from "store/modules/Defaults";
import InputBox from "components/common/InputBox";
import Header from "components/auth/Header";
import Loading from "components/common/Loading";
import useAuthStore from "store/modules/Auth";
import fetch from "utils/fetch";
import AlertTextPopup from "components/AlertTextPopup";
import "assets/pages/auth/mypage.css";


const Mypage: React.FC = () => {
  //헤더설정
  const { setHeaderText, setIsNavigation } = useDefaultSets();

  const { userInfo, isLogin } = useAuthStore();

  const { isInfoChange, updateInfoChangeStatus } = Auth((state) => state); // zustand로 가져온 임시데이터

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRePassword, setNewRePassword] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>();
  const [passwordErrorChk, setPasswordErrorChk] = useState<boolean>(false); //비밀번호 에러 체크(조건 불일치,미입력)
  const [passwordChangeChk, setPasswordChangeChk] = useState<boolean>(true); // 비밀번호 변경 버튼 클릭 여부
  const [passwordReconfirmSuccessChk, setPasswordReconfirmSuccessChk] = // 비밀번호 재입력칸 에러 체크(비밀번호와 같은지 여부)
    useState<boolean | null>(null);

  const [rePasswordChk, setRePasswordChk] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [rePasswordExistChk, setRePasswordExistChk] = useState<boolean>(false);

  const [newPasswordExistChk, setNewPasswordExistChk] =
    useState<boolean>(false);

  const [newRePasswordExistChk, setNewRePasswordExistChk] =
    useState<boolean>(false);
  const [year, setYear] = useState<string>(userInfo.brdt.split("-")[0]);
  const [month, setMonth] = useState<string>(userInfo.brdt.split("-")[1]);
  const [day, setDay] = useState<string>(userInfo.brdt.split("-")[2]);
  const [emailAgree, setEmailAgree] = useState<boolean>(false);

  const [fixSuccess, setFixSuccess] = useState<boolean>(false);
  const handleGenderCheck = (e: any) => {
    setGender(
      e.target.value === "M" ? true : e.target.value === "F" ? false : null
    );
  };
  const handlePasswordBlur = (e: any) => {
    const Regexp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    // if (password == 1) {
    // } else
    if (!Regexp.test(newPassword) && newPassword.length >= 1) {
      setPasswordErrorChk(true);
    } else {
      setPasswordErrorChk(false);
    }
    setNewPasswordExistChk(false);
  };

  const handleRePasswordUpdate = (e: any) => {
    setRePassword(e.target.value);
  };
  const handleNewPasswordUpdate = (e: any) => {
    setNewPassword(e.target.value);
  };
  const handleNewRePasswordUpdate = (e: any) => {
    setNewRePassword(e.target.value);
  };
  const handlePasswordChagneUpdate = (e: any) => {
    setPasswordChangeChk(!passwordChangeChk);
  };

  const handleYaerUpdate = (e: any) => {
    setYear(e.value);
  };
  const handleMonthUpdate = (e: any) => {
    setMonth(e.value);
  };
  const handleDayUpdate = (e: any) => {
    setDay(e.value);
  };

  const handleEmailAgree = (e: any) => {
    setEmailAgree(!emailAgree);
  };
  const handleRePasswordDiff = (e: any) => {
    if (password === rePassword || rePassword.length === 0) {
      setRePasswordChk(false); // false 면 조건 충족
    } else {
      setRePasswordChk(true); //true면 조건 실패
    }

    setRePasswordExistChk(false);
  };
  const handleNewPasswordDiff = (e: any) => {
    if (newPassword === newRePassword && newRePassword.length > 1) {
      setPasswordReconfirmSuccessChk(false); // false 면 조건 충족
    } else if (newPassword.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); //true면 조건 실패
    }

    setNewRePasswordExistChk(false);
  };

  const handleRePasswordReset = (e: any) => {
    document.getElementById("passwordChange")?.focus();
    setRePassword("");
  };
  const handleNewPasswordReset = (e: any) => {
    document.getElementById("newPassword")?.focus();
    setNewPassword("");
  };
  const handleNewRePasswordReset = (e: any) => {
    document.getElementById("newPasswordConfirm")?.focus();
    setNewRePassword("");
  };
  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      if (
        (passwordChangeChk && !isInfoChange) ||
        rePasswordChk ||
        passwordErrorChk ||
        passwordReconfirmSuccessChk
      ) {
        if (rePassword.length === 0) {
          setRePasswordExistChk(true);
        } else if (newPassword.length === 0) {
          setNewPasswordExistChk(true);
        } else if (newRePassword.length === 0) {
          setNewRePasswordExistChk(true);
        }
      } else {
        await fetch
          .put("/api/users/update/" + email, {
            eml: email,
            password: passwordChangeChk ? password : newPassword,
            gndrClsCd: gender ? "M" : gender === false ? "F" : "N",
            agreement: emailAgree ? "Y" : "N",
          })
          .then((e: any) => {
            if (e.status === 200) {
              // navigate("/login");\
              setFixSuccess(true);
              updateInfoChangeStatus(false);
            }
          })
          .catch((e: any) => {
            console.log(e);
          });
      }
    } catch (e) { }
  };

  useEffect(() => {
    // setTimeout(() => setTest(false), 5000);

    const fetchData = async () => {
      if (!isLogin) {
        navigate("/");
      } else {
        try {
          setLoading(true);
          await fetch.get(`/api/users/select/${userInfo.eml}`).then((res) => {
            try {
              if (res.status === 200) {
                const result = res.data;

                setEmail(result.eml);
                setNickName(result.usrNm);
                setPassword(result.password);
                setGender(
                  result.gndrClsCd === "M"
                    ? true
                    : result.gndrClsCd === "F"
                      ? false
                      : null
                );
                setEmailAgree(result.agreement === "Y" ? true : false);
              } else {
                alert("로그인 정보 불러오기 실패");
              }

              setLoading(false);
            } catch (e) {
              alert("로그인 정보 불러오기 실패");
              setLoading(false);
            }
          });

          setHeaderText("개인 정보 수정");
          setIsNavigation(false);

          return () => { setIsNavigation(true); }
        } catch (e) {
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      const previousPath = location.state?.from || '';
      console.log(navigate)
      console.log(previousPath, " preve ")
      if (previousPath !== '/password-check') {
        updateInfoChangeStatus(false);
      }
    }
  }, []);
  return (
    <>
      {loading === true ? <Loading /> : ""}
      <div>
        <Header />
        <div className="register-main">
          <form onSubmit={handleSubmit}>
            <InputBox
              title={"닉네임"}
              buttonTitle="중복 확인"
              inputPlaceholader={"8글자 이내로 만들어주세요."}
              inputMaxLength={8}
              id={"nickName"}
              inputClassName={"register-flex-row-gap8"}
              inputValue={nickName}
              isButton={false}
              isDisable={true}
            />

            <InputBox
              title={"이메일"}
              inputPlaceholader={"이메일을 입력해주세요."}
              id={"nickName"}
              inputClassName={"register-flex-row-gap8 margintop-32"}
              inputValue={email}
              isButton={false}
              isDisable={true}
            />

            {!isInfoChange ? (
              <InputBox
                title={"비밀번호"}
                id={"password"}
                inputType={"password"}
                inputClassName={"register-flex-row-gap8 margintop-32"}
                buttonClick={handlePasswordChagneUpdate}
                inputValue={password}
                isButton={false}
                // inputBlur={}
                isDisable={true}
                buttonTitle={passwordChangeChk ? "변경" : "취소"}
              />
            ) : (
              <>
                <InputBox
                  title={"기존 비밀번호"}
                  inputPlaceholader={"기존 비밀번호를 입력해주세요."}
                  id={"passwordChange"}
                  inputType={"password"}
                  inputClassName={"register-flex-row-gap8 margintop-32"}
                  buttonClick={handlePasswordChagneUpdate}
                  inputChange={handleRePasswordUpdate}
                  inputValue={
                    passwordChangeChk === true ? password : rePassword
                  }
                  isButton={true}
                  inputBlur={handleRePasswordDiff}
                  isDisable={passwordChangeChk}
                  buttonTitle={passwordChangeChk === true ? "변경" : "취소"}
                  isClose={
                    (passwordChangeChk && rePasswordChk) || rePasswordExistChk
                  }
                  closeClick={handleRePasswordReset}
                  errObject={
                    rePasswordChk === true ? (
                      <div className="register-input-error-msg caption2-bold">
                        기존 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                      </div>
                    ) : rePasswordExistChk === true ? (
                      <div className="register-input-error-msg caption2-bold">
                        비밀번호를 입력해주세요.
                      </div>
                    ) : (
                      <></>
                    )
                  }
                />
                <InputBox
                  title={"새 비밀번호"}
                  inputPlaceholader={
                    "8~20자의 영문, 숫자, 특수문자로 구성해주세요."
                  }
                  id={"newPassword"}
                  inputType={"password"}
                  inputClassName={"register-flex-row-gap0 margintop-32"}
                  inputChange={handleNewPasswordUpdate}
                  inputValue={newPassword}
                  isButton={false}
                  inputBlur={handlePasswordBlur}
                  isDisable={isInfoChange && passwordChangeChk}
                  isClose={passwordErrorChk || newPasswordExistChk}
                  closeClick={handleNewPasswordReset}
                  errObject={
                    passwordErrorChk === true ? (
                      <div className="register-input-error-msg caption2-bold">
                        비밀번호는 8~20자의 영문, 숫자, 특수문자로 구성해주세요.
                      </div>
                    ) : newPasswordExistChk === true ? (
                      <div className="register-input-error-msg caption2-bold">
                        비밀번호를 입력해주세요.
                      </div>
                    ) : (
                      <></>
                    )
                  }
                />
                <InputBox
                  title={"새 비밀번호 확인"}
                  inputPlaceholader={"새 비밀번호를 다시 입력해주세요."}
                  id={"newPasswordConfirm"}
                  inputType={"password"}
                  inputClassName={"register-flex-row-gap0 margintop-32"}
                  buttonClick={handlePasswordChagneUpdate}
                  inputChange={handleNewRePasswordUpdate}
                  inputValue={newRePassword}
                  isButton={false}
                  inputBlur={handleNewPasswordDiff}
                  isDisable={isInfoChange && passwordChangeChk}
                  buttonTitle={!passwordChangeChk ? "변경" : "취소"}
                  closeClick={handleNewRePasswordReset}
                  isClose={
                    passwordReconfirmSuccessChk === null
                      ? false
                      : passwordReconfirmSuccessChk === false
                        ? null
                        : true || newRePasswordExistChk
                  }
                  errObject={
                    passwordReconfirmSuccessChk === true ? (
                      <div className="register-input-error-msg caption2-bold">
                        비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                      </div>
                    ) : passwordReconfirmSuccessChk === false ? (
                      <>
                        <div className="register-input-success-msg caption2-bold ">
                          비밀번호가 일치합니다.
                        </div>
                      </>
                    ) : newRePasswordExistChk === true ? (
                      <div className="register-input-error-msg caption2-bold">
                        비밀번호를 입력해주세요.
                      </div>
                    ) : (
                      <></>
                    )
                  }
                />
              </>
            )}

            <div className="register-flex-column-gap8 margintop-32">
              <div>성별</div>
              <div>
                <input
                  className="register-gender-box"
                  value="F"
                  id="male"
                  type="radio"
                  checked={gender === false}
                  onChange={handleGenderCheck}
                  disabled={!isInfoChange}
                />
                <label
                  htmlFor="male"
                  className="register-gender-label body3-regular wgray12"
                  style={{
                    color: !isInfoChange === true ? "#7A7670" : "#3D3938",

                  }}
                >
                  여성
                </label>
                <input
                  className="register-gender-box marginleft-35"
                  value="M"
                  id="feMale"
                  type="radio"
                  checked={gender === true}
                  onChange={handleGenderCheck}
                  disabled={!isInfoChange}
                />
                <label
                  className="register-gender-label body3-regular wgray12"
                  htmlFor="feMale"
                  style={{
                    color: !isInfoChange === true ? "#7A7670" : "#3D3938",
                  }}
                >
                  남성
                </label>
                <input
                  className="register-gender-box marginleft-35"
                  value="N"
                  id="not"
                  type="radio"
                  checked={gender === null}
                  onChange={handleGenderCheck}
                  disabled={!isInfoChange}
                />
                <label
                  className="register-gender-label  body3-regular wgray12"
                  htmlFor="feMale"
                  style={{
                    color: !isInfoChange === true ? "#7A7670" : "#3D3938",
                  }}
                >
                  선택 안 함
                </label>
              </div>
            </div>
            <div className="register-flex-column-gap8 margintop-35">
              <div>생년월일</div>
              <div className="register-flex-row-gap8">
                <SelectBox
                  handleYaerUpdate={handleYaerUpdate}
                  handleMonthUpdate={handleMonthUpdate}
                  handleDayUpdate={handleDayUpdate}
                  disabled={true}
                  userYear={year}
                  userMonth={month}
                  userDay={day}
                />
              </div>
            </div>
            <div className="register-flex-row-gap0 margintop-32" style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                className="check-btn"
                name="rememberme"
                id="emailAgree"
                checked={emailAgree}
                onChange={handleEmailAgree}
                disabled={!isInfoChange}
                style={{ width: "24px", height: "24px" }}
              />
              <label
                htmlFor="emailAgree"
                className="body3-regular marginleft-7 wgary12"
              >
                이메일 수신 동의(선택)
              </label>
            </div>
            <div className="caption1-regular margintop-8 wgary09">
              *이메일 수신을 동의하시면, 매월 말 월간 회고를 위한 월간고밍을
              보내드립니다.
            </div>
            {/* <button type="button">저장</button> */}
            <div
              className="body3-regular withdrawal-box"
              style={{ marginTop: "32px" }}
              onClick={() => {
                navigate("/withdrawal");
              }}
            >
              회원탈퇴
            </div>
            {isInfoChange === false ? (
              <button
                className="body3-bold register-button margintop-48"
                style={{ width: "100%" }}
                onClick={() => {
                  navigate("/password-check", { replace: true });


                }}
              >
                개인 정보 수정
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="body3-bold register-button margintop-48"
                  style={{ width: "100%" }}
                >
                  수정하기
                </button>

                {/* {1 === 1 ? (
                  <AlertTextPopup
                    // strongText="개인정보가 모두 수정되었습니다." //강조문구
                    text="개인정보가 모두 수정되었습니다." //일반문구1
                    confirmText="확인" //confirm 문구
                    callbackFunction={() => {}} //메인페이지로 이동
                  />
                ) : (
                  <></>
                )} */}
              </>
            )}
          </form>
        </div>
      </div>

      {!fixSuccess ? (
        <></>
      ) : (
        <AlertTextPopup
          text="개인정보가 모두 수정되었습니다."
          callbackFunction={() => setFixSuccess(false)}
        />
      )}
      <Footer></Footer>
    </>
  );
};

export default Mypage;
