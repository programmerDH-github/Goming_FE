import React, { useEffect, useState } from "react";
import { TYPE_USER_INFO } from "types/authTypes";
import useAuthStore from "store/modules/Auth";
import { Link, useNavigate } from "react-router-dom";
import "assets/pages/auth/login.css";
import RectangleDived from "assets/images/rectangleDived.png";
import useDefaultSets from "store/modules/Defaults";
import Header from "components/auth/Header";
import axios, { AxiosResponse } from "axios";

/**
 * @설명 로그인 페이지
 * @작성자 김상훈
 * @일자 2023.03.08. 수요일
 * @내용 비밀번호 확인 후 이동
 * @TODO backend-connection
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //이메일 형식 체크
const Regexp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/; //영문, 숫자 포함 8~25자리
const Login: React.FC = () => {
  const { setHeaderText, setIsNavigation } = useDefaultSets();
  const { updateLoginStatus } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<boolean>(false);
  const [rememberEmail, setRememberEmail] = useState<boolean>(false); //id저장여부 확인
  const [emailFormChk, setEmailFormChk] = useState<boolean>(false); //* 이메일 형식체크
  const [invalid, setInvalid] = useState<boolean>(true); //아이디비밀번호 일치x
  const { isLogin } = useAuthStore();

  useEffect(() => {
    isLogin && navigate("/main"); //로그인했을 경우 메인페이지로 이동

    if (localStorage.getItem("bside-remember-login")) {
      //로컬스토리지에서 email 가져오기
      const LSrememberEmail: string = String(
        localStorage.getItem("bside-remember-login")
      );
      if (LSrememberEmail.length > 0) {
        setEmail(LSrememberEmail);
        setEmailFormChk(true);
        handleRememberEmail({ target: { value: true } });
        document.getElementById("password")?.focus();
      }
    }
    setHeaderText("로그인");
    setIsNavigation(false);
  }, []);

  //로그인시도
  const loginAttempt = async (e: any): Promise<void> => {
    e.preventDefault();
    const emailCheckResult = emailRegex.test(email); //이메일 형식 체크
    if (emailCheckResult === false) {
      setEmailFormChk(false); //이메일형식체크
      alert("이메일 형식을 확인해주세요");
      document.getElementById("email")?.focus();
      return;
    } else {
      setEmailFormChk(true); //이메일형식체크
    }

    //비밀번호 유효성 검사
    const passwordCheckResult = Regexp.test(password); //이메일 형식 체크
    if (passwordCheckResult === false) {
      setPasswordVerify(false);
      alert("비밀번호는 영문, 숫자 포함 8~25자리입니다");
      document.getElementById("password")?.focus();
      return;
    } else {
      setPasswordVerify(true);
    }

    if (emailCheckResult && passwordCheckResult) {
      //유효성 검사 통과 시 로그인 로직
      checkRememberEmail(); //이메일 저장 로컬스토리지에 설정
      const param = {
        email: email,
        password: password,
      };
      const result: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        { ...param },
        { withCredentials: false }
      );
      if (result?.data === "아이디 혹은 비밀번호가 일치하지 않습니다.") {
        alert(result.data); // 알림컴포넌트창 출력
        return;
      } else {
        // const userInfoData: TYPE_USER_INFO = result?.data && result?.data;
        const userInfoData: any = result?.data && result?.data;
        if (userInfoData) {
          sessionStorage.setItem('GomingIsLoginS', 'true') //GomingIsLoginS 라는 key 로 세션에 저장
        }

        updateLoginStatus(true, userInfoData); // 1.auth store 에 저장
        navigate("/main"); // 2. main 으로 이동
      }
    } else {
      alert("아이디 혹은 비밀번호를 확인해주세요");
    }
  };

  const checkRememberEmail = () => {
    //이메일 저장 로컬스토리지에 설정
    if (rememberEmail === true) {
      localStorage.setItem("bside-remember-login", email);
    }
  };

  const handleEmailValue = ({ target }: any) => {
    //keyup
    setEmail(target.value);
  };
  const handleEmailBlur = () => {
    //focusout
    setEmailFormChk(emailRegex.test(email)); //이메일형식체크
  };

  const handlePasswordValue = (e: any) => {
    setPassword(e.target.value);
    if (password.length > 4) {
      setPasswordVerify(true);
    }
  };
  const kakaoLogin = () => {
    alert("sns로그인은 현재 미구현 상태입니다.");
  };
  const handleRememberEmail = ({ target }: any) => {
    setRememberEmail(!rememberEmail);
  };
  return (
    <>
      <div>
        <Header />
        <div className="login-wrap">
          <h1 className="startGomingText text-color headline3">
            로그인하고
            <br />
            오늘의 Goming을 시작해보세요!
          </h1>
          <form onSubmit={loginAttempt}>
            <div className="inputArea">
              <label htmlFor="email" className="login-label-text text-color">
                이메일
              </label>
              <input
                type="email"
                className="input-style"
                placeholder="이메일 주소를 입력해주세요"
                id="email"
                maxLength={30}
                value={email}
                onChange={handleEmailValue}
                onKeyUp={handleEmailValue}
              />
              <br />
            </div>
            <div className="checkbox-area">
              <input
                type="checkbox"
                className="check-btn"
                name="rememberme"
                id="rememberId"
                checked={rememberEmail}
                onChange={handleRememberEmail}
              />
              <label htmlFor="rememberId" className="save-id-label">
                이메일 주소 기억하기
              </label>
            </div>
            <div>
              <label htmlFor="password" className="login-label-text">
                비밀번호
              </label>
              <input
                type="password"
                className="input-style"
                placeholder="비밀번호를 입력해주세요"
                id="password"
                autoComplete="true"
                value={password}
                onChange={handlePasswordValue}
                onKeyUp={handlePasswordValue}
                maxLength={30}
              />
            </div>
            <div className="login-btn-area">
              {invalid ? (
                <p className="blank-height-12"></p>
              ) : (
                <p style={{ color: "#EA4343", fontSize: "12px" }}>
                  *이메일 혹은 비밀번호가 일치하지 않습니다.
                </p>
              )}
              <button type="submit" className="btn-p-xl body3-bold">
                로그인
              </button>
              <br />
              {/* <button disabled type="button" className='login-btn' onClick={kakaoLogin}>Kakao Login Btn</button><br /> */}
            </div>
            <div className="link-btn-area">
              <Link
                className="link-btn caption1-regular"
                to="/register"
                type="button"
              >
                회원가입
              </Link>
              <img
                src={RectangleDived}
                alt="|"
                width={1}
                height={12}
                className="dived-link-img"
              />
              <Link className="link-btn caption1-regular" to="/lost-info">
                비밀번호 찾기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
