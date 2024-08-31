import { useEffect, useState } from "react"
import { UserForm } from "../components/UserForm"
import { useParams } from "react-router-dom";

export const RegisterPage = ({ users=[], handlerAddUser, initialUserForm }) => {
  
    const [userSelected, setUserSelected] = useState(initialUserForm);
    //IMPORTANTE, MISMO NOMBRE QUE LE PUSIMOS EN LA RUTA :id
    const { id } = useParams();

    useEffect(() => {
        if(id){
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id])
  
    return (
        <div className="container my-4">
            <h4>Registro de usuarios</h4>
            <div className="row">
                <div className="col">
                    <UserForm 
                        userSelected={userSelected} 
                        handlerAddUser={handlerAddUser} 
                        initialUserForm={initialUserForm}/>
                </div>
            </div>
        </div>
    )
}
