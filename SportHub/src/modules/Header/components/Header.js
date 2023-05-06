import AdminHeader from "../../AdminHeader";
import UserHeader from "../../UserHeader/components/UserHeader";
import NotLoginedHeader from "../../NotLoginedHeader/componets/NotLoginedHeader";
import {useAuthStore} from "../../../store/useAuthStore";

export default function Header()
{
    const { userData } = useAuthStore()
    const fn = () =>
    {
        if (userData?.isAdmin)
        {
            return <AdminHeader/>
        }
        else if (userData?.isAdmin === false)
        {
            return <UserHeader/>
        }
        else
        {
            return <NotLoginedHeader/>
        }
    }
    return (
        <>
            {fn()}
        </>
    );
}
