

const App = () => {

  const product={
    name:"Laptop",
    price:78000,
    category:"Electronics", 
    brand:"Asus"
  }

  
  return (

    <>
    <div className="bg-black text-white text-center p-2">
      <h2 className="bg-blue-100 text-black">Product Details</h2>
      <div className="bg-yellow-300 text-red-800 p-2 m-2  g-1 flex-wrap">
        <p className="p-2  ">name:{product.name}</p>
        <p className="p-2  ">Age:{product.price}</p>
        <p className="p-2  ">Category:{product.category}</p>
        <p className="p-2  ">Brand:{product.brand}</p>
      </div>
    </div>
    
    </>
    
  )
}

export default App