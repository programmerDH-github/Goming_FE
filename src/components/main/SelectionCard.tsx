import 'assets/pages/main/mainContent.css'
import Cards from './Cards';
import { useState, useEffect } from 'react';
import useCardState from 'store/modules/CardState';
import useAuthStore from 'store/modules/Auth';
import { useNavigate } from 'react-router-dom';

/**
 * @설명 카드 뽑기 컴포넌트 - 목록 조회
 * @작성자 김상훈
 * @일자 2023.04.11.
 */
const SelectionCard = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<boolean>(false)  //카드 선택 확인용
  const [cards, setCards] = useState<Array<any>>([])        //카드 목록
  const { userInfo } = useAuthStore()
  const { oneCard, fourCards, saveSelection, saveOneCard } = useCardState()      //카드 상태 관리 store

  const clickedEventHandler = (card:any) => {
    setSelected(true)
    saveOneCard(card)
    const param = {
      qNo: card.qno.toString(),
      email: userInfo.eml
    }
    saveSelection(param.email, param.qNo) //선택한 카드 저장
  }

  useEffect(() => {
    setCards(fourCards)
    if (oneCard.length > 0) {       //선택한 카드가 있을 경우
      navigate('/answer', {
        state: {qno: oneCard[0].qno}, 
        replace: true
      })
    }
  }, [fourCards, oneCard])
  

  return (
    <>
      <div className='main-card-area'>
        {
        cards.map(item => (
          <Cards key={item.qno} item={item} selected={selected} clickedEventHandler={clickedEventHandler} />
        ))
        }
      </div>

    </>
  )
}

export default SelectionCard