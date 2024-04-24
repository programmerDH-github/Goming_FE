import {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "assets/font/font.css";
import Intro from "pages/etc/Intro";
import useAuthStore from "store/modules/Auth";


function App() {  
  const navigate = useNavigate();

  //로그인 정보를 세션에서 값을 가져와 판단
  // const { isLogin } = useAuthStore((state) => state);
  const isLogin = sessionStorage.getItem('GomingIsLoginS') === 'true' ? true : false;
  useEffect(() => {
    //islogin을 확인한다.
    //로그인이 되어있으면 메인화면으로 이동
    //로그인이 안되어있으면 로그인화면으로 이동
    if (isLogin) {
      navigate('/main')
    }
  }, []);

  return (
    <Intro />
  )
}

export default App;
