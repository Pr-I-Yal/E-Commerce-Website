import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"

export default function Service() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        phone: import.meta.env.VITE_APP_PHONE
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
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                            <h1 className="mb-5">Our <span
                                className="text-uppercase text-primary bg-light px-2">Services</span></h1>
                            <p className='text-justify'>At {settingData.siteName}, we are committed to providing a smooth and convenient online shopping experience. From browsing products and placing orders to secure payments and doorstep delivery, every service is designed with simplicity and customer satisfaction in mind. We focus on offering reliable products, competitive prices, and dependable support throughout your shopping journey.</p>
                            <p className="text-justify mb-5">Our services include convenient shopping, secure checkout, quick order processing, reliable delivery, and hassle-free customer assistance. Whether you need help choosing a product or tracking an order, {settingData.siteName} is here to make your online shopping experience better.</p>
                            <div className="d-flex align-items-center bg-light">
                                <div className="btn-square flex-shrink-0 bg-primary" style={{ width: "100px", height: "100px" }}>
                                    <i className="fa fa-phone fa-2x text-white"></i>
                                </div>
                                <div className="px-3">
                                    <h3><a href={`tel:${settingData.phone}`}>{settingData.phone}</a></h3>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row g-0">
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.2s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-primary">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/Images/Banner7.jpg" alt="" />
                                            <h3>Product Shopping</h3>
                                        </a>
                                        <p className="mb-0">Explore a wide range of quality products across different categories, making it easy to find everything you need in one convenient place.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.4s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-light">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/Images/Banner6.jpg" alt="" />
                                            <h3>Secure Payment</h3>
                                        </a>
                                        <p className="mb-0">Enjoy safe and reliable transactions with secure payment options designed to protect your personal and financial information during checkout.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.6s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-light">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/Images/Banner8.jpg" alt="" />
                                            <h3>Fast Delivery</h3>
                                        </a>
                                        <p className="mb-0">Get your orders delivered safely to your doorstep with efficient order processing and reliable delivery services for a convenient shopping experience.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 wow fadeIn" data-wow-delay="0.8s">
                                    <div className="service-item h-100 d-flex flex-column justify-content-center bg-primary">
                                        <a href="#!" className="service-img position-relative mb-4">
                                            <img className="img-fluid w-100" src="/Images/Banner4.jpg" alt="" />
                                            <h3>  Customer Support  </h3>
                                        </a>
                                        <p className="mb-0">Our dedicated support team is ready to assist with product queries, orders, payments, returns, and other concerns whenever you need help.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
