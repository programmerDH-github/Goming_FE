import { useEffect, useState } from "react";
import useDefaultSets from "store/modules/Defaults";
import useAnsweredList from "store/modules/Answers";
import DateFormatUI from "components/main/DateFormatUI";
import DownloadIcon from "components/onepager/DownloadIcon";
import AnsweredCategoryUI from "components/main/AnsweredCategoryUI";
import Header from "components/auth/Header";
import Footer from "components/Footer";
import ConfirmInputPopup from "components/onepager/ConfirmInputPopup";
import ToastPopup from "components/ToastPopup";
import SVG from "components/onepager/svg";
import EmailIcon from "components/onepager/EmailIcon";
import html2canvas from "html2canvas";
import Masonry from "react-masonry-css";
import downloadjs from "downloadjs";
import { AxiosResponse } from "axios";
import fetch from "utils/fetch";
import GomingLogo from "assets/images/main/onepager-goming-logo.png";
import "assets/pages/onepager/onepagermain.css";
import OnepagerExampleView from "components/onepager/OnepagerExampleView";
import useAuthStore from "store/modules/Auth";
import dateFormat from "composables/MAIN/MyCalenderDateFormat";

/**
 * @desc 원페이저 다운로드 로직
 * @desc html -> canvas -> image -> download
 */
const OnePagerMain = () => {
  const [toastText, setToastText] = useState<string>("");
  const { setHeaderText, setIsNavigation } = useDefaultSets();
  const { selectedMonth, answeredList, selectedDate, getAnsweredList } =
    useAnsweredList();
  const [confirmEmailPopup, setConfirmEmailPopup] = useState<boolean>(false); //confirm팝업제어
  const [toastPopup, setToastPopup] = useState<boolean>(false); //toast팝업제어
  const [lastDate, setLastDate] = useState<String>();
  const [firstDate, setFirstDate] = useState<String>();
  const [answeredSplitList, setAnsweredSplitList] = useState<Array<Array<any>>>(
    []
  );
  const { userInfo } = useAuthStore((state) => state);
  useEffect(() => {
    const initData = async (param: any) => {
      await getAnsweredList(param);
    };
    const param = {
      email: userInfo.eml,
      date: dateFormat.getYearAndMonth(selectedDate),
      size: 100,
      page: 0,
    };
    initData(param);

    setHeaderText("월간고밍 다운로드");
    setIsNavigation(false);
    return () => setHeaderText("");
  }, []);
  useEffect(() => {
    if (answeredList.content.length > 0) {
      const [year, month, day] = answeredList.content[0].date.split("-");

      setLastDate(
        year + "-" + month + "-" + new Date(year, month, 0).getDate()
      );
      setFirstDate(
        year +
        "-" +
        month +
        "-" +
        ("00" + new Date(year, month, 1).getDate()).slice(-2)
      );
      let tempArray = [];
      let sliceNumber = 33;
      for (let i = 0; i <= answeredList.totalElements / 33; i++) {
        tempArray.push(
          answeredList.content.slice(
            sliceNumber * i,
            sliceNumber * i + sliceNumber
          )
        );
      }
      setAnsweredSplitList(tempArray);
    }
  }, [answeredList]);
  //원페이저 이미지변환, img url return
  const toOnepagerImage = async (downLoadNumber: number) => {
    const wrapper = document.querySelector(
      ".down" + downLoadNumber
    ) as HTMLElement;

    // alert(wrapper.textContent);
    // wrapper.style.display = ""; //hidden 시 canvas가 안그려지는 현상있음

    const canvas = await html2canvas(wrapper, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
    }); //scale 2 옵션으로 출력   => 1920px
    // alert(canvas.getContext);

    const dataURL = canvas.toDataURL("image/png"); //이미지변환
    // wrapper.style.display = "none"; //canvas hidden 처리

    return dataURL;
  };

  const imageToBlob = async (downLoadNumber: number) => {
    const base64Data = await toOnepagerImage(downLoadNumber);

    // base64 데이터를 ArrayBuffer로 변환합니다.
    const data = window.atob(base64Data.split(",")[1]);

    const arrayBuffer = new ArrayBuffer(data.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < data.length; i++) {
      view[i] = data.charCodeAt(i);
    }

    // ArrayBuffer를 Blob으로 변환합니다.
    const blob = new Blob([arrayBuffer], { type: "image/png" });
    return blob;
  };
  //원페이저 다운로드 클릭 이벤트
  const downloadOnepager = async () => {
    // data URL에서 base64 인코딩된 데이터를 추출합니다.

    setToastText("웹페이저가 다운로드 중입니다");
    setToastPopup(true); //토스트 팝업 출력

    setTimeout(() => {
      setToastPopup(false); //토스트 팝업 종료
    }, 3000);
    for (
      let downLoadNumber = 0;
      downLoadNumber < answeredSplitList.length;
      downLoadNumber++
    ) {
      const base64Data = await toOnepagerImage(downLoadNumber);

      // base64 데이터를 ArrayBuffer로 변환합니다.

      const data = window.atob(base64Data.split(",")[1]);

      const arrayBuffer = new ArrayBuffer(data.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < data.length; i++) {
        view[i] = data.charCodeAt(i);
      }

      // ArrayBuffer를 Blob으로 변환합니다.

      const blob = new Blob([arrayBuffer], { type: "image/png" });

      downloadjs(blob, "goming" + downLoadNumber, "image/png");
    }
  };

  //이메일 보내기 클릭 이벤트
  const sendEmail = async (email: string) => {
    setConfirmEmailPopup(false); //팝업닫기
    // const imageURL = await toOnepagerImage();

    setToastText("이메일로 월간고밍이 전송되었습니다!");
    setToastPopup(true); //토스트 팝업 출력
    setTimeout(() => {
      setToastPopup(false); //토스트 팝업 종료
    }, 3000);
    const formData = new FormData();
    formData.append("email", userInfo.eml);
    formData.append("sendEmail", email);
    formData.append("date", dateFormat.getYearAndMonth(selectedDate));
    if (formData.get("date") === "NaN-NaN") {
      setToastPopup(true); //토스트 팝업 출력
      setToastText("선택된 파일이 없습니다.");
      setTimeout(() => {
        setToastPopup(false); //토스트 팝업 종료
      }, 3000);
    } else {
      for (
        let downLoadNumber = 0;
        downLoadNumber < answeredSplitList.length;
        downLoadNumber++
      ) {
        const blob = await imageToBlob(downLoadNumber);

        formData.append("imageData" + downLoadNumber, blob, "image.png");
      }
      const result: AxiosResponse<any> = await fetch.post(
        "/api/email/sendByMonthBlob",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status === 200) {
        console.log("test");
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <div>
        <Header></Header>
        {/********************************************************************************************
         * 미리보기 영역
         * ***************************************************************************************/}
        <div style={{ margin: "0 16px" }}>
          <div style={{ marginTop: "32px" }}>
            <p className="body1-bold">미리보기</p>
          </div>
          <div className="onepager-wrap">
            <p className="body3-bold">{selectedMonth}월의 고밍</p>
            <OnepagerExampleView />
          </div>
          {/* 버튼영역 */}
          <div className="onepager-btn-wrap">
            <button className="btn-p-l" onClick={downloadOnepager}>
              <DownloadIcon></DownloadIcon>
              &nbsp;
              <span className="body3-bold" style={{ display: "inline-block" }}>
                다운로드
              </span>
            </button>
            <button
              className="btn-p-l"
              onClick={() => setConfirmEmailPopup(true)}
            >
              <EmailIcon></EmailIcon>
              <span className="body3-bold">이메일로 보내기</span>
            </button>
          </div>

          <div className="register-flex-column-gap4 register-auth-content" style={{ marginTop: "20px" }}>
            <div className="body3-bold">월간고밍 다운로드가 잘 안된다면?</div>
            <div className="caption1-regular wgray12" style={{ marginTop: "4px" }}>
              월간고밍 다운로드는 데스크탑 크롬 브라우저 환경에 최적화 되어 있습니다. 정상적으로 다운로드 되지 않을 시, 데스크탑 {">"} 크롬 브라우저로 진행해주시기 바랍니다.
            </div>
          </div>

        </div>

        {/********************************************************************************************
         * 다운로드 영역
         * ***************************************************************************************/}
        {/* Canvas */}

        {answeredSplitList.map((splitList, idx) => (
          <div
            className={"onepager-download down" + idx}
            style={{
              position: "absolute",
              left: "-9999px" /* Move off-screen */,
            }}
          >
            <div className="onepager-download-header">
              <h1>{selectedMonth}월의 고밍</h1>
              <p className="body1-regular">
                {firstDate}~{lastDate}
              </p>
              <p className="headline2">
                {selectedMonth}월의 NICKNAME님은 어떤 하루하루를 보냈는지
                돌아볼까요?
              </p>
            </div>

            <Masonry
              width={1920}
              breakpointCols={4} //컬럼수
              className={"my-masonry-grid-download"}
              columnClassName="my-masonry-grid_column-download"
            >
              {splitList.length > 0 ? (
                splitList.map((item, index) => {
                  return (
                    <div key={item.index}>
                      <div className="answered-list-item-header-wrap caption1-regular">
                        <DateFormatUI date={item.date} />
                        <AnsweredCategoryUI category={item.category} />
                      </div>
                      <div className="onepager-list-item-q color-wgray13 body2-bold">
                        {item.question}
                      </div>
                      <div className="onepager-list-item-a body3-regular">
                        {item.answer}
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </Masonry>

            {/* 일러스트레이터 영역 */}
            <div style={{ height: "1080px" }}>
              <SVG />
            </div>

            {/* 일러스트 하단 로고 */}
            <div className="onepager-download-footer">
              <div style={{ maxWidth: "80px", maxHeight: "80px" }}>
                <img src={GomingLogo} alt="고밍로고" width={80} height={80} />
              </div>
              <p className="headline3">
                매일 하나씩 써 내려간 작은 조각들이 모여,
                <br />
                오늘의 나를 만듭니다.
                <br />
                나를 돌아보는 회고 리추얼, 고밍.
              </p>
            </div>

            {/* copyright */}
            <div className="onepager-download-copyright body2-regular">
              © 2023. Goming. All rights reserved.
            </div>
          </div>
        ))}
      </div>
      <Footer></Footer>

      {/***************************************
       * ****************************************************
       * 팝업 관련 영역
       * ***************************************************************************************/}
      {
        //confirm popup
        confirmEmailPopup && (
          <ConfirmInputPopup
            text="월간고밍을 받을 이메일 주소가 맞나요?/n다른이메일로 받고 싶다면/n주소를 변경해주세요."
            confirmText="이메일 보내기"
            cancelText="취소하기"
            confirmCallbackFunction={(email: any) => {
              sendEmail(email);
            }}
            cancelCallbackFunction={() => setConfirmEmailPopup(false)}
          />
        )
      }

      {
        //toast popup
        toastPopup && (
          <ToastPopup
            text={toastText}
            bgColor={"#4D99DE"}
            textColor={"#FFFFFF"}
          />
        )
      }
    </>
  );
};
export default OnePagerMain;
