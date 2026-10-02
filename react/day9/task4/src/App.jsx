import { useState } from "react"


const App = () => {

  const[search,setSearch]=useState("")

  const handlesearch=(e)=>{
    setSearch(e.target.value)
  }



  return (
    <>
    <div>
      <input type="text" value={search} onChange={handlesearch} placeholder="search " />

      <p>{search}</p>
    </div>
    
    </>
  )
}

export default App