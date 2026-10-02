import { useState } from "react"


const App = () => {

  let [para,SetPara]=useState(true)
  return (
    <>
    {para&& <p className="bg-pink-300 p-2 m-2">I am a passionate Frontend Developer and a BCA graduate with a strong interest in creating modern and user-friendly websites.
I have skills in HTML, CSS, Bootstrap, Tailwind CSS, JavaScript, and React, and I enjoy learning new technologies and building creative projects.
</p>}

<button className="bg-black text-white p-1 m-3" onClick={()=>SetPara(!para)}>
  {para?"hide":"show"}
</button>
    
    </>
  )
}

export default App