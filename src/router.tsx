
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLoyout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";


 const router = createBrowserRouter([{
    path:"/",
    element:<RootLayout/>,
    children:[
        {index: true, element: <Home/>},
        {path:"/pokedex", element:<Pokedex/>}

    ]
}])


export default router