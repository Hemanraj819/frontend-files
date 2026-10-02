import { useState } from "react"


const App = () => {

  const [userage,setUserage]=useState("")
  const [click,setClick]=useState("")

  const handleAge = (e) => {
    setUserage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    
    if(userage===""){
      setClick("please enter your age")
    }else{
      setClick(userage)
      setUserage("")

    }
  }
  return (
    <>
    
    <div>
      <input type="number" onChange={handleAge} value={userage} placeholder="Enter your Age"/>
      <button onClick={handleSubmit} >Submit</button>
      <p>{click}</p>
    </div>
    </>
  )
}

export default App