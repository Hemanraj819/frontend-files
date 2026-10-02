import { useState } from "react"


const App = () => {

  const[savedata,setSaveData]=useState({EmployeeName:"",EmployeeID:"",Department:"",Role:"",Salary:""})
  

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
      <input type="text" onChange={handlechange} placeholder="Enter your EmployeeName" name="EmployeeName" /> <br /><br />
      <input type="text" onChange={handlechange} placeholder="Enter your EmployeeID" name="EmployeeID" /><br /><br />
      <input type="text" onChange={handlechange} placeholder="Enter your Department" name="Department" /><br /><br />
      <input type="text" onChange={handlechange} placeholder="Enter your Role" name="Role" /><br /><br />
      <input type="text" onChange={handlechange} placeholder="Enter your Salary" name="Salary" /><br /><br />
      <input type="submit" />

      




    </form>
    
    
    </>
  )
}

export default App