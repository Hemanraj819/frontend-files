
import { Route, Routes } from "react-router-dom"

import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Services from "./components/pages/Services"
import Courses from "./components/pages/Courses"
import Contact from "./components/pages/Contact"
import Help from "./components/pages/Help"
import Gallery from "./components/pages/Gallery"
import NavBar from "./components/NavBar"

const App =()=>{
return(
  <>

    <div>
      <NavBar/>
    </div>
    
       
     <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/courses" element={<Courses/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/help" element={<Help/>} />
            
     </Routes>
  
 
  </>
)
}
export default App