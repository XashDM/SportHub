import extendedAxios from "../../../extendedAxios"

const putUsersStatusRequest = async (user) => {
    try {
        const response = await extendedAxios.put(
            `/User`,
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
