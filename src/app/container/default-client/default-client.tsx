import { Outlet } from "react-router-dom"
import HeaderClient from "../../components/header/header"
import FooterClient from "../../components/footer/footer"

const DefaultClient = () => {
  return (
    <div>
        <div>
            <HeaderClient/>
        </div>

        <div>
            <Outlet/>
        </div>

        <div>
            <FooterClient/>
        </div>
    </div>
  )
}

export default DefaultClient