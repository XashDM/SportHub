import React from "react"
import {useAuthStore} from "../../../store/useAuthStore"
import {useNavigate} from "react-router-dom"
import Button from "../../../ui/Button"


export default function HomePage(){
    const { userData }=useAuthStore()
    const navigate = useNavigate()
    return (
        <>
            {
                userData.isAdmin
                ?
                    <>
                        <h1>Hi admin</h1>
                        <Button onClick={() => navigate("/admin")} text={"To admin page"}/>
                    </>
                :
                    <h1>Home, sweet home :)</h1>
            }
        </>
    )

}
