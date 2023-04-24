import React from 'react'
import AdminHeader from "../../../modules/AdminHeader"
import HorizontalAdminMenu from "../../../modules/HorizontalAdminMenu"
import VerticalAdminMenu from "../../../modules/VerticalAdminMenu"


export default function AdminPage() {

        return (
            <div>
                <AdminHeader />
                <HorizontalAdminMenu />              
                <VerticalAdminMenu />                            
            </div>
        )
}
