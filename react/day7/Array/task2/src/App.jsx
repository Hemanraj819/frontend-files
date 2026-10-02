

const App = () => {

  const city=["CHENNAI","VILLUPURAM","VELLORE","THIRUVANAMALAI","COIMBATORE"]
  return (
    <>
    <div className="bg-red-600 p-2">
      <h2 className="bg-blue-800 text-center p-2 m-2 text-white">CITY</h2>
      {
        city.map((e,i)=>(
        <ul>
          <li className="bg-blue-400 p-2 m-3 text-center" key={i}>{e}</li>
        </ul>
        ))
      }
    </div>
    
    
    </>
  )
}

export default App