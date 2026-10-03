import Phone from "./components/Phone"
import Product from "./components/Product"


const App = () => {
  return (
    <>
    <div className="top">
      <h1>Products</h1>
      <div className="link">
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
      </div>
    </div>
 
    <Phone/>
    <Product/>
    </>
  )
}

export default App