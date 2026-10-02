

const App = () => {
  const employee=[
    {id:1,name:"Raju",department:"BCA",salary:"40000"},
    {id:2,name:"Mani",department:"FS",salary:"78000"},
    {id:3,name:"Vicky",department:"Python",salary:"30000"},
    {id:4,name:"Kumar",department:"Java",salary:"77000"}
  ]


  return (
    <>
    <h2 className="bg-black text-white text-center font-bold p-2 m-3">Employee Details</h2>
    <div className="bg-orange-500 flex  justify-center items-center p-2 m-3">

      {
        employee.map((employee)=>(
          <div className="bg-blue-400 p-2 m-3 font-bold" key={employee.id}>
            <p>Name:{employee.name}</p>
            <p>Department:{employee.department}</p>
            <p>Salary:{employee.salary}</p>

          </div>
        ))
      }
    </div>
    
    
    </>
  )
}

export default App