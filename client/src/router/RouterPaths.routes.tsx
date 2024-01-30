import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FORMPAGE, HOME, LOGOPAGE, PRIVATE, PRIVATELOGOPAGE, USERPAGE } from "../config/routes/paths"
import { PublicRoute } from "../components/router/PublicRoute"
import { PrivateRoute } from "../components/router/PrivateRoute"
import LandingPage from "../pages/public/LandingPage"
import LogoPage from "../pages/public/LogoPage"
import UserPage from "../pages/private/UserPage"
import FormPage from "../pages/public/FormPage"

const RouterPaths = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path={HOME} element={<PublicRoute />}>
                <Route index element={<LandingPage />} />
                <Route path={FORMPAGE} element={<FormPage />} />
                <Route path={LOGOPAGE} element={<LogoPage />} />
            </Route>
            <Route path={PRIVATE} element={<PrivateRoute />}>
                <Route path={USERPAGE} element={<UserPage />} />
                <Route path={PRIVATELOGOPAGE} element={<LogoPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default RouterPaths