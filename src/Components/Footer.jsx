import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"

export default function Footer() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map1: import.meta.env.VITE_APP_MAP1,
        address: import.meta.env.VITE_APP_ADDRESS,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
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
            <div className="container-fluid bg-dark text-white-50 footer pt-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
                            <Link to="/" className="d-inline-block mb-3">
                                <h1 className="text-white">{settingData.siteName}</h1>
                            </Link>
                            <p className="mb-0 text-light">{settingData.siteName} is your trusted destination for quality products at unbeatable prices. We are committed to delivering a seamless shopping experience, exciting deals, and exceptional customer satisfaction with every purchase.</p>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn " data-wow-delay="0.3s">
                            <h5 className="text-white mb-4">Get In Touch</h5>
                            <Link to={settingData.map1} target='_blank' className='d-block text-light mb-2'><i className="fa fa-map-marker-alt me-3"></i>{settingData.address}</Link>
                            <Link to={`mailto:${settingData.email}`} target='_blank' className='d-block text-light mb-2'><i className="bi bi-envelope me-3"></i>{settingData.email}</Link>
                            <Link to={`tel:${settingData.phone}`} target='_blank' className='d-block text-light mb-2'><i className="bi bi-telephone me-3"></i>{settingData.phone}</Link>
                            <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' className='d-block text-light mb-2'><i className="bi bi-whatsapp me-3"></i>{settingData.whatsapp}</Link>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-square border-2 me-2" href={settingData.facebook} target='_blank'>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-outline-light btn-square border-2 me-2" href={settingData.twitter} target='_blank'>
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-outline-light btn-square border-2 me-2" href={settingData.youtube} target='_blank'>
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a className="btn btn-outline-light btn-square border-2 me-2" href={settingData.instagram} target='_blank'>
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a className="btn btn-outline-light btn-square border-2 me-2" href={settingData.linkedin} target='_blank'>
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
                            <h5 className="text-white mb-4">Quick Link</h5>
                            <Link className="btn btn-link text-light" to="">Home</Link>
                            <Link className="btn btn-link text-light" to="/about">About Us</Link>
                            <Link className="btn btn-link text-light" to="/shop">Shop</Link>
                            <Link className="btn btn-link text-light" to="/feature">Feature</Link>
                            <Link className="btn btn-link text-light" to="/faq">Faq</Link>

                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
                            <h5 className="text-white mb-4">Other Links</h5>
                            <Link className="btn btn-link text-light" to="/testimonial">Testimonial</Link>
                            <Link className="btn btn-link text-light" to="/contact">Contact Us</Link>
                            <Link className="btn btn-link text-light" to="/privacy-policy">Privacy Policy</Link>
                            <Link className="btn btn-link text-light" to="/tc">Terms and Conditions</Link>
                            <Link className="btn btn-link text-light" to="/refund-policy">Refund Policy</Link>
                        </div>
                    </div>
                </div>
                <div className="container wow fadeIn" data-wow-delay="0.1s">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <Link className="border-bottom" to='/'>{settingData.siteName}</Link>, All Right Reserved.
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <Link to="/">Home</Link>
                                    <Link to="/about">About</Link>
                                    <Link to="/feature">Features</Link>
                                    <Link to="/faq">FAQs</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
