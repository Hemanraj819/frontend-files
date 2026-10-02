import { useState } from "react"


const App = () => {

  const[savedata,setSaveData]=useState({name:"",email:"",age:"",course:"",age:""})
  

  const handlechange=(e)=>{
    setSaveData({...savedata,[e.target.name]:e.target.value})


  }
  const handleclick=(e)=>{
    e.preventDefault()
    
    console.log(savedata);

  }



  return (
    <>
    <form onSubmit={handleclick}>
      <input type="text" onChange={handlechange} placeholder="Enter your name" name="name" /> <br /><br />
      <input type="email" onChange={handlechange} placeholder="Enter your Email" name="email" /><br /><br />
      <input type="number" onChange={handlechange} placeholder="Enter your Age" name="age" /><br /><br />
      <input type="text" onChange={handlechange} placeholder="Enter your Course" name="course" /><br /><br />
      <input type="text" onChange={handlechange} placeholder="Enter your City" name="city" /><br /><br />
      <input type="submit" />

      




    </form>
    
    
    </>
  )
}

export default App