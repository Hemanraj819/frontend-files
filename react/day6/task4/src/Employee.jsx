

const Employee = (props) => {
    const {Raju}=props
  return (
    <>
    <div className="bg-red-400 text-center p-2" >
        <h2 className="bg-black-200">Employee Details</h2>
        <p className="bg-ligth-700 p-1 m-3 text-white"> {Raju.name}</p>
        <p className="bg-ligth-700 p-1 m-3 text-white"> {Raju.role}</p>
        <p className="bg-ligth-700 p-1 m-3 text-white"> {Raju.salary}</p>
        <p className="bg-ligth-700 p-1 m-3 text-white"> {Raju.city}</p>
    </div>
    
    </>
  )
}

export default Employee