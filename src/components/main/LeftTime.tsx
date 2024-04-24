import useAuthStore from "store/modules/Auth"

const LeftTime = () => {
  //사용자 이름 store 에서 가져오기
  const { userInfo } = useAuthStore()

  //금일날짜
  const today = new Date()
  const todayDate = today.getMonth() + '월 ' + today.getDate() + '일 '
  return (
    <>
      <p>{todayDate}</p>
      <h1>
        {userInfo.usrNm ? userInfo.usrNm : "커피중독자"}님(이름),<br />
        오늘의 회고 질문을 선택해보세요!
      </h1>
    </>
  )
}

export default LeftTime