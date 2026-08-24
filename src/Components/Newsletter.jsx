import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNewsletter, getNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators"

export default function Newsletter() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME
    })

    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    function postData() {
        if (email === "" || !email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) {
            setMessage("Please Enter a valid Gmail Address");
        }
        else {
            let item = NewsletterStateData.find(x => x.email === email)
            if (item)
                setMessage("This Email Address is Already Registered With")
            else {
                dispatch(createNewsletter({
                    email: email,
                    status: true
                }))
                setMessage("Thanks To subscribe Our Newsletter Service")
                setEmail("")
            }
        }
    }

    useEffect(() => {
        (() => dispatch(getNewsletter()))()
    }, [NewsletterStateData.length])

    return (
        <>
            <div className="container-fluid bg-primary newsletter p-0">
                <div className="container p-0">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-5 ps-lg-0 text-start wow fadeIn" data-wow-delay="0.2s">
                            <img className="img-fluid w-100" src="/Images/shop8.jpg" alt="" />
                        </div>
                        <div className="col-md-7 py-5 newsletter-text wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-5">
                                <h1 className="mb-5">Subscribe the <span
                                    className="text-uppercase text-primary bg-white px-2">Newsletter</span></h1>
                                <div className="position-relative w-100 mb-2">
                                    <input className="form-control border-0 w-100 ps-4 pe-5" type="text"
                                        placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} value={email} style={{ height: "60px;" }} />
                                    <button type="button" onClick={postData} className="btn shadow-none position-absolute top-0 end-0 mt-2 me-2"><i
                                        className="fa fa-paper-plane text-primary fs-4"></i></button>
                                </div>
                                {message ? <p>{message}</p> : null}
                                <p className="mb-0">Subscribe to our newsletter and stay updated with the latest deals, exclusive offers, and new arrivals. Join the {settingData.siteName} community and never miss an opportunity to save on your favorite products.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
