import styles from "../styles/style.module.scss"
import getUsersRequest from "../helpers/getUsersRequest";
import { useState, useEffect } from "react"

function UsersManagment()
{
    const [users, setUsers] = useState([])
    const [admins, setAdmin] = useState(0)
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        handleUsersGet()
        countAdminSize()
    }, [users])
    const handleUsersGet = async () => {
        const result = await getUsersRequest()
        setUsers(result.data)
    }
    const countAdminSize = async () =>{
        let counter = 0
        users.forEach((item, index) => {
            if (item.isAdmin === true)
            {
                counter += 1
            }
        })
        setAdmin(counter)
    }

    const handleShowUserInfo = async (user) =>
    {
        setSelectedUser(user);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.table_container}>
                    <div className={styles.table_header}>
                        <span>USERS ({users.length})</span>
                        <span >ADMINS ({admins})</span>
                        <span className={styles.search_icon}>&#128269;</span>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th className="align-left">NAME</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} onClick={() => handleShowUserInfo(user)}>
                                    <td className="align-left">
                                        <img src={'/icons/User.svg'}
                                             alt="User" width="30" height="30"/>
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="align-right">
                                        {user.isActivated ? "Active" : "Blocked"}
                                    </td>
                                    <td>
                                        <select>
                                            <option value={styles}>Block</option>
                                            <option value="activate">Activate</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedUser && (
                <div className={styles.user_info}>
                    <div className={styles.user_info_header}>
                        <div className={styles.general_info}>General Info</div>
                        <div className={styles.teams_info}>Teams</div>
                    </div>
                    <img className={styles.user_photo} src={'/icons/User.svg'}/>
                    <div className={styles.user_name}>
                        {selectedUser.firstName} {selectedUser.lastName}
                    </div>

                    <div>
                        <span>Registered:</span>
                        <span>12</span>
                    </div>
                    <div>
                        <span>Passed Surveys:</span>
                        <span></span>
                    </div>
                    <div>
                        <span>Teams:</span>
                        <span></span>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}
export default UsersManagment;