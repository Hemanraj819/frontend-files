import { useState } from "react"


const App = () => {

  let [value,setValue]=useState("welcome to react")

  let text=()=>{
    setValue("This is My Page")
  }
  

  return (
   <>
   
   
   <div className="bg-white text-red text-center">
    <h2 className="font-bold p-2 m-2">{value}</h2>
    <button className="bg-white text-red-500 p-1 m-3" onClick={text}>Change Text</button>
   </div>
   
   
   </>
  )
}

export default App