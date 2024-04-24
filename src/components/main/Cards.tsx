
import {CSSTransition} from 'react-transition-group';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import GomingTextImg from 'assets/images/main/goming-text.png'
import useCardState from 'store/modules/CardState';

const Cards = ({item, selected, clickedEventHandler}: any) => {
  const navigate = useNavigate()
  const nodeRef = useRef(null)
  const [showFront, setShowFront] = useState(true)
  const {resetFourCards} = useCardState()

  //카드 선택 이벤트
  const clickHandler = async (item: any) => {
    /*********************************************
     * style 설정
     *********************************************/
    const id = item.qno.toString()
    const selectedItem = document.getElementById(id) as HTMLElement
    selectedItem.style.backgroundColor = '#2D4577'

    //카드 선택 시 모든 카드 클릭이벤트 제거
    const cards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLElement>
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.pointerEvents = 'none'
    }

    /*********************************************
     * api 호출
     *********************************************/
    if (selected === false) {
      setShowFront(false)  //카드 뒷면 보이기      
      clickedEventHandler(item)
      moveToAnswerPage(item)
    }
  }

  const moveToAnswerPage = (item:any) => { 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        navigate('/answer', 
          {
            state: {qno: item.qno}, 
            replace: true
          })
        resetFourCards()
        resolve('success')
      }, 1500);
    })
  }

  return (
    <>
      <CSSTransition 
        nodeRef={nodeRef}
        in={showFront}
        timeout={300}
        classNames='scaling'
      >
        <div ref={nodeRef} className='card' onClick={() => clickHandler(item)}>
          {/* 카드 앞면 내용: 컨텐츠 */}
          <div className='card-front'>
            <div className='card-in' id={item.qno}>
              {
                showFront ? (
                  <img src={item.img} alt={item.desc} width={'100%'} className="card-scale"/>
                ) : (
                  <div className='selected-card-area card-fade'>
                    <img src={item.aftrImg} alt={item.desc} width={'100%'} className='card-fade' />
                  </div>
                )
              }
            </div>
            <div className='card-title'>
              <img src={GomingTextImg} alt="" width={48} height={12}/>
            </div>
          </div>
        </div>
      </CSSTransition>
      
    </>
  )
}

export default Cards