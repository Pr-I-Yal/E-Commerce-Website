import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"

export default function About() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
        instagram: import.meta.env.VITE_APP_INSTAGRAM
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = {}
                Object.keys(settingData).forEach(key => {
                    item[key] = SettingStateData[0][key] ? SettingStateData[0][key] : settingData[key]
                })
                setSettingData({ ...item })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-6 wow fadeIn" style={{ height: 500 }} data-wow-delay="0.1s">
                                    <img className="img-fluid h-100" src="/Images/Banner7.jpg" alt="" />
                                </div>
                                <div className="col-6 wow fadeIn" data-wow-delay="0.3s">
                                    <img className="img-fluid h-75" src="/Images/Banner4.jpg" alt="" />
                                    <div className="h-25 d-flex align-items-center text-center bg-primary px-4">
                                        <h4 className="text-white lh-base mb-0">Deliver Best Deals Since 2020</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="mb-5"><span className="text-uppercase text-primary bg-light px-2">Our</span> History</h1>
                            <p className="mb-4">At {settingData.siteName} , we believe online shopping should be simple, reliable, and rewarding. Our mission is to bring you a carefully curated selection of quality products at competitive prices, backed by secure payments, fast delivery, and exceptional customer service. Our goal is to make quality and value accessible to everyone.</p>
                            <p className="mb-5">Customer satisfaction is at the heart of everything we do. With trusted brands, exciting deals, and a user-friendly shopping experience, {settingData.siteName} is your destination for quality products and unbeatable value.</p>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>100% Genuine Products</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Top Brands</h6>
                                </div>
                                <div className="col-sm-6">
                                    <h6 className="mb-3"><i className="fa fa-check text-primary me-2"></i>24/7 Support</h6>
                                    <h6 className="mb-0"><i className="fa fa-check text-primary me-2"></i>Best Deals</h6>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-5">
                                <a className="btn btn-outline-primary btn-square border-2 me-2" href={settingData.facebook} target='_blank'>
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" href={settingData.twitter} target='_blank'>
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" href={settingData.linkedin} target='_blank'>
                                    <i className="bi bi-linkedin"></i>
                                </a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" href={settingData.youtube} target='_blank'>
                                    <i className="bi bi-youtube"></i>
                                </a>
                                <a className="btn btn-outline-primary btn-square border-2 me-2" href={settingData.instagram} target='_blank'>
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
