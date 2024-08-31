import { useUsers } from "../hooks/useUsers";
import { UserContext } from "./UserContext"

export const UserProvider = ({children}) => { //Los children son todo lo que esta anidado en userroutes, en usercontext.

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

    return(
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                vivsibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm
            }
        }>
            {children}
        </UserContext.Provider>
    )
}