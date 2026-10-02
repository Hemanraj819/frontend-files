

const App = () => {

  const product=[
    
    {id:100,name:"mobile",price:10000,category:"electronics"},
    {id:101,name:"laptop",price:150000,category:"electronics"},
    {id:102,name:"mouse",price:4500,category:"electronics"},
    {id:103,name:"keyboard",price:5000,category:"electronics"}
  ]
  return (
    <>
    <div>
      {
        product.map((product)=>(
         <div  key={product.id}>
          <h2 className="bg-red-300">{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p>Category: {product.category}</p>
        </div>
        ))
      }
    </div>
    
    </>
  )
}

export default App