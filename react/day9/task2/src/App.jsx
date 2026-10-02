import { useState } from "react"


const App = () => {

  const [useremail,setUseremail]=useState("")
  const [submit,setSubmit]=useState("")

  const handleemail=(e)=>{
     setUseremail(e.target.value)

  }
  const handleclick=()=>{

    setSubmit(useremail)
  }


  return (
    <>
    <div>

    <input type="email" onChange={handleemail} value={useremail} placeholder="Enter your Email " />
    <button onClick={handleclick}>Submit</button>

    <p>Your Email:{submit}</p>
    </div>
    
    </>
  )
}

export default App