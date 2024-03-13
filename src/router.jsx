import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContent from "./mainContent";
import ErrorPage from "./components/errorPage";
import Index from "./components";
import SignUp from "./components/signUp";
import Login from "./components/login";
import Logout from "./components/logout";
import About from "./components/about";
import Articles from "./components/articles";
import Article from "./components/article";
import Comments from "./components/comments";
import SavedArticles from "./components/savedArticle";

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
                  },
                  {
                    path: "sign-in",
                    element: <Login />
                  },
                  {
                    path: "logout",
                    element: <Logout />
                  },
                  {
                    path: "about",
                    element: <About />
                  },
                  {
                    path: "articles",
                    element: <Articles />
                  }, 
                  {
                    path: "article/:id",
                    element: <Article />
                  }, 
                  {
                    path: "comments/:id",
                    element: <Comments />
                  },
                  {
                    path: "saved_articles",
                    element: <SavedArticles />
                  }, 
              ],
          }
        ],
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;