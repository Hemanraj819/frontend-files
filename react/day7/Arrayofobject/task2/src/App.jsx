

const App = () => {

  const product=[
    {id:1,name:"Laptop",price:90000,category:"Electronics"},
    {id:2,name:"Keyboard",price:400,category:"Electronics"},
    {id:3,name:"Smart Watch",price:1500,category:"Electronics"},
    {id:4,name:"Headphones",price:299,category:"Electronics"},
    {id:5,name:"Smartphone",price:15000,category:"Electronics"}
  ]
  return (
    <>
    <h2  className="bg-blue-600 text-center p-2 m-2">products</h2>
    <div className="bg-red-500 p-3 m-2 font-bold  flex items-center justify-center ">
      
      {
        product.map((products)=>(
          <div className="bg-white w-40 text-center p-2 m-3 " key={products.id}>
            <p>{products.name}</p>
            <p>{products.price}</p>
            <p>{products.category}</p>
          </div>

        ))
      }
    </div>
    
    
    </>
  )
}

export default App