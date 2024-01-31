import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FORMPAGE, HOME, LOGOPAGE, PRIVATELOGOPAGE, USERPAGE, SIGNUPPAGE, LOGINPAGE } from "../config/routes/paths"
import LandingPage from "../pages/public/LandingPage"
import LogoPage from "../pages/public/LogoPage"
import UserPage from "../pages/private/UserPage"
import FormPage from "../pages/public/FormPage"
import SignUpPage from "../pages/public/SignUpPage"
import LoginPage from "../pages/public/LoginPage"

const RouterPaths = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
                <Route path={HOME} element={<LandingPage />} />
                <Route path={FORMPAGE} element={<FormPage />} />
                <Route path={LOGOPAGE} element={<LogoPage />} />
                <Route path={SIGNUPPAGE} element={<SignUpPage />} />
                <Route path={LOGINPAGE} element={<LoginPage />} />
                <Route path={USERPAGE} element={<UserPage />} />
                <Route path={PRIVATELOGOPAGE} element={<LogoPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default RouterPaths