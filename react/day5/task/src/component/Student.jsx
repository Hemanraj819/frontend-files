const Student = () => {
  const Name = "Raju";
  const Age = 20;
  const Course = "React js";
  const Status = true
  const Fees = 15000;
  
  return (

    <>
    
      <div>
       <p> <strong>Student Name</strong> : {Name}</p>
       <p> <strong>Age</strong> : {Age}</p>
       <p> <strong>Course</strong> : {Course}</p>
       <p> <strong>is Active</strong> : {Status?"Active":"In Active"}</p>
       <p> <strong>Fees</strong> : {Fees}</p>
      </div>
    </>
  )
}
export default Student