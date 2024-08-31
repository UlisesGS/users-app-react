import { useEffect, useState } from "react"
import Swal from "sweetalert2";


export const UserForm = ({ handlerAddUser, initialUserForm, userSelected, handlerCloseForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {id, username, password, email} = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: '',
        });
    
    }, [userSelected])

    const onInputChange = ({target}) => {
        const {name, value} = target;
        
        setUserForm({
            ...userForm,
            [name]: value
        })
        
    }


    const onSubmit = (event) => {
        event.preventDefault();//ESTO ES PARA QUE CUANDO SE ACTUALICE EL FORM, NO RECARGUE LA PAGINA
        if(!username || (!password && id === 0) || !email){
            Swal.fire({
                title: "Error de validacion",
                text: "Debe completar todos los campos del formulario!",
                icon: "error"
            });
            return;
        }
        if(!email.includes('@')){
            Swal.fire({
                title: "Error de validacion email",
                text: "El email debe ser valido, incluir un @",
                icon: "error"
            });
            return;
        }
        console.log('entro');
        
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }


    return(
        <form onSubmit={onSubmit}>
            <input
                type="text"
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange}
            />

            {id > 0 ||
                <input
                    type="password"
                    className="form-control my-3 w-75"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                />
            }
            
            <input
                type="text"
                className="form-control my-3 w-75"
                placeholder="email@gmail.com"
                name="email"
                value={email}
                onChange={onInputChange}
            />
            <input 
                type="hidden"
                name="id"
                value={id}
            />
            <button
                type="submit" 
                className="btn btn-primary">{id > 0 ? 'Editar' : 'Crear'}
            </button>

            {!handlerCloseForm || 
                <button
                    className="btn btn-primary mx-2"
                    type="button"
                    onClick={() => onCloseForm()}
                >
                    Cerrar
                </button>
            }
        </form>
    )

}