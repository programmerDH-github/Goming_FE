import Footer from "components/Footer";
import NavigationBar from "components/NavigationBar";
import Header from "components/auth/Header";
import { useEffect } from "react";
import useDefaultSets from "store/modules/Defaults";
import "assets/pages/main/notFound.css";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const { setHeaderText, setIsNavigation } = useDefaultSets();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderText("");
    setIsNavigation(false);
  }, []);

  return (
    <>
      <div className="categorylist-wrap">
        <Header></Header>
        <div style={{ padding: "32px 16px 0 16px" }}>
          <div className="notfound-image"></div>

          <div
            className="headline3 notfound-title margintop-32"
            style={{ textAlign: "center" }}
          >
            해당 페이지를 찾을 수 없습니다.
          </div>
          <div
            className="body2-regular notfound-subtitle margintop-12"
            style={{ textAlign: "center" }}
          >
            주소가 잘못 입력되었거나,
            <br />
            원하시는 페이지가 삭제 또는 변경되었을 수 있어요.
            <br /> 메인 페이지로 돌아갈 수 있도록 도와드릴게요!
          </div>

          <button
            type="button"
            className="register-button margintop-48 body3-bold"
            style={{
              width: "100%",
              color: "#FFFFFF",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotFound;
