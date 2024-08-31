import { useContext } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList"
import { UserContext } from "../context/UserContext";


export const UserPage = () => {

    const {
        users,
        vivsibleForm,
        handlerOpenForm
    } = useContext(UserContext);


    return (<>
        {!vivsibleForm ||
            <UserModalForm/>
        }
        <div className="container my-4">
            <h2>Users App</h2>
            <div className="row">
                <div className="col">
                    {vivsibleForm ||
                        <button
                            className="btn btn-primary my-2"
                            type="button"
                            onClick={handlerOpenForm}
                        >
                            Nuevo Usuario
                        </button>
                    }

                    {users.length === 0 ?
                        <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                        :
                        <UsersList/>}

                </div>
            </div>
        </div>
    </>)

}