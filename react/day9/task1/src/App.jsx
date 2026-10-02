import { useState } from "react"


const App = () => {

const [username,SetUserName]=useState("")

const handlename=(e)=>{

SetUserName(e.target.value)

}
  return (
    <>
    
    <div>
      <input type="text" onChange={handlename} value={username} placeholder="Enter your name"/>
      <p>Name:{username}</p>
    </div>
    
    
    </>
  )
}

export default App