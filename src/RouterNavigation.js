import { Route, Routes } from "react-router-dom";
import NavBarComponent from "./components/NavBar";
import FaqPage from "./pages/faq/FaqPage";
import LoginPage from "./pages/LoginPage";
import RegulationPage from "./pages/regulation/RegulationPage";

const AuthNavigation = ()=>{
    return (
        <Routes>
            <Route path="/faq" element={<NavBarComponent><FaqPage/></NavBarComponent>} />
            <Route path="/regulation" element={<NavBarComponent><RegulationPage/></NavBarComponent>} />
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