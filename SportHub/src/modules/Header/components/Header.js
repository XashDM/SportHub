import AdminHeader from "../../AdminHeader"
import UserHeader from "../../UserHeader/components/UserHeader"
import NotLoginedHeader from "../../NotLoginedHeader/componets/NotLoginedHeader"
import {useAuthStore} from "../../../store/useAuthStore"

export default function Header({setIsContentSearch, setContentSearchValue})
{
    const { userData } = useAuthStore()
    return (
        <>
            {(()=>{
                if (userData?.isAdmin)
                {
                    return <AdminHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                }
                else if (userData?.isAdmin === false)
                {
                    return <UserHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                }
                else
                {
                    return <NotLoginedHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                }
                }
            )()}
        </>
    )
}
