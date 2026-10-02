

const App = () => {

  const arr =["HTML","REACT","JAVA SCRIPT","PYTHON","JAVA"]
  return (
    <>
    <div className="bg-black text-white h-100 p-2">
      <h2 className="bg-blue-400 text-center p-2 m-3">Programming Languages</h2>
      {
        arr.map((e,i)=>(
         <p className="bg-pink-800 p-2 m-3 text-center " key={i}>{e}</p>
        ))
      }
    </div>
    
    </>
  )
}

export default App