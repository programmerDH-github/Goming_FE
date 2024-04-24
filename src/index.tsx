import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Mypage from "pages/mypage/Mypage";
import PasswordCheck from "pages/mypage/PasswordCheck";
import LostInfo from "pages/auth/LostInfo";
import GlobalStyle from "assets/GlobalStyles";
import MyPageCategoryList from "pages/mypage/MyPageCategoryList";
import WithdrawalMain from "pages/mypage/WithdrawalMain";
import MainContent from "pages/main/MainContent";
import OnePagerMain from "pages/onpager/OnePagerMain";
import Answer from "pages/main/Answer";
import AnsweredList from "pages/main/AnsweredList";
import AnsweredView from "pages/main/AnsweredView";
import Intro from "pages/etc/Intro";
import NotFound from "pages/main/NotFound";
import "assets/components/global.css";
import Loading from "components/common/Loading";
import AddNewQuiestion from "pages/etc/AddNewQuiestion";
import ShowNewQuestions from "pages/etc/ShowNewQuestions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage-category" element={<MyPageCategoryList />} />
        <Route path="/lost-info" element={<LostInfo />} />
        <Route path="/password-check" element={<PasswordCheck />} />
        <Route path="/withdrawal" element={<WithdrawalMain />} />
        <Route path="/main" element={<MainContent />} />
        <Route path="/onepager" element={<OnePagerMain />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/answered-list" element={<AnsweredList />} />
        <Route path="/answered-view" element={<AnsweredView />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/new-question" element={<AddNewQuiestion />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/new-question-list" element={<ShowNewQuestions />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
