import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContent from "./MainContent";
import ErrorPage from "./components/errorPage";
import Index from "./components";
import SignUp from "./components/signUp";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <MainContent />,
        errorElement: <ErrorPage />,
        children: [
          {
              errorElement: <ErrorPage />,
              children: [
                  {index: true, element: <Index />},
                  {
                    path: "sign-up",
                    element: <SignUp />
                  }
              ],
          }
        ],
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;