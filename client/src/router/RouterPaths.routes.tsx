import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HOME, LOGOPAGE, PRIVATE } from "../config/routes/paths"
import { PublicRoute } from "../components/router/PublicRoute"
import { PrivateRoute } from "../components/router/PrivateRoute"
import LandingPage from "../pages/public/LandingPage"
import PrivatePage from "../pages/private/PrivatePage"
import LogoPage from "../pages/private/LogoPage"

const RouterPaths = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path={HOME} element={<PublicRoute />}>
                <Route index element={<LandingPage />} />
            </Route>
            <Route path={PRIVATE} element={<PrivateRoute />}>
                <Route index element={<PrivatePage />} /> 
                <Route path={LOGOPAGE} element={<LogoPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default RouterPaths