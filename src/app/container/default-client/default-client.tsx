import { Outlet } from "react-router-dom"

const DefaultClient = () => {
  return (
    <div>
        {/* <div>
            <HeaderClient/>
        </div> */}

        <div>
            <Outlet/>
        </div>
{/* 
        <div>
            <FooterClient/>
        </div> */}
    </div>
  )
}

export default DefaultClient