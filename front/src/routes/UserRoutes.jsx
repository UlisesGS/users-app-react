import { Navigate, Route, Routes } from "react-router-dom"
import {UserPage} from "../pages/UserPage"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPage } from "../pages/RegisterPage"
import { UserProvider } from "../context/UserProvider"

export const UserRoutes = () => {

    

  return (
    <>
        <UserProvider>
            <Navbar/>
            <Routes>
                <Route path="users" element={<UserPage/>}/>
                <Route path="users/register" element={<RegisterPage/>} />
                <Route path="users/edit/:id" element={<RegisterPage/>}/>
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </UserProvider>
    </>)
}
