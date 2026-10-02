

const App = () => {

  const courses=["FULL STACK","PYTHON","JAVA","REACT"]
 

  return (
    <>
  
    <div className="bg-blue-200 h-100">
      <h2 className="bg-black text-white text-center">COURSES</h2>
      <h3 className="p-2 m-3">Available Courses</h3> 
      {
        courses.map((e,i)=>(
         
          <p className="bg-red-700 text-white p-2 m-2 w-50" key={i}>{e}</p>
         
        
        ))
      }
      
    </div>
    
    </>
    
  )
}

export default App