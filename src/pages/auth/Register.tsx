import Header from "components/auth/Header";
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "assets/pages/auth/register.css";
import fetch from "utils/fetch";
import AlertTextPopup from "components/AlertTextPopup";
import SelectBox from "components/common/SelectBox";
import InputBox from "components/common/InputBox";
import useDefaultSets from "store/modules/Defaults";
import Loading from "components/common/Loading";
type REGIS_INFO = {
  eml: string;
  usrNm: string;
  password: string;
  gndrClsCd: string;
  brdt: string;
};
const Register: React.FC = () => {
  //헤더설정
  const { setHeaderText, setIsNavigation } = useDefaultSets();

  const [loading, setLoading] = useState<boolean>(false);
  const [registerInfo, setRegisterInfo] = useState<REGIS_INFO>({
    eml: "",
    usrNm: "",
    password: "",
    gndrClsCd: "",
    brdt: "",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordReconfirm, setPasswordReconfirm] = useState<string>("");
  const [birthDt, setBirthDt] = useState<string>("");
  const [gender, setGender] = useState<boolean | null>(null);

  const [emailDisable, setEmailDisable] = useState<boolean>(false);
  const [emailChk, setEmailChk] = useState<boolean>(false);
  const [emailFormChk, setEmailFormChk] = useState<boolean>(true); //* 이메일 형식체크만 개발완료
  const [emailExistChk, setEmailExistChk] = useState<boolean>(false); //* 이메일 중복체크 미개발
  const [emailCodeAlertChk, setEmailCodeAlertChk] = useState<boolean>(false); //* 이메일 코드 인증하기 알림창
  const [emailCodeChk, setEmailCodeChk] = useState<boolean>(false);
  const [emailCodeConfirmChk, setEmailCodeConfirmChk] =
    useState<boolean>(false); //* 이메일 코드 비교 알림창

  const [passwordErrorChk, setPasswordErrorChk] = useState<boolean>(false); //비밀번호 에러 체크(조건 불일치,미입력)
  const [passwordReconfirmSuccessChk, setPasswordReconfirmSuccessChk] = // 비밀번호 재입력칸 에러 체크(비밀번호와 같은지 여부)
    useState<boolean | null>(null);

  const [nickNameChk, setNickNameChk] = useState<boolean>(true); // 닉네임 여부 체크
  const [nickNameExistChk, setNickNameExistChk] = useState<boolean>(false); //* 닉네임 중복체크 미개발
  const [isNickNameCheck, setIsNickNameCheck] = useState<boolean>(false);
  const [nickNameAlertExistChk, setNickNameAlertExistChk] =
    useState<boolean>(false);

  const [nickNameAlertLengthChk, setNickNameAlertLengthChk] =
    useState<boolean>(false);

  const [authNumber, setAuthNumber] = useState<string>(""); // 인증코드 미완료
  const [authNumberChk, setAuthNumberChk] = useState<boolean>(true); // * 이메일 인증코드 입력 체크

  const [year, setYear] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [day, setDay] = useState<string>();
  const [emailAgree, setEmailAgree] = useState<boolean>(false);

  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkAgeAgree, setCheckAgeAgree] = useState<boolean>(false);
  const [checkInfoAgree, setCheckInfoAgree] = useState<boolean>(false);
  const [checkServiceAgree, setCheckServiceAgree] = useState<boolean>(false);
  const [needCheck, setNeedCheck] = useState<boolean>(false);
  const [joinSucess, setJoinSucess] = useState<boolean>(false);
  const [isValidEmailCode, setIsValidEmailCode] = useState<boolean>(false);
  const [isValidEmailCodeChk, setIsValidEmailCodeChk] =
    useState<boolean>(false);

  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailFormChk(emailRegex.test(email));

    if (emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  const handleEmailUpdate = (e: any) => {
    setEmailChk(false);
    setEmail(e.target.value);
    setEmailDisable(false);
    setIsValidEmailCode(false);
  };

  const handlePasswordBlur = (e: any) => {
    const Regexp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

    if (!Regexp.test(password) && password.length > 0) {
      setPasswordErrorChk(true);
    } else {
      setPasswordErrorChk(false);
    }

    if (password === passwordReconfirm && passwordReconfirm.length > 0) {
      setPasswordReconfirmSuccessChk(false); //성공
    } else if (passwordReconfirm.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); // 실패
    }
  };
  const handlePasswordReconfirmBlur = (e: any) => {
    if (password === passwordReconfirm && passwordReconfirm.length > 0) {
      setPasswordReconfirmSuccessChk(false); //성공
    } else if (password.length === 0) {
      setPasswordReconfirmSuccessChk(null); //기본값
    } else {
      setPasswordReconfirmSuccessChk(true); // 실패
    }
  };
  const handleNickNameCheck = () => {
    if (nickName.length > 0 && nickName.length < 9) {
      setNickNameChk(true);
      return false;
    } else {
      setNickNameChk(false);
      return true;
    }
  };

  const handlePasswordUpdate = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordReconfirmUpdate = (e: any) => {
    setPasswordReconfirm(e.target.value);
  };

  const handlenickNameUpdate = (e: any) => {
    setNickName(e.target.value);
    setIsNickNameCheck(false);
    setNickNameChk(true);
  };

  const handleBirthDateUpdate = (e: any) => {
    setBirthDt(e.target.value);
  };
  // const handleBirthDateBlur = (e: any) => {
  //   const inputDate = new Date(e.target.value);
  //   const minDate = new Date("1900-01-01");
  //   const maxDate = new Date(today);
  //   if (inputDate < minDate) {
  //     setBirthDt("1900-01-01");
  //     alert("입력할 수 없습니다.");
  //   } else if (inputDate > maxDate) {
  //     setBirthDt(today);
  //     alert("입력할 수 없습니다.");
  //   }
  // };
  const handleNickNameExistCheck = async (): Promise<void> => {
    if (nickName.length > 0) {
      // * 중복 체크 API
      const result = await fetch.post(
        `/api/user/check-usrnm?nickName=${nickName}`,
        {},
        {
          withCredentials: false,
        }
      );
      console.log(result.data);
      if (result.data === "") {

        setNickNameExistChk(false);
      } else {
        setRegisterInfo((prev) => {
          return { ...prev, usrNm: nickName };
        });
        setNickNameExistChk(true);
      }
      setNickNameAlertExistChk(true);
      setIsNickNameCheck(true);
    } else {
      setNickNameAlertLengthChk(true);
    }
  };
  const handleEmailExistCheck = async (): Promise<void> => {
    if (email.length === 0) {
      setEmailChk(true);
    } else if (isValidEmail()) {
      // 이메일 유효성 검사
      document.getElementById("email")?.focus();
    } else {
      // * 이메일 중복 체크 API
      try {
        setEmailDisable(true);
        setEmailCodeAlertChk(true);
        await fetch.post(`/api/user/check-email?email=${email}`, {
          withCredentials: false,
        });

        const result = await fetch.post(
          `/api/email/emailConfirm`,
          {
            email: email,
          },
          {
            withCredentials: true,
          }
        );

        // console.log(result.headers.get("set-cookie"));
        // setLoading(false);
        if (result.status === 200) {
        }
        // setEmailDisable(false);
      } catch (e: any) {
        if (e.response.status === 409) {
          setEmailExistChk(true);
        }
      }
      // *

      // *
    }
  };

  const handleEamilCodeCheck = async (): Promise<void> => {
    // * 중복 체크 API
    const result = await fetch.post(
      `/api/verifyCode/verify?code=${authNumber}`,
      {},
      {
        headers: {
          Cookie: "yourCookieName=yourCookieValue; SameSite=None", // SameSite 속성 설정
        },
        withCredentials: true,
      }
    );

    if (result.data === "인증번호가 일치합니다.") {
      // setEmailDisable(true);
      setEmailCodeChk(true);
      setEmailCodeConfirmChk(true);
      setIsValidEmailCode(true);
      setRegisterInfo((prev) => {
        return { ...prev, eml: email };
      });
    } else {
    }
  };
  const handleGenderCheck = (e: any) => {
    setGender(
      e.target.value === "M" ? true : e.target.value === "F" ? false : null
    );
  };
  const handleRegister = async (e: any): Promise<void> => {
    try {
      e.preventDefault();
      console.log(isValidEmailCode);
      if (handleNickNameCheck() && isNickNameCheck) {
        // 닉네임 존재여부 체크
        document.getElementById("nickName")?.focus();
      } else if (email.length === 0) {
        setEmailChk(true);
      } else if (isValidEmail()) {
        // 이메일 유효성 검사
        document.getElementById("email")?.focus();
      } else if (authNumber.length === 0) {
        setAuthNumberChk(false);
        document.getElementById("authNumber")?.focus();
      } else if (passwordErrorChk) {
        document.getElementById("password")?.focus();
      } else if (passwordReconfirmSuccessChk) {
        document.getElementById("passwordReconfirm")?.focus();
      } else if (emailExistChk && !emailDisable) {
        // 이메일 중복이 안되고 , 인증하기버튼이 disable일때
        // 미완료
        document.getElementById("email")?.focus();
      } else if (!nickNameExistChk) {
        //미완료
        console.log(nickNameExistChk);
        console.log("nickname");

        document.getElementById("nickName")?.focus();
      } else if (!isValidEmailCode) {
        console.log("test");
        setIsValidEmailCodeChk(true);
      } else if (!allCheck) {
        setNeedCheck(true);
      } else {
        setNeedCheck(false);

        await fetch
          .post("/api/user/register", {
            eml: registerInfo.eml,
            password,
            usrNm: registerInfo.usrNm,
            brdt: year + "-" + month + "-" + day,
            gndrClsCd: gender ? "M" : gender === false ? "F" : "N",
          })
          .then((e: any) => {
            if (e.status === 200) {
              setJoinSucess(true);
            }
          })
          .catch((e: any) => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleAuthNumberUpdate = (e: any) => {
    setAuthNumber(e.target.value);
  };
  const handleEmailAgree = (e: any) => {
    setEmailAgree(!emailAgree);
  };
  const handleAllCheck = (e: any) => {
    setAllCheck(!allCheck);
    setCheckAgeAgree(!allCheck);
    setCheckInfoAgree(!allCheck);
    setCheckServiceAgree(!allCheck);
  };
  const handleAgeAgree = (e: any) => {
    setCheckAgeAgree(!checkAgeAgree);
    if (
      !checkAgeAgree === false &&
      checkInfoAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(false);
    } else if (
      !checkAgeAgree === true &&
      checkInfoAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(true);
    }
  };
  const handleInfoAgree = (e: any) => {
    setCheckInfoAgree(!checkInfoAgree);
    if (
      !checkInfoAgree === false &&
      checkAgeAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(false);
    } else if (
      !checkInfoAgree === true &&
      checkAgeAgree === true &&
      checkServiceAgree === true
    ) {
      setAllCheck(true);
    }
  };
  const handleServiceAgree = (e: any) => {
    setCheckServiceAgree(!checkServiceAgree);
    if (
      !checkServiceAgree === false &&
      checkInfoAgree === true &&
      checkAgeAgree === true
    ) {
      setAllCheck(false);
    } else if (
      !checkServiceAgree === true &&
      checkInfoAgree === true &&
      checkAgeAgree === true
    ) {
      setAllCheck(true);
    }
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
  useEffect(() => {
    setHeaderText("회원 가입하기");
    setIsNavigation(false);
    setLoading(true);

    // 4초 후에 loading 값을 false로 변경
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => {
      setIsNavigation(true);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <>
      {loading === true ? <Loading /> : ""}
      <Header></Header>
      <div className="register-main">
        <form onSubmit={handleRegister}>
          <InputBox
            title={"닉네임"}
            buttonTitle="중복 확인"
            inputPlaceholader={"8글자 이내로 만들어주세요."}
            inputMaxLength={8}
            id={"nickName"}
            inputClassName={"register-flex-row-gap8"}
            inputChange={handlenickNameUpdate}
            inputValue={nickName}
            buttonClick={handleNickNameExistCheck}
            isButtonDisable={isNickNameCheck}
            isClose={!nickNameChk ? true : false}
            inputBlur={() => {
              if (registerInfo.usrNm !== nickName) {
                setNickNameExistChk(false);
                setRegisterInfo((prev) => {
                  return { ...prev, usrNm: "" };
                });
              }
            }}
            errObject={
              nickNameChk === false ? (
                <div className="register-input-error-msg caption2-bold">
                  닉네임을 입력해주세요.
                </div>
              ) : (
                <></>
              )
            }
          />
          {/* <div className="register-flex-row-gap8 margintop-32">
            <div className="register-box">
              <div>닉네임</div>
              <input
                type="text"
                placeholder="8글자 이내로 만들어주세요."
                id="nickName"
                className="register-input margintop-8"
                // style={{ background: nickNameChk ? "" : "red" }}
                onChange={handlenickNameUpdate}
                // onBlur={handleNickNameBlur}
                value={nickName}
                maxLength={30}
              />
            </div>
            <button
              type="button"
              className="register-button margintop-28"
              onClick={handleEmailExistCheck}
            >
              중복 확인
            </button>
          </div>
          {nickNameChk === false ? (
            <div className="register-input-error-msg">
              닉네임을 입력해주세요.
            </div>
          ) : (
            <></>
          )} */}
          <InputBox
            title="이메일"
            buttonTitle="인증하기"
            inputPlaceholader={"이메일을 입력해주세요."}
            inputMaxLength={30}
            id={"email"}
            isButtonDisable={emailDisable}
            inputClassName={`register-flex-row-gap8 margintop-32 `}
            inputChange={handleEmailUpdate}
            inputValue={email}
            buttonClick={handleEmailExistCheck}
            isClose={emailChk ? true : false}
            errObject={
              emailChk === true ? (
                <div className="register-input-error-msg caption2-bold">
                  이메일을 입력해주세요.
                </div>
              ) : emailFormChk === false ? ( //이메일 형식이 바르지 않다면
                <div className="register-input-error-msg caption2-bold">
                  이메일을 형식을 확인해주세요.
                </div>
              ) : (
                <></>
              )
            }
          />

          <InputBox
            buttonTitle="확인"
            inputPlaceholader={"인증코드 8자리를 입력해주세요."}
            inputMaxLength={8}
            id={"authNumber"}
            inputClassName={"register-flex-row-gap8"}
            inputChange={handleAuthNumberUpdate}
            inputValue={authNumber}
            buttonClick={handleEamilCodeCheck}
            inputHeight="56px"
            // isDisable={emailCodeChk}
            isButtonDisable={emailCodeChk}
            isClose={!authNumberChk ? true : false}
            inputBlur={() => {
              if (authNumber.length > 0) {
                setAuthNumberChk(true);
              } else {
                setAuthNumberChk(false);
              }
            }}
            errObject={
              authNumberChk === false ? (
                <div className="register-input-error-msg caption2-bold">
                  이메일 인증 코드를 입력해주세요.
                </div>
              ) : (
                <></>
              )
            }
          />
          {/* <div className="register-flex-row-gap8">
            <input
              type="text"
              placeholder="인증코드 6자리를 입력해주세요."
              id="authNumber"
              className="register-box register-input body3-regular margintop-8"
              onChange={handleAuthNumberUpdate}
              // onBlur={handleEmailBlur}
              value={authNumber}
              // style={{ background: emailFormChk ? "" : "red" }}

              maxLength={6}
            />
            <button
              type="button"
              className="register-button body3-bold margintop-8"
              // onClick={handleEmailExistCheck}
            >
              확인
            </button>
          </div> */}
          <div className="register-flex-row-gap4 margintop-8">
            <input
              type="checkbox"
              className="check-btn"
              name="rememberme"
              id="rememberId"
              checked={emailAgree}
              onChange={handleEmailAgree}
            />
            <label className="register-email-agree margintop-6">
              이메일 수신 동의(선택)
            </label>
          </div>
          <div className="register-email-explain wgray09 margintop-8">
            *이메일을 통해 매월 말 월간 회고를 위한 월간고밍을 보내드립니다.
            <br />
            마이페이지에서 이메일 알람 수신 동의 여부를 변경할 수 있습니다.
          </div>
          <div className="register-flex-column-gap4 register-auth-content  margintop-16">
            <div className="body3-Bold">인증코드가 오지 않는다면?</div>
            <div className="caption1-regular wgray12">
              스팸메일함 혹은 프로모션함을 확인해보시고, 다시 한 번 '인증하기'
              버튼을 눌러보세요.
            </div>
          </div>
          <div className="register-flex-column-gap0 margintop-32">
            <InputBox
              title={"비밀번호"}
              inputPlaceholader={
                "8~20자의 영문, 숫자, 특수문자로 구성해주세요."
              }
              id={"newPassword"}
              inputType={"password"}
              inputClassName={"register-flex-row-gap8 margintop-32"}
              inputChange={handlePasswordUpdate}
              inputValue={password}
              isButton={false}
              inputBlur={handlePasswordBlur}
              // isDisable={isInfoChange && !passwordChangeChk}
              // buttonTitle={passwordChangeChk === false ? "변경" : "취소"}
              isClose={passwordErrorChk}
              closeClick={() => {
                setPassword("");
                setTimeout(
                  () => document.getElementById("password")?.focus(),
                  1
                );
              }}
              errObject={
                passwordErrorChk === true ? (
                  <div className="register-input-error-msg caption2-bold">
                    비밀번호는 8~20자의 영문, 숫자, 특수문자로 구성해주세요.
                  </div>
                ) : (
                  <></>
                )
              }
            />

            <InputBox
              inputPlaceholader={"비밀번호를 다시 입력해주세요."}
              id={"newPasswordConfirm"}
              inputType={"password"}
              inputClassName={"register-flex-row-gap0"}
              inputChange={handlePasswordReconfirmUpdate}
              inputValue={passwordReconfirm}
              isButton={false}
              inputBlur={handlePasswordReconfirmBlur}
              inputHeight={"56px"}
              isClose={
                passwordReconfirmSuccessChk === null
                  ? false
                  : passwordReconfirmSuccessChk === false
                    ? null
                    : true
              }
              errObject={
                passwordReconfirmSuccessChk === true ? (
                  <div className="register-input-error-msg caption2-bold ">
                    비밀번호가 일치하지 않습니다. 다시 입력해주세요.
                  </div>
                ) : passwordReconfirmSuccessChk === false ? (
                  <>
                    <div className="register-input-success-msg caption2-bold">
                      비밀번호가 일치합니다.
                    </div>
                  </>
                ) : (
                  <></>
                )
              }
            />
          </div>
          <div className="register-flex-column-gap8 margintop-32">
            <div>
              성별<span className="wgray10">(선택)</span>
            </div>
            <div>
              <input
                className="register-gender-box"
                value="M"
                id="male"
                type="radio"
                checked={gender === true}
                onChange={handleGenderCheck}
              />
              <label
                htmlFor="male"
                className="register-gender-label body3-regular wgray12"
              >
                여성
              </label>
              <input
                className="register-gender-box marginleft-35"
                value="F"
                id="feMale"
                type="radio"
                checked={gender === false}
                onChange={handleGenderCheck}
              />
              <label
                className="register-gender-label body3-regular wgray12"
                htmlFor="feMale"
              >
                남성
              </label>
            </div>
          </div>
          <div className="register-flex-column-gap8 margintop-32">
            <div>생년월일</div>
            <div className="register-flex-row-gap8">
              <SelectBox
                handleYaerUpdate={handleYaerUpdate}
                handleMonthUpdate={handleMonthUpdate}
                handleDayUpdate={handleDayUpdate}
              />
              {/* <Select
                className="register-selectBox"
                options={calendar.year}
                placeholder="년도"
                onChange={handleYaerUpdate}
                // styles={styles}
              />
              <Select
                className="register-selectBox"
                options={calendar.month}
                onChange={handleMonthUpdate}
                placeholder="월"
              />
              <Select
                className="register-selectBox"
                options={calendar.day}
                onChange={handleDayUpdate}
                placeholder="일"
              /> */}
              {/* <input
                type="year"
                placeholder="생년월일 입력"
                id="birthDt"
                onChange={handleBirthDateUpdate}
                onBlur={handleBirthDateBlur}
                value={birthDt}
                max={today}
                min={"1900-01-01"}
              /> */}
            </div>
          </div>
          <div className="register-flex-column-gap8 margintop-32">
            <div>이용 약관 동의 </div>
            <div className="register-flex-row-gap4">
              <input
                type="checkbox"
                className="check-btn"
                name="allcheck"
                id="allcheck"
                checked={allCheck}
                onChange={handleAllCheck}
              />
              <label
                htmlFor="allcheck"
                className="register-all-agree middleFont  wgray12"
              >
                전체 동의
              </label>
            </div>
            <hr
              className="margintop-8"
              style={{
                width: "100%",
                border: 0,
                height: "1px",
                background: "#E9E7E2",
              }}
            />
            <div className="register-flex-row-gap4 margintop-8">
              <input
                type="checkbox"
                className="check-btn"
                name="ageCheck"
                id="ageCheck"
                checked={checkAgeAgree}
                onChange={handleAgeAgree}
              />
              <label
                htmlFor="ageCheck"
                className="register-all-agree body3-regular wgray12"
              >
                (필수) 만 14세 이상입니다.
              </label>
            </div>
            <div className="register-flex-row-gap4 margintop-8">
              <input
                type="checkbox"
                className="check-btn"
                name="infoCheck"
                id="infoCheck"
                checked={checkInfoAgree}
                onChange={handleInfoAgree}
              />
              <label
                htmlFor="infoCheck"
                className="register-all-agree body3-regular wgray12"
              >
                (필수) 개인정보 수집 및 이용 동의
              </label>
              <div
                className="wgray12"
                style={{ width: "30px", fontWeight: "400" }}
                onClick={() => {
                  window.open(
                    `https://ready3-goming.notion.site/9306a7833dc748c0950a1816cd0bcfd8?pvs=4`,
                    "_blank"
                  );
                }}
              >
                보기
              </div>
            </div>
            <div className="register-flex-row-gap4 margintop-8">
              <input
                type="checkbox"
                className="check-btn"
                name="serviceCheck"
                id="serviceCheck"
                checked={checkServiceAgree}
                onChange={handleServiceAgree}
              />
              <label
                htmlFor="serviceCheck"
                className="register-all-agree body3-regular wgray12"
              >
                (필수) 서비스 이용약관 동의
              </label>
              <div
                className="wgray12"
                style={{ width: "30px", fontWeight: "400" }}
                onClick={() => {
                  window.open(
                    `  https://ready3-goming.notion.site/1d4e5969288f4c529d740fad580dfdc4?pvs=4`,
                    "_blank"
                  );
                }}
              >
                보기
              </div>
            </div>
          </div>

          <div className="margintop-48">
            {needCheck === true ? (
              <div className="register-input-error-msg caption2-bold">
                *필수 항목에 동의하셔야 가입할 수 있습니다.
              </div>
            ) : (
              <></>
            )}
            <button
              type="submit"
              className="register-button btn-p-xl body3-bold "
              style={{ width: "100%", marginBottom: "160px" }}
            >
              회원 가입하기
            </button>
          </div>
        </form>
      </div>
      {nickNameAlertLengthChk === true ? (
        <AlertTextPopup
          text={"닉네임은 한글자 이상 입력해주세요."}
          callbackFunction={() => {
            setNickNameAlertLengthChk(false);
          }}
        />
      ) : (
        <></>
      )}
      {nickNameExistChk === false && nickNameAlertExistChk === true ? (
        <AlertTextPopup
          text={"해당 닉네임은 사용할 수 있습니다."}
          text2={"* 닉네임은 변경할 수 없으니 신중하게 입력해주세요."}
          text2Style={{ color: "red", fontSize: "12px" }}
          callbackFunction={() => {
            setNickNameAlertExistChk(false);
          }}
        />
      ) : nickNameExistChk === true && nickNameAlertExistChk === true ? (
        <AlertTextPopup
          text={`해당 닉네임은 사용할 수 없습니다.
            새로운 닉네임을 입력해주세요.`}
          text2={"* 닉네임은 변경할 수 없으니 신중하게 입력해주세요."}
          text2Style={{ color: "red", fontSize: "12px" }}
          callbackFunction={() => {
            setNickNameAlertExistChk(false);
          }}
        />
      ) : (
        <></>
      )}
      {emailExistChk === true ? (
        <AlertTextPopup
          text={"중복된 이메일입니다."}
          callbackFunction={() => {
            setEmailExistChk(false);
          }}
        />
      ) : (
        <></>
      )}
      {emailCodeAlertChk === true ? (
        <AlertTextPopup
          text={"인증번호가 전송되었습니다."}
          callbackFunction={() => {
            setEmailCodeAlertChk(false);
          }}
        />
      ) : (
        <></>
      )}
      {emailCodeConfirmChk === true ? (
        <AlertTextPopup
          text={"이메일 인증이 완료되었습니다."}
          callbackFunction={() => {
            setEmailCodeConfirmChk(false);
          }}
        />
      ) : (
        <></>
      )}
      {joinSucess === true ? (
        <AlertTextPopup
          text={`회원가입이 완료되었습니다!
          이제 고밍과 함께 회고를 시작해볼까요?`}
          callbackFunction={() => {
            setJoinSucess(false);
            navigate("/login");
          }}
        />
      ) : (
        <></>
      )}
      {isValidEmailCodeChk === true ? (
        <AlertTextPopup
          text={`이메일 인증을 완료해주세요.`}
          callbackFunction={() => {
            setIsValidEmailCodeChk(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};
export default Register;
