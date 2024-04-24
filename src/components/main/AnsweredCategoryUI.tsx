
/**
 * @설명 카테고리 ui 제어
 * @작성자 김상훈
 * @일자 2023.04.23.
 * @내용 카테고리 내용에 따라 UI 변경 후 출력
 * @param {string} category
 */
const AnsweredCategoryUI = ({category}: any) => {
  let bgColor = ''
  let categoryText = ''

  switch (category) {
    case '탐구':  bgColor = '#C4DCF0'; categoryText = '나의 탐구'; break;
    case '기억':        bgColor = '#DFF0C4'; categoryText = '나의 기억'; break;
    case '취향':         bgColor = '#FAD39C'; categoryText = '나의 취향';  break;
    case '일상':       bgColor = '#DDC4F0'; categoryText = '나의 일상'; break;
    case '꿈':           bgColor = '#FAC8D4'; categoryText = '나의 꿈';   break;
    default:             bgColor = '#E9E7E2'; categoryText = '선택안됨';  break;
  }

  const wrap = {
    padding: '4px 8px',
    background: bgColor,
    borderRadius: '4px'
  } as React.CSSProperties;

  return (
    <>
      <div style={wrap} className="caption1-regular">
        {categoryText}
      </div>
    </>
  )

}

export default AnsweredCategoryUI