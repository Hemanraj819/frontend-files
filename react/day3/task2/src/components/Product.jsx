const Product=()=>{
    return(
        <>
        <div className="box">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHDsr2XiNPaWPC0Z2mwZXSCpW_c22PYzcKh6m_Bg8AvA&s" alt="" />
            <h2>GT 650</h2>
            <h3>550000</h3>
            <button>Buy now</button>
        </div>
        <Car/>
        </>
    )
}
export default Product

export const Car =()=>{
    return(
        <>
        <div className="box">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHFWm0UXF38OFwezz-XsTpm_ziCgcBIMFQc5ORNxkF0fGpYSoT6Yq9faEn&s=10" alt="" />
            <h2>Car</h2>
            <h3>500000</h3>
            <button>Buy now</button>
        </div>
        </>
    )
}