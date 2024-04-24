import FileImg from 'assets/images/main/file-icon.png'
import { useNavigate } from 'react-router-dom'

/**
 * @desc 원페이저버튼 이동 버튼
 */
const GoToOnePagerBtn = () => {
  const navigate = useNavigate()

  //원페이저 페이지로 이동
  const goToOnepager = () => {
    navigate('/onepager')
  }

  return (
    <>
      <button type="button" 
      style={{
        background: '#3d3938', color: 'white', width: '100%', borderRadius: '8px', marginBottom: '32px', marginTop: '32px', display: 'flex', gap: '8px',justifyContent:'center', alignItems: 'center'
      }}
      className="btn-p-l" 
      onClick={() => goToOnepager()}
      > 
        <span className='body3-bold' style={{display:'flex', justifyContent:'center'}}>
          <img src={FileImg} alt="" width={20} height={20} />
        </span>
        <span className='body3-bold'>
          월간고밍 다운로드
        </span>
      </button>
    </>
  )
}

export default GoToOnePagerBtn