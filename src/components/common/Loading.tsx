import "assets/components/loading.css";
import { useEffect, useState } from "react";
const Loading: React.FC = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'illust_dinner.png',
    'illust_exercize.png',
    'illust_light.png',
    'illust_plant.png',
    'illust_report.png',
    'illust_shower.png',
  ];
  useEffect(() => {


    // 이미지 변경 함수
    const changeImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // 1초마다 이미지 변경
    const intervalId = setInterval(changeImage, 1000);

    // 컴포넌트가 언마운트될 때 interval 해제
    return () => clearInterval(intervalId);
  }, []);
  const loading = require("../../assets/images/loading/loading.gif");
  console.log(images[currentImageIndex])
  return (
    <>
      <>
        <div className="loading-bg" id="alertModal">
          <div
            className="body2-bold"
            style={{ width: "170px", height: "52px", textAlign: "center" }}
          >
            <img src={`loading/${images[currentImageIndex]}`} alt="로딩" style={{ height: "66px", width: "74px" }}></img>
            <div style={{ marginTop: "16px" }}>로딩중이에요.</div>
            <div>잠시만 기다려주세요!</div>
          </div>
        </div>
      </>
    </>
  );
};

export default Loading;
