const App = () => {
const course=["HTML","REACT","CSS","JAVA SCRIPT","TAILWINDCSS"]


  return (
    <>
    
  <div>
    <h2 className="bg-blue-400 p-4 ">Courses</h2>
    {

      course.map((e,i)=>(
         <p className=" bg-blue-600 text-white p-3 m-3" key={i}>


          {e}
          
          </p>
      ))
    }
  </div>
    </>
  )
}

export default App