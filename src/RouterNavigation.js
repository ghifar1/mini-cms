import { Route, Routes } from "react-router-dom";
import NavBarComponent from "./components/NavBar";
import FaqPage from "./pages/FaqPage";
import LoginPage from "./pages/LoginPage";

const AuthNavigation = ()=>{
    return (
        <Routes>
            <Route path="/faq" element={<NavBarComponent><FaqPage/></NavBarComponent>} />
        </Routes>
    )
}

const RouterNavigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/a/*" element={<AuthNavigation/>} />
        </Routes>
    )
}

export default RouterNavigation;