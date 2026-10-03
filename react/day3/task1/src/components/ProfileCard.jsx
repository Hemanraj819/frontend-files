import raju from 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGBO7-ORjBhGi-57w0He9t1qmNb3CFAARurOE8UkngDZN-RxxZse28nDV&s=10'
const ProfileCard =()=>{
    return(
        <>
        <div className='content'>
           
            <img className="logo" src={raju} alt="" />
            <h2>Raju</h2>
            <h3>Web developer</h3>
            <button>click</button>


        </div>
        
        </>
    )
}
export default ProfileCard