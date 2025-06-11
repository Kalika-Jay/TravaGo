import{createBrowserRouter,RouterProvider} from "react-router-dom";
import './App.css'
import HomePage from './pages/Home.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Discovery from "./pages/Discovery.jsx";
import Map from "./pages/Map.jsx";
import Contact from "./pages/Contact.jsx"
import Feedback from "./pages/Feedback.jsx"
import Layout from "./Layout.jsx";

const routes = [
    {path:'/',element:<Layout/>,children:[
        {path:'/',element:<HomePage/>},
            {path:'/userprofile',element:<UserProfile/>},
            {path:'/discovery',element:<Discovery/>},
            {path:'/map',element:<Map/>},
            {path:'/contact',element:<Contact/>},
            {path:'/feedback',element:<Feedback/>}
        ]},
]
const router = createBrowserRouter(routes)

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}
export default App
