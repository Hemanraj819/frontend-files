const car = document.getElementById("car")
 
const bts =document.getElementById("bts")

  car.addEventlistenter("click",()=>{
    
    if(bts.style.display === "none") {
    
        car.style.display = "block"
    }else{
        text.style.display = "none"
    }
})




