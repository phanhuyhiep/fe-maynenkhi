import { useRoutes } from "react-router-dom";
import DefaultClient from "./app/container/default-client/default-client";
import { clientRouter } from "./app/modules/client/router-client";
import DefaultAdmin from "./app/container/default-admin/default-admin";
import { adminRouter } from "./app/modules/admin/router-admin";
import PrivateRoute from "./app/utils/privateRoute";

function App() {
  const element: any = useRoutes([
    {
      path: "/login",
      element: <DefaultClient />,
      children: clientRouter,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <DefaultAdmin />
        </PrivateRoute>
      ),
      children: adminRouter,
    },
  ]);

  return element;
}

export default App;
