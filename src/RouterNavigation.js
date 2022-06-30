import { Navigate, Route, Routes } from "react-router-dom";
import NavBarComponent from "./components/NavBar";
import FaqPage from "./pages/faq/FaqPage";
import LoginPage from "./pages/LoginPage";
import RegulationPage from "./pages/regulation/RegulationPage";
import Cookies from 'universal-cookie';
import Cryptojs from "crypto-js";

const AuthNavigation = () => {
    return (
        <Routes>
            <Route path="/faq" element={<NavBarComponent><FaqPage /></NavBarComponent>} />
            <Route path="/regulation" element={<NavBarComponent><RegulationPage /></NavBarComponent>} />
        </Routes>
    )
}

const AuthCheck = ({ children }) => {
    const cookie = new Cookies()
    const biskuit = cookie.get("biskuit")
    if (!biskuit) {
        return <Navigate to={'/'} />
    }

    const auth = Cryptojs.AES.decrypt(cookie.get('biskuit'), "biskuit123").toString(Cryptojs.enc.Utf8);
    if (auth !== "kepoo yaaaa")
    {
        return <Navigate to={'/'} />
    }

    return children
}

const RouterNavigation = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/a/*" element={<AuthCheck><AuthNavigation /></AuthCheck>} />
        </Routes>
    )
}

export default RouterNavigation;