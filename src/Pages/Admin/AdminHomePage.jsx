import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import Profile from '../../Components/User/Profile'

export default function AdminHomePage() {
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Admin</h5>
                        <Profile />
                    </div>
                </div>
            </div>
        </>
    )
}
