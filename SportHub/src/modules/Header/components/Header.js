import AdminHeader from "../../AdminHeader"
import UserHeader from "../../UserHeader/components/UserHeader"
import NotLoginedHeader from "../../NotLoginedHeader/componets/NotLoginedHeader"
import { useAuthStore } from "../../../store/useAuthStore"
import { useEffect, useState } from "react"
import { ROUTES } from "../../../routes/routes"
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const { userData } = useAuthStore()
    const navigate = useNavigate()
    const [isContentSearch, setIsContentSearch] = useState(false)
    const [contentSearchValue, setContentSearchValue] = useState("")

    useEffect(() => {
        if (isContentSearch) {
            setIsContentSearch(false)
            navigate(ROUTES.SEARCH.replace(':searchValue', contentSearchValue))
        }
    }, [isContentSearch])
    return (
        <>
            {(() => {
                if (userData?.isAdmin) {
                    return <AdminHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                }
                else if (userData?.isAdmin === false) {
                    return <UserHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                }
                else {
                    return <NotLoginedHeader setIsContentSearch={setIsContentSearch} setContentSearchValue={setContentSearchValue} />
                }
            }
            )()}
        </>
    )
}
