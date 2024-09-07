import { useRoutes } from "react-router-dom"
import DefaultLayout from "./app/container/default-layout/default-layout"
import DefaultClient from "./app/container/default-client/default-client"
import { clientRouter } from "./app/modules/client/router-client"
import DefaultAdmin from "./app/container/default-admin/default-admin"
import { adminRouter } from "./app/modules/admin/router-admin"

function App() {
  const element:any = useRoutes([
    {
      path:"/",
      element: <DefaultLayout/>,
      children: [
        {
          path: "",
          element: <DefaultClient/>,
          children: clientRouter
        },
        {
          path: "admin",
          element: <DefaultAdmin/>,
          children: adminRouter
        }
      ]
    }
  ])
  return element
}

export default App
