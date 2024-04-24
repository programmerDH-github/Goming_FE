//개행처리
const LineBreak = ( text: string ) => {
  return <p>
    {text.split("/n").map((txt) => (
        <>
          {txt}
          <br />
        </>
      ))}
  </p>;
};

export default LineBreak;