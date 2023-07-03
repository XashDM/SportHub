import styles from "../styles/style.module.scss";
import getUsersRequest from "../helpers/getUsersRequest";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAdmins, setShowAdmins] = useState(false);
    const [initialUsersCount, setInitialUsersCount] = useState(0);

    useEffect(() => {
        handleUsersGet();
    }, []);

    useEffect(() => {
        countAdminSize();
    }, [users]);

    useEffect(() => {
        setInitialUsersCount(users.length);
    }, [users]);

    const handleUsersGet = async () => {
        try {
            const result = await getUsersRequest();
            setUsers(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const countAdminSize = () => {
        if (users && users.length) {
            const counter = users.filter((user) => user.isAdmin === true).length;
            setAdmins(counter);
        }
    };

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
    };

    const handleShowAdmins = () => {
        setShowAdmins(true);
    };

    const handleShowAllUsers = () => {
        setShowAdmins(false);
    };

    const handleChangeAction = (event, user) => {
        const action = event.target.value;
        if (action === "block") {
            user.isActivated = false;
        } else if (action === "activate") {
            user.isActivated = true;
        }
        setUsers([...users]);
        console.log(users)
    };

    const filteredUsers = showAdmins ? users.filter((user) => user.isAdmin) : users;

    return (
        <div className={styles.container}>
            <div className={styles.table_container}>
                <div className={styles.table_header}>
                    <div className={styles.user_admin_header}>
                        <span className={!showAdmins ? styles.active : ""} onClick={handleShowAllUsers}>
                            USERS ({initialUsersCount})
                        </span>
                        <span className={styles.admin_ch} onClick={handleShowAdmins}>
                            ADMINS ({admins})
                        </span>
                    </div>
                    <img src={"/icons/Magnifying-glass.svg"} className={styles.search_icon} alt="Search" />
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
                    {filteredUsers && filteredUsers.length ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id} onClick={() => handleShowUserInfo(user)}>
                                <td className="align-left">
                                    <img src={"/icons/User.svg"} alt="User" width="30" height="30" />
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="align-right">
                                    {user.isActivated ? (
                                        <span className={styles.align_right_active}>Active</span>
                                    ) : (
                                        <span>Blocked</span>
                                    )}
                                </td>
                                <td>
                                    {showAdmins ? (
                                        <>
                                            <Select
                                                value={"removeFromAdmin"}
                                                sx={{
                                                    minWidth: 120,
                                                    maxHeight: 32,
                                                    textAlign: 'center',
                                                    color: '#D92B39',
                                                    backgroundColor: '#FDEAEB',
                                                }}
                                            >
                                                <MenuItem value="removeFromAdmin">Remove from Admin</MenuItem>
                                                <MenuItem value="delete">Delete</MenuItem>
                                            </Select>
                                        </>
                                    ) : (
                                        <>
                                            <Select
                                                value={user.isActivated ? "block" : "activate"}
                                                onChange={(event) => handleChangeAction(event, user)}
                                                sx={{
                                                    minWidth: 120,
                                                    maxHeight: 32,
                                                    color: user.isActivated ? "#7F8380" : "#67BA64",
                                                    backgroundColor: user.isActivated ? "#D4D9E2" : "#DFECDD",
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <MenuItem value="block" >Block</MenuItem>
                                                <MenuItem value="activate">Activate</MenuItem>
                                            </Select>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <div className={styles.user_info}>
                    <div className={styles.user_info_header}>
                        <div className={styles.general_info}>General Info</div>
                        <div className={styles.teams_info}>Teams</div>
                    </div>
                    <img className={styles.user_photo} src={"/icons/User.svg"} alt="User" />
                    <div className={styles.user_name}>
                        {selectedUser.firstName} {selectedUser.lastName}
                    </div>
                    <div className={styles.inner_content}>
                        <div className={styles.align_right}>
                            <span className={styles.row_name}>Registered:</span>
                            <span className={styles.content_info}>03/10/2019</span>
                        </div>
                        <div className={styles.align_right}>
                            <span className={styles.row_name}>Passed Surveys:</span>
                            <span className={styles.content_info}>10</span>
                        </div>
                        <div className={styles.align_right}>
                            <span className={styles.row_name}>Teams:</span>
                            <span className={styles.content_info}>12</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersManagement;
