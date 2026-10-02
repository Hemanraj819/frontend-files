import Employee from "./Employee"


const App = () => {
  const data={
    name:"Raju",
    role:"HR",
    salary:70000,
    city:"chennai"
  }
  return (
    <>
    <Employee Raju={data}/>
    </>
  )
}

export default App