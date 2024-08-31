import { NavLink } from "react-router-dom"

export const UserRow = ({ user, handlerRemoveUser, handlerUserSelectedForm }) => {

    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handlerUserSelectedForm({
                        id:user.id,
                        username:user.username,
                        email:user.email,
                    })}>update
                </button>
            </td>
            <td>
                <NavLink className={'btn btn-secondary btn-sm'}
                    to={'/users/edit/' + user.id}>update route</NavLink>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handlerRemoveUser(user.id)}>remove
                </button>
            </td>
        </tr>
    )

}