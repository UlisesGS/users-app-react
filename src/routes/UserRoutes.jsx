import { Navigate, Route, Routes } from "react-router-dom"
import {UserPage} from "../pages/UserPage"
import { Navbar } from "../components/layout/Navbar"
import { RegisterPage } from "../pages/RegisterPage"
import { useUsers } from "../hooks/useUsers"

export const UserRoutes = ({login,handlerLogout}) => {

    const {
        users,
        userSelected,
        initialUserForm,
        vivsibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm
    } = useUsers();

  return (<>
        <Navbar
            handlerLogout={handlerLogout}
            login={login}
        />
        <Routes>
            <Route path="users" element={<UserPage 
                users={users}
                userSelected={userSelected}
                initialUserForm={initialUserForm}
                vivsibleForm={vivsibleForm}
                handlerAddUser={handlerAddUser}
                handlerRemoveUser={handlerRemoveUser}
                handlerUserSelectedForm={handlerUserSelectedForm}
                handlerOpenForm={handlerOpenForm}
                handlerCloseForm={handlerCloseForm}
            />}/>
            <Route path="users/register" element={<RegisterPage
                handlerAddUser={handlerAddUser}
                initialUserForm={initialUserForm}

            />} />
            <Route path="users/edit/:id" element={<RegisterPage
                users={users}
                handlerAddUser={handlerAddUser} 
                initialUserForm={initialUserForm}

            />}/>
            <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
  </>)
}
