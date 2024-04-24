import { useEffect, useState } from "react";
import IntroGomingIMG from 'assets/images/intro-goming.png'
import IntroIMG from 'assets/images/intro-background.png'
import 'assets/pages/etc/intro.css'
import Footer from "components/Footer";
import useDefaultSets from "store/modules/Defaults";
import { useNavigate } from "react-router-dom";
import useAuthStore from "store/modules/Auth";

/**
 * @desc 인트로 페이지
 * @작성일 2023.04.30.
 */
const Intro = () => {
  //서비스 내용 관련
  const [isServicecActive, setIsServiceActive] = useState<boolean>(false)
  const { setIsNavigation } = useDefaultSets((state) => state)
  const { isLogin } = useAuthStore()
  const navigate = useNavigate()
  const SESSION_LOGIN = sessionStorage.getItem('GomingIsLoginS')
  useEffect(() => {
    setIsNavigation(false)
    SESSION_LOGIN && navigate('/main')
    return () => setIsNavigation(true)
  }, [])

  //히스토리를 삭제하지 않고 로그인페이지로 이동
  const goToLogin = () => {
    navigate('/login')
  }

  const goToMain = () => {
    navigate('/main')
  }

  return (
    <>
      <div style={{ backgroundColor: "#F2F1ED", display: 'flex', flexDirection: 'column', marginBottom: '-160px', color: '#121212' }}>
        <div style={{ padding: '0 32px' }}>
          <div style={{ marginTop: '104px', marginBottom: '16px' }}>
            <img src={IntroGomingIMG} alt="" width={127} />
          </div>
          <div>
            <p className='body2-bold' style={{ color: '#7A7670' }}>
              매일 하나씩 써 내려간<br />
              작은 조각들이 모여,<br />
              오늘의 나를 만듭니다.
            </p>
          </div>
        </div>

        {/* 일러영역 */}
        <div style={{ width: '100%', marginBottom: '-5px' }}>
          <img src={IntroIMG} alt="" width={'100%'} />
        </div>

        <div className={"caption1-bold"} style={{ textAlign: "center", padding: '0px 0px 24px 0', marginBottom: "24px", color: "#96938C" }}> 원활한 사용을 위해 크롬 브라우저 사용을 권장합니다.</div>

        {/* 버튼영역 */}
        <div style={{ padding: '0 16px', backgroundColor: '#F2F1ED', flex: 1 }}>
          {isServicecActive && (<HideView />)}

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center', gap: '8px' }}
            className={isServicecActive ? 'info-mb-160' : ''}
          >
            <button type='button' className='btn-p-xl body3-bold' onClick={goToLogin}>로그인하기</button>
            <button type='button' className='btn-s-xl body3-bold' onClick={goToMain}>일단 둘러보기</button>
          </div>

          {/* 서비스소개 */}
          {
            !isServicecActive && (
              <div className="info-mb-160" style={{ width: 'fit-content', margin: '0 auto' }}>
                <div className="intro-service-info" onClick={() => setIsServiceActive(true)}>
                  <p className='body3-regular'>서비스 소개 보기</p>
                  <div style={{ paddingTop: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.64645 2.98043C5.84171 2.78517 6.15829 2.78517 6.35355 2.98043L11.0202 7.6471C11.2155 7.84236 11.2155 8.15894 11.0202 8.3542L6.35355 13.0209C6.15829 13.2161 5.84171 13.2161 5.64645 13.0209C5.45118 12.8256 5.45118 12.509 5.64645 12.3138L9.95956 8.00065L5.64645 3.68754C5.45118 3.49228 5.45118 3.17569 5.64645 2.98043Z" fill="#3D3938" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Footer ></Footer>
    </>
  )
}

// 버튼에 따라 숨겨지는 컴포넌트
const HideView = () => {
  return (
    <>
      <div style={{
        width: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: ' center', alignContent: ' center', textAlign: 'center'
      }}>
        {/* service 1 */}
        <div>
          <hr color='#E4E2DD' style={{ border: 0, height: '1px' }} />
          <p className='intro-text-number'>01</p>
          <p className='body1-regular' style={{ marginBottom: '16px' }}><span className='intro-text-bold'>어떤</span> 서비스인가요?</p>
          <p className='body3-regular' style={{ marginBottom: '40px' }}>
            매일 랜덤으로 주어지는 질문을 통해 내 삶을 다양한<br />
            시각으로 회고해 볼 수 있는 서비스에요.
          </p>
        </div>

        {/* service 2 */}
        <div>
          <hr color='#E4E2DD' style={{ border: 0, height: '1px' }} />
          <p className='intro-text-number'>02</p>
          <p className='body1-regular' style={{ marginBottom: '16px' }}><span className='intro-text-bold'>누구를</span> 위한 서비스인가요?</p>
          <p className='body3-regular' style={{ marginBottom: '40px' }}>
            일주일, 한 달, 일 년을 보내면서, 문득 내가 어떻게<br />
            시간을 보냈는지 허무해지는 순간이 있지 않나요?<br />
            자기 전 5분, 고밍과 함께 오늘 어떤 하루를 보냈는지<br />
            생각해 보는 시간을 가져보세요.
          </p>
        </div>

        {/* service 3 */}
        <div>
          <hr color='#E4E2DD' style={{ border: 0, height: '1px' }} />
          <p className='intro-text-number'>03</p>
          <p className='body1-regular' style={{ marginBottom: '16px' }}><span className='intro-text-bold'>어떻게</span> 사용하나요?</p>
          <p className='body3-regular' style={{ marginBottom: '40px' }}>
            하루 세 번의 기회를 통해<br />
            랜덤 질문을 골라보고 내 생각을 남겨보세요.<br />
            작성한 회고들은 고밍 기록에 소중히 보관되고,<br />
            한 달이 지나면 월간고밍 형태로 확인할 수 있답니다.<br />
            회고록을 보며 지난 한 달 동안의<br />
            나를 돌아보는 시간을 가져보세요.
          </p>
          <hr color='#E4E2DD' style={{ border: 0, height: '1px', marginBottom: '80px' }} />
        </div>

      </div>

    </>
  )
}

export default Intro