import 'assets/components/header.css'
import { Link, useNavigate } from 'react-router-dom';
import MainLogo from 'assets/images/main-goming-logo.png'
import LeftArrow from 'assets/images/left-vector.png'
import useDefaultSets from 'store/modules/Defaults';
/**
 * @설명 Header 컴포넌트
 * @작성자 김상훈
 * @일자 2023.04.04.
 * @내용 Header Component 
 * @param {string} title 표시할 텍스트
 * @param {boolean} isLeftArrow leftArrow 존재여부 (default: true)
 * @desc title 값이 전달되면, title값이 작성된 헤더가 출력됨
 */
const Header = () => {
  const {headerText, headerIsBgColor} = useDefaultSets()   //Default 상태관리에서 사용하는 헤더 텍스트
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className='header' style={{backgroundColor: headerIsBgColor ? '#F2F1ED' : ''}}>
        { 
          headerText ? (
            /* text가 있을경우 */
            <div className='header-istext'>
              <div className='go-back-iconimg' onClick={goBack}>
                <img src={LeftArrow} alt="뒤로가기" width={24} height={24} />
              </div>
              <div className='header-text'>
                <p className="body1-bold">{headerText}</p>
              </div>
            </div>

          ) : (

            //그렇지 않은경우, Goming 이미지 출력
            <div className='header-logo-area'>
              <Link to="/main">
                <img src={MainLogo} alt="Goming logo" width={90} height={24}/>
              </Link>
            </div>

          )
        }
      </div>
    </>
  ) 
}

export default Header