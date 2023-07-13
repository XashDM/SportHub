import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import getUsersRequest from "../helpers/getUsersRequest";
import putUsersStatusRequest from "../helpers/putUsersStatusRequest";
import styles from "../styles/style.module.scss";

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAdmins, setShowAdmins] = useState(false);
    const [initialUsersCount, setInitialUsersCount] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [selectStyles, setSelectStyles] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleUsersGet();
    }, [currentPage, showAdmins]);

    useEffect(() => {
        countAdminSize();
    }, [users]);

    useEffect(() => {
        setInitialUsersCount(users.length);
        setInitialSelectStyles();
    }, [users]);

    const handleUsersGet = async () => {
        setLoading(true);
        try {
            const result = await getUsersRequest(currentPage, pageSize, showAdmins);
            setUsers(result.data);
            setTotalPages(Math.ceil(result.data.length / pageSize));
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const countAdminSize = () => {
        if (users && users.length) {
            const counter = users.filter((user) => user.isAdmin === true).length;
            setAdmins(counter);
        }
    };

    const setInitialSelectStyles = () => {
        const initialStyles = users.reduce((styles, user) => {
            const userStyles = {};
            if (user.isActivated) {
                userStyles.color = "#67BA64";
                userStyles.backgroundColor = "#DFECDD";
                userStyles.minWidth = 120;
                userStyles.maxHeight = 32;
                userStyles.textAlign = "center";
            } else {
                userStyles.color = "#7F8380";
                userStyles.backgroundColor = "#D4D9E2";
                userStyles.minWidth = 120;
                userStyles.maxHeight = 32;
                userStyles.textAlign = "center";
            }
            styles[user.userId] = userStyles;
            return styles;
        }, {});
        setSelectStyles(initialStyles);
    };

    const handleShowUserInfo = (user) => {
        setSelectedUser(user);
    };

    const handleShowAdmins = () => {
        setShowAdmins(true);
        setShowSearch(false);
        setCurrentPage(1);
    };

    const handleShowAllUsers = () => {
        setShowAdmins(false);
        setShowSearch(false);
        setCurrentPage(1);
    };

    const handleChangeAction = (event, user) => {
        const action = event.target.value;
        const updatedUsers = users.map((u) => {
            if (u.userId === user.userId) {
                if (action === "activate") {
                    u.isActivated = true;
                }
                if (action === "block") {
                    u.isActivated = false;
                }
                try {
                    putUsersStatusRequest(u);
                } catch (error) {
                    console.error("Error updating user status:", error);
                }
            }
            return u;
        });
        setUsers(updatedUsers);
        const updatedStyles = {
            ...selectStyles,
            [user.userId]: getSelectStyles(action, user.isActivated),
        };
        setSelectStyles(updatedStyles);
    };

    const getSelectStyles = (action, isActivated) => {
        if (action === "activate") {
            return {
                color: "#67BA64",
                backgroundColor: "#DFECDD",
                minWidth: 120,
                maxHeight: 32,
                textAlign: "center",
            };
        } else if (action === "block") {
            return {
                color: "#7F8380",
                backgroundColor: "#D4D9E2",
                minWidth: 120,
                maxHeight: 32,
                textAlign: "center",
            };
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchClick = () => {
        setShowSearch(true);
    };

    const handleSearchClose = () => {
        setShowSearch(false);
        setSearchInput("");
    };

    const handleSearch = (user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const searchValue = searchInput.toLowerCase();
        return fullName.includes(searchValue);
    };

    const filteredUsers = showAdmins
        ? users.filter((user) => user.isAdmin && handleSearch(user))
        : users.filter(handleSearch);

    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage <= totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const renderPaginationButtons = () => {
        const pageButtons = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(startPage + 4, totalPages);
        if (startPage > 1) {
            pageButtons.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "outlined" : "contained"}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                    sx={{
                        backgroundColor: "#D72130",
                        color: currentPage === 1 ? "#D72130" : "#FFFFFF",
                        minWidth: 30,
                        maxHeight: 32,
                        margin: "0 5px",
                    }}
                >
                    1
                </Button>
            );
            if (startPage > 2) {
                pageButtons.push(
                    <Button
                        key={-1}
                        variant="contained"
                        disabled
                        sx={{ backgroundColor: "#D72130", minWidth: 30, maxHeight: 32 }}
                    >
                        ...
                    </Button>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "outlined" : "contained"}
                    disabled={currentPage === i}
                    onClick={() => handlePageChange(i)}
                    sx={{
                        backgroundColor: "#D72130",
                        color: currentPage === i ? "#D72130" : "#FFFFFF",
                        minWidth: 30,
                        maxHeight: 32,
                        margin: "0 5px",
                    }}
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(
                    <Button
                        key={-2}
                        variant="contained"
                        disabled
                        sx={{ backgroundColor: "#D72130", minWidth: 30, maxHeight: 32 }}
                    >
                        ...
                    </Button>
                );
            }
            pageButtons.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "outlined" : "contained"}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    sx={{
                        backgroundColor: "#D72130",
                        color: currentPage === totalPages ? "#D72130" : "#FFFFFF",
                        minWidth: 30,
                        maxHeight: 32,
                        margin: "0 5px",
                    }}
                >
                    {totalPages}
                </Button>
            );
        }

        return pageButtons;
    };

    const renderAdminPaginationButtons = () => {
        const adminPageButtons = [];
        const adminTotalPages = Math.ceil(admins / pageSize);

        const adminStartPage = Math.max(1, currentPage - 2);
        const adminEndPage = Math.min(adminStartPage + 4, adminTotalPages);

        if (adminStartPage > 1) {
            adminPageButtons.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? "outlined" : "contained"}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                    sx={{
                        backgroundColor: "#D72130",
                        color: currentPage === 1 ? "#D72130" : "#FFFFFF",
                        minWidth: 30,
                        maxHeight: 32,
                        margin: "0 5px",
                    }}
                >
                    1
                </Button>
            );
            if (adminStartPage > 2) {
                adminPageButtons.push(
                    <Button
                        key={-1}
                        variant="contained"
                        disabled
                        sx={{ backgroundColor: "#D72130", minWidth: 30, maxHeight: 32 }}
                    >
                        ...
                    </Button>
                );
            }
        }

        for (let i = adminStartPage; i <= adminEndPage; i++) {
            adminPageButtons.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "outlined" : "contained"}
                    disabled={currentPage === i}
                    onClick={() => handlePageChange(i)}
                    sx={{
                        backgroundColor: "#D72130",
                        color: currentPage === i ? "#D72130" : "#FFFFFF",
                        minWidth: 30,
                        maxHeight: 32,
                        margin: "0 5px",
                    }}
                >
                    {i}
                </Button>
            );
        }

        if (adminEndPage < adminTotalPages) {
            if (adminEndPage < adminTotalPages - 1) {
                adminPageButtons.push(
                    <Button
                        key={-2}
                        variant="contained"
                        disabled
                        sx={{ backgroundColor: "#D72130", minWidth: 30, maxHeight: 32 }}
                    >
                        ...
                    </Button>
                );
            }
            adminPageButtons.push(
                <Button
                    key={adminTotalPages}
                    variant={currentPage === adminTotalPages ? "outlined" : "contained"}
                    disabled={currentPage === adminTotalPages}
                    onClick={() => handlePageChange(adminTotalPages)}
                    sx={{
                        backgroundColor: "#D72130",
                        color: currentPage === adminTotalPages ? "#D72130" : "#FFFFFF",
                        minWidth: 30,
                        maxHeight: 32,
                        margin: "0 5px",
                    }}
                >
                    {adminTotalPages}
                </Button>
            );
        }
        return adminPageButtons;
    };

    return (
        <div className={styles.container}>
            <div className={styles.table_container}>
                <div className={styles.table_header}>
                    <div className={styles.user_admin_header}>
            <span
                className={!showAdmins ? styles.active : ""}
                onClick={handleShowAllUsers}
            >
              USERS ({initialUsersCount})
            </span>
                        <span
                            className={showAdmins ? styles.active : ""}
                            onClick={handleShowAdmins}
                        >
              ADMINS ({admins})
            </span>

                        {!showSearch ? (
                            <></>
                        ) : (
                            <div className={styles.search_input_wrapper}>
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={handleSearchInputChange}
                                    className={styles.search_input}
                                    placeholder="Search..."
                                />
                                <button
                                    className={styles.search_close}
                                    onClick={handleSearchClose}
                                >
                                    <img
                                        src={"/icons/Close.svg"}
                                        alt="Close"
                                        width="14"
                                        height="14"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                    {!showSearch && (
                        <img
                            src={"/icons/Magnifying-glass.svg"}
                            className={styles.search_icon}
                            alt="Search"
                            onClick={handleSearchClick}
                        />
                    )}
                </div>
                <table className={styles.users_table}>
                    <thead>
                    <tr>
                        <th className="align-left">NAME</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedUsers && displayedUsers.length ? (
                        displayedUsers.map((user) => (
                            <tr key={user.id} onClick={() => handleShowUserInfo(user)}>
                                <td className="align-left">
                                    <img
                                        src={"/icons/User.svg"}
                                        alt="User"
                                        width="30"
                                        height="30"
                                    />
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
                                                id={`changeAdminStatus_${user.userId}`}
                                                defaultValue="removeFromAdmin"
                                                sx={selectStyles[user.userId]}
                                            >
                                                <MenuItem value="removeFromAdmin">
                                                    Remove from Admin
                                                </MenuItem>
                                                <MenuItem value="delete">Delete</MenuItem>
                                            </Select>
                                        </>
                                    ) : (
                                        <>
                                            <Select
                                                id={`changeUserStatus_${user.userId}`}
                                                defaultValue={user.isActivated ? "block" : "activate"}
                                                onChange={(event) =>
                                                    handleChangeAction(event, user)
                                                }
                                                sx={selectStyles[user.userId]}
                                            >
                                                <MenuItem value="block">Block</MenuItem>
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
                {loading && (
                    <div className={styles.loading}>
                        <CircularProgress color="secondary" />
                    </div>
                )}
                <div className={styles.pagination}>
                    {showAdmins ? (
                        <>
                            <Button
                                variant="contained"
                                disabled={currentPage === 1}
                                onClick={handlePreviousPage}
                                sx={{
                                    backgroundColor: "#D72130",
                                    color: "#FFFFFF",
                                    minWidth: 30,
                                    maxHeight: 32,
                                    margin: "0 5px",
                                }}
                            >
                                &lt;
                            </Button>
                            {renderAdminPaginationButtons()}
                            <Button
                                variant="contained"
                                disabled={currentPage === totalPages || admins === 0}
                                onClick={handleNextPage}
                                sx={{
                                    backgroundColor: "#D72130",
                                    color:
                                        currentPage === totalPages || admins === 0
                                            ? "#D72130"
                                            : "#FFFFFF",
                                    minWidth: 30,
                                    maxHeight: 32,
                                    margin: "0 5px",
                                }}
                            >
                                &gt;
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                disabled={currentPage === 1}
                                onClick={handlePreviousPage}
                                sx={{
                                    backgroundColor: "#D72130",
                                    color: "#FFFFFF",
                                    minWidth: 30,
                                    maxHeight: 32,
                                    margin: "0 5px",
                                }}
                            >
                                &lt;
                            </Button>
                            {renderPaginationButtons()}
                            <Button
                                variant="contained"
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={handleNextPage}
                                sx={{
                                    backgroundColor: "#D72130",
                                    color: currentPage === totalPages ? "#D72130" : "#FFFFFF",
                                    minWidth: 30,
                                    maxHeight: 32,
                                    margin: "0 5px",
                                }}
                            >
                                &gt;
                            </Button>
                        </>
                    )}
                </div>
            </div>
            {selectedUser && (
                <div className={styles.user_info}>
                    <div className={styles.user_info_header}>
                        <div className={styles.general_info}>General Info</div>
                    </div>
                    <img
                        className={styles.user_photo}
                        src={"/icons/User.svg"}
                        alt="User"
                    />
                    <div className={styles.user_name}>
                        {selectedUser.firstName} {selectedUser.lastName}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersManagement;
