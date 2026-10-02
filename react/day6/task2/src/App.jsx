
const App = () => {
  const obj={
    name:"Raju",
    age:22,
    course:"full stack",
    city:"Velachary"
  }
  return (
    <>

    <h2 className="bg-orange-400 text-center p-2">Student Data</h2>
    <div className="bg-yellow-200 h-100 p-2">
    <p className="bg-green-400 p-2 m-3 text-center">Name : {obj.name}</p>
    <p className="bg-green-400 p-2 m-3 text-center">Age : {obj.age}</p>
    <p className="bg-green-400 p-2 m-3 text-center">Course : {obj.course}</p>
    <p className="bg-green-400 p-2 m-3 text-center">City : {obj.city}</p>
    </div>
    
    
    </>
  )
}

export default App