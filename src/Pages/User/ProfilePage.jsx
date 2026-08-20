import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import BreadCrum from '../../Components/BreadCrum'

import Profile from '../../Components/User/Profile'
import UpdateProfile from '../../Components/User/UpdateProfile'
import Wishlist from '../../Components/User/Wishlist'
import Orders from '../../Components/User/Orders'
import Address from '../../Components/User/Address'

export default function ProfilePage() {
    let [searchParams, setSearchParams] = useSearchParams()
    let [option, setOption] = useState("Profile")

    useEffect(() => {
        (() => {
            setOption(searchParams.get("option" || "Profile"))
        })()
    }, [searchParams])
    return (
        <>
            <BreadCrum title="Your Profile" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className={`list-group-item ${option === "Profile" ? 'active' : ''}`} onClick={() => setSearchParams({ option: "Profile" })}>Profile</li>
                            <li className={`list-group-item ${option === "Update Profile" ? 'active' : ''}`} onClick={() => setSearchParams({ option: "Update Profile" })}>Update Profile</li>
                            <li className={`list-group-item ${option === "Wishlist" ? 'active' : ''}`} onClick={() => setSearchParams({ option: "Wishlist" })}>Wishlist</li>
                            <li className={`list-group-item ${option === "Orders" ? 'active' : ''}`} onClick={() => setSearchParams({ option: "Orders" })}>Orders</li>
                            <li className={`list-group-item ${option === "Address" ? 'active' : ''}`} onClick={() => setSearchParams({ option: "Address" })}>Address</li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>{option}</h5>
                        <div className={option === "Profile" ? 'd-block' : 'd-none'}><Profile option={option} /></div>
                        <div className={option === "Update Profile" ? 'd-block' : 'd-none'}><UpdateProfile setSearchParams={setSearchParams} /></div>
                        <div className={option === "Wishlist" ? 'd-block' : 'd-none'}><Wishlist /></div>
                        <div className={option === "Orders" ? 'd-block' : 'd-none'}><Orders /></div>
                        <div className={option === "Address" ? 'd-block' : 'd-none'}><Address /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
