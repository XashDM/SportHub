import axios from "axios";

const putUsersStatusRequest = async (user) => {
    try {
        const backendHost = "https://localhost:7168";
        const response = await axios.put(
            `${backendHost}/User`,
            {
                UserId: user.userId,
                IsAdmin: user.isAdmin,
                IsActivated: user.isActivated
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
        return error.code;
    }
};

export default putUsersStatusRequest;
