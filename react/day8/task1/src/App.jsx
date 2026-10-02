import { useState } from "react"


const App = () => {
  

   let [data,setData]=useState(0)

  let handleadd=()=>{
     setData(data+1)
  }
  let handleless=()=>{
    setData(data-1)
  }
  let handlereset=()=>{
    setData(0)
  }


  return (
    <>
   <div className=" ml-50 items-center justify-center  mt-10">

    
      <h2 className="bg-red-700 w-20 text-white text-center font-bold ml-1">{data}</h2>
    
    
     
      <button className="bg-green-600 text-white font-bold p-1 m-1" onClick={handleadd}>Add++</button>
      <button className="bg-green-600 text-white font-bold p-1 m-1" onClick={handleless}>Less--</button>
      <button className="bg-green-600 text-white font-bold p-1 m-1" onClick={handlereset}>Reset</button>
    
   </div>
    
    
    </>
  )
}

export default App