import axios from 'axios';
import React from 'react'

const AddNewQuiestion = () => {
  const [category, setCategory] = React.useState('일상');
  const [question, setQuestion] = React.useState('');
  const [writer, setWriter] = React.useState('SYSTEM');
  const [isClicked, setIsClicked] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const addNewQuestion = async (e:any) => {
    setIsClicked(true)
    e.preventDefault()
    console.log(e)
    if (category === '' || question === '' || writer === '') {
      alert('모든 항목을 입력해주세요.');
      setIsClicked(false)
      return;
    }

    const data = {
      qQuestion: question,
      qCategory: category,
      qWriter: writer
    }
    
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/question/insertQuestion`, data, 
    );
    setQuestion('')
    setWriter('SYSTEM')
    setIsClicked(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
    }, 2300);
  }
  return (
    <div style={{marginTop:'20px', padding:'0 15px'}}>
      <p style={{fontSize: '12px'}}>(동훈이 괴롭히지 말고)</p>
      <h1>질문을 등록해주세요!</h1>
      <br />

      <br />
      <form onSubmit={addNewQuestion}>
        <table>
          <tbody>
            <tr style={{height:'40px',flex:1}}>
              <td style={{padding:'3px 10px',lineHeight:'30px'}}><label htmlFor="c">카테고리</label></td>
              <td>
                <select name="c" id="c" value={category} onChange={({target})=>setCategory(target.value)} style={{width:'100%', height:'20px'}}>
                  <option value="일상">일상</option>
                  <option value="꿈">꿈</option>
                  <option value="취향">취향</option>
                  <option value="탐구">탐구</option>
                  <option value="기억">기억</option>
                </select>
              </td>
            </tr>
            <tr style={{height:'40px',flex:1}}>
              <td style={{padding:'3px 10px',lineHeight:'30px'}}><label htmlFor="question">질문</label></td>
              <td><input type="text" id="question" name="question" value={question} onChange={({target})=>setQuestion(target.value)} maxLength={69} autoFocus /></td>
            </tr>
            <tr style={{height:'40px',flex:1}}>
              <td style={{padding:'3px 10px',lineHeight:'30px'}}><label htmlFor="writer">작성자</label></td>
              <td><input type="text" id="writer" name="writer" value={writer} onChange={({target})=>setWriter(target.value)} maxLength={49} /></td>
            </tr>
          </tbody>
        </table>
        <p style={{width:'100%',textAlign:'right',fontSize:'10px'}}>
          해당 페이지의 링크: <br/> <b>http://goming.site/new-question</b>
        </p>
        
        <div style={{width:'100%', maxWidth:'420px',display:'flex',gap:'12px',height:'40px',marginTop:'25px'}}>
          <button className='btn-p-xl body3-bold' style={{flex:1}} type="submit" disabled={isClicked} >추가하겠다</button>
          <button className='btn-p-xl body3-bold' style={{flex:1}} type='reset'>초기화하겠다</button>
        </div>
      </form>

      <br />
      <br />
      {/* 입력이 완료되었을 때 보여주는 3초 후에 닫히는 토스트 팝업  */}
      {
        isSuccess && (
          <div className="toast-wrap" >
            <div className="toast-content">
              <p className="toast-text" style={{textAlign:'right'}}>질문이 등록되었습니다.</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AddNewQuiestion