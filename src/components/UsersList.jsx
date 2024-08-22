import { UserRow } from "./UserRow"

export const UsersList = ({ users = [], handlerRemoveUser, handlerUserSelectedForm }) => {

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Emil</th>
                    <th>Update</th>
                    <th>Update route</th>
                    <th>Remove</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map( (user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            handlerRemoveUser={handlerRemoveUser}
                            handlerUserSelectedForm={handlerUserSelectedForm}
                        />
                    ))
                }
            </tbody>
        </table>
    )

}