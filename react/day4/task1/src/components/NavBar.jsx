import { Link } from "react-router-dom"


const NavBar =()=>{
    return(
        <>
        <div className="flex   justify-between bg-blue-900 items-center">
            <h1 className="p-3  font-bold text-yellow-500">SkillGrow</h1>
            <div className=" flex">
                <Link className="p-3 text-white" to="/">Home</Link>
                <Link className="p-3 text-white" to="/about">About</Link>
                <Link className="p-3 text-white" to="/services">Services</Link>
                <Link className="p-3 text-white" to="/courses">Courses</Link>
                <Link className="p-3 text-white" to="/gallery">Gallery</Link>
                <Link className="p-3 text-white" to="/contact">Contact</Link>
                <Link className="p-3 text-white" to="/help">Help</Link>
            </div>
        </div>
        
        </>
    )
}
export default NavBar