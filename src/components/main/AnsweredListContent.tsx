import { useMemo } from "react";
import useAnsweredList from "store/modules/Answers";
import "assets/components/answered-list/answered-list.css";
import AnsweredCategoryUI from "./AnsweredCategoryUI";
import { useNavigate } from "react-router-dom";
import DateFormatUI from "./DateFormatUI";

/**
 * @설명 답변목록 출력
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 사용자가 답변한 내용 출력 리스트 5개 단위
 */
const AnsweredListContent = () => {
  const { answeredList, answeredCount, updateAnsweredView } = useAnsweredList();
  const navigate = useNavigate();

  const computedAnsweredCount = useMemo(
    () => answeredCount.toString(),
    [answeredCount]
  );

  //상세페이지로 이동
  const viewAnswer = (item: any): void => {
    updateAnsweredView(item);
    navigate("/answered-view", { state: { qno: item.qno } });
  };

  return (
    <>
      <div className="answered-list-wrap">
        {/* 목록 개수 출력 */}
        <div className="answered-list-item-count-wrap body2-bold">
          총{" "}
          <span className="answered-list-count-text">
            {computedAnsweredCount}개
          </span>
          의 답변이 있습니다.
        </div>

        {/* 목록 내용 출력 */}
        <div>
          {answeredList.content.length > 0 && //목록이 있을 경우에만 노출
            answeredList.content.map((item: any) => (
              <div
                key={item.index}
                className="answered-list-item"
                onClick={() => viewAnswer(item)}
              >
                <div className="answered-list-item-header-wrap caption1-regular">
                  <DateFormatUI date={item.date} />
                  <AnsweredCategoryUI category={item.category} />
                </div>
                <div className="answered-list-item-q answered-list-item-q-1 body2-bold">
                  {item.question}
                </div>
                <div className="body3-regular answered-list-item-a ">
                  {item.answer}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AnsweredListContent;
