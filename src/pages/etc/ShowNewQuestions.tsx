import 'assets/components/etc/showNewQuestions.css'
import export_svg from 'assets/images/etc/export_svg.svg'
import reload_svg from 'assets/images/etc/reload.svg'
import { useEffect, useMemo, useState, useCallback } from 'react'
import useETCQuestionStore, { ETC_QS_TYPE, SEARCH } from 'store/modules/ETC_QuestionList'
import {exportToExcel} from 'composables/ETC'
import { useInView } from 'react-intersection-observer';
import ETCUpdatePopup from 'components/ETCUpdatePopup'

/**
 * @desc 추가한 질문 목록 조회 [운영자-확인용]
 * @information
 *  1. 권한과 상관없이 조회 가능하도록 설정
 *  2. AddNewQuestion 페이지를 통해서 접근 가능
 *  3. mediaQuery를 사용하여 적용하기 (web, mobile 구분 가능하면)
 * @todo
 *  1. 목록 조회 호출 - 20개씩 처리하는걸로
 *  2. filter
 *  3. sort
 */
const ShowNewQuestions = () => {
  const {getETCQuestionList, sortedQuestionList, getSortedQuestionList, deleteQuestion} = useETCQuestionStore()
  const [search, setSearch] = useState("")  //검색어
  const [isSearched, setIsSearched] = useState(false)  //검색여부
  const [itemCount, setItemCount] = useState(30)  //출력개수
  const [page, setPage] = useState(1)  //페이지네이션
  const [size, setSize] = useState(30)  //페이지네이션
  const [ref, inView] = useInView();  //페이지네이션-imported
  const [updateActive, setUpdateActive] = useState({qno:0, qquestion:'', qcategory:'', qwriter: '', qcreatedAt:''})  //수정모드

  //useMemo를 사용하여 검색어 입력 시 필터링
  const questionList = useMemo(
    () => sortedQuestionList,
    [sortedQuestionList]
    );
  const hasNextPage = useMemo(()=> questionList.length % size === 0, [questionList])  //페이지네이션

  //검색단어 입력 시 목록 필터링
  const filterSortList = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value)
    if (e.target.value !== "") {
      setIsSearched(true)
    } else {
      setIsSearched(false)
    }
    getSortedQuestionList(e.target.value)
  }

  //출력개수 변경 시
  const handleItemCount = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setItemCount(Number(e.target.value))
    setSearch("")
    getETCQuestionList({page:1, size:Number(e.target.value)})
  }

  //reset 버튼 클릭 이벤트
  const resetFilters = () => {
    setSearch("")
    setIsSearched(false)
    setItemCount(30)
    getETCQuestionList({page:1, size:30})
  }

  //목록 삭제
  const deleteItem = async (item:ETC_QS_TYPE) => {
    const result = window.confirm("정말로 삭제하시겠습니까? 삭제된 질문은 복구할 수 없습니다.")
    result && await deleteQuestion(item.qno)
  }

  //목록 수정
  const updateItem = (item:ETC_QS_TYPE) => {
    setUpdateActive(item)
  }

  //엑셀 출력
  const exportExcel = async () => {
    exportToExcel(search, questionList)
  }

  //페이지네이션 기능 + 호출
  const fetch = useCallback(async (param: SEARCH) => {
      try {
        await getETCQuestionList(param)
      } catch (error) {
        console.log(error);
      }
    }, [])
  

  //infinity scroll
  useEffect(() => {
    if (inView && hasNextPage && !isSearched) {
      const param = {page:page+1, size}
      setPage(page+1)
      fetch(param);
    }
  }, [hasNextPage, inView]);

  return (
    <div className='s-n-q-container'>
      {
        updateActive.qno !== 0 && (
        <ETCUpdatePopup 
          // qno={updateActive.qno} qquestion={updateActive.qquestion} qcategory={updateActive.qcategory} qwriter={updateActive.qwriter}
          setUpdateActive={setUpdateActive} 
          updateActive={updateActive}
        />)
      }
      <div className='s-n-q-inner-container'>
        <h1>추가한 질문 목록 조회</h1>
        {/* 검색영억 */}
        <p className='s-n-q-search-info' style={{marginBottom: '10px'}}>검색할 내용 및 필터링을 설정해주세요. 새로고침을 통해 전체 리스트를 새로 받아올 수 있습니다.</p>
        <p className='s-n-q-search-info'>목록 추가 조회 시 검색했던 필터링은 사라집니다.</p>
        <div className='s-n-q-search-area'>
          <input type="text" name="search" value={search} onChange={filterSortList} placeholder='질문 혹은 작성자명을 입력해주세요.' autoFocus={true} /> {/* 검색 */}

          <select name="itemCount" id="itemCount" onChange={handleItemCount} value={itemCount}> {/* 출력개수 */}
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="50">50개씩 보기</option>
            <option value="100">100개씩 보기</option>
          </select>

          <button onClick={resetFilters}> {/* 초기화 */}
            <label style={{display:'none'}}>reload</label>
            <img src={reload_svg} alt="Reload" height={20} />
          </button>
          <button onClick={exportExcel}> {/* 엑셀출력 */}
            <label style={{display:'none'}}>export to excel</label>
            <img src={export_svg} alt="export" />
          </button>
        </div>
        
        
        {/* 목록영역 */}
        <div>
          <div>
            <p className='s-n-q-count'>총 <b>{questionList.length}개</b>의 질문이 조회되었습니다.</p>
          </div>
          <table className='s-n-q-list'>
            <thead className='s-n-q-list-header'>
              <tr>
                <td style={{width:'40px'}}>No</td>
                <td style={{flex:1}}>질문</td>
                <td style={{minWidth:'160px'}}>작성자</td>
                <td style={{minWidth:'60px'}}>카테고리</td>
                <td style={{minWidth:'165px'}}>작성일자</td>
                <td style={{width:'40px'}}>수정</td>
                <td style={{width:'40px'}}>삭제</td>
              </tr>
            </thead>
            <tbody className='s-n-q-list-item-area'>
              {
                questionList.length > 0 ?
                questionList.map((item, index) => {
                  return (
                    <tr className='s-n-q-list-item' key={index}>
                      <td style={{width:'40px'}}>{item.qno}</td>
                      <td style={{flex:1, textAlign:'left', paddingLeft:'10px'}}>{item.qquestion}</td>
                      <td style={{minWidth:'160px'}}>{item.qwriter}</td>
                      <td style={{minWidth:'60px'}}>{item.qcategory}</td>
                      <td style={{minWidth:'165px'}}>{item.qcreatedAt}</td>
                      <td onClick={() => updateItem(item)} className='snq-item-edit-btn' style={{width:'40px'}}>수정</td>
                      <td onClick={() => deleteItem(item)} className='snq-item-edit-btn' style={{width:'40px'}}>삭제</td>
                    </tr>
                  )
                })
                : <tr><td colSpan={7} style={{textAlign:'center'}}>질문이 존재하지 않아여.</td></tr>
              }
            </tbody>
          </table>
          <div ref={ref} style={{height:'10px'}}></div>
        </div>
      E</div>
    </div>
  )
}

export default ShowNewQuestions