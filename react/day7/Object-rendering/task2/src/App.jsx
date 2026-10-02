

const App = () => {

  const data={
    name:"Vicky",
    age:25,
    salary:30000,
    location:"ooty"
  }
  return (
    <>
    <div className="bg-red-300 text-center p-2">
      <h2 className="bg-blue-700 text-white p-2 m-2">Employee Details</h2>
      <h3 className="bg-white p-2 m-3 w-50  ">Name:{data.name}</h3>
      <h3 className="bg-white p-2 m-3 w-50 ">Age:{data.age}</h3>
      <h3 className="bg-white p-2 m-3 w-50 ">Salary:{data.salary}</h3>
      <h3 className="bg-white p-2 m-3 w-50 ">Location:{data.location}</h3>
    </div>
    
    </>
  )
}

export default App