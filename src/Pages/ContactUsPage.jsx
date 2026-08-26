import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import TextValidators from '../Validators/TextValidators'

import BreadCrum from '../Components/BreadCrum'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"

const dataOptions = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
}

const errorMessageOptions = {
    name: "Name Field is Mandatory",
    email: "Email Address Field is Mandatory",
    phone: "Phone Number Field is Mandatory",
    subject: "Subject Field is Mandatory",
    message: "Message Field is Mandatory"
}

export default function ContactUsPage() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        map1: import.meta.env.VITE_APP_MAP1,
        map2: import.meta.env.VITE_APP_MAP2,
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

    let [data, setData] = useState({ ...dataOptions })
    let [errorMessage, setErrorMessage] = useState({ ...errorMessageOptions })
    let [show, setShow] = useState(false)
    let [showSuccessMessage, setShowSuccessMessage] = useState(false)

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            dispatch(createContactUs({
                ...data,
                date: new Date(),
                status: true
            }))
            setShowSuccessMessage(true)
            setData({ ...dataOptions })
            setErrorMessage({ ...errorMessage })
            setShow(false)
        }
    }
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
            <BreadCrum title="Contact Us" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card p-4 mb-4">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-geo-alt fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Address</h4>
                                        <a href={settingData.map1} target='_blank'>{settingData.address}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-envelope fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <a href={`mailto:${settingData.map1}`} target='_blank'>{settingData.email}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-telephone fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>Customer Service</h4>
                                        <a href={`tel:${settingData.phone}`} target='_blank'>{settingData.phone}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4">
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <i className='bi bi-geo-alt fs-1'></i>
                                    </div>
                                    <div>
                                        <h4>WhatsApp</h4>
                                        <a href={`https://wa.me/${settingData.whatsapp}`} target='_blank'>{settingData.whatsapp}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-4 mb-4">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className="d-flex pt-2">
                                        <a className="btn btn-outline-dark btn-square border-2 me-2" href={settingData.facebook} target='_blank'>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-square border-2 me-2" href={settingData.twitter} target='_blank'>
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-square border-2 me-2" href={settingData.youtube} target='_blank'>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-square border-2 me-2" href={settingData.instagram} target='_blank'>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-square border-2 me-2" href={settingData.linkedin} target='_blank'>
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-center wow fadeIn" data-wow-delay="0.1s">
                                <h1 className="mb-5">Have Any Query? <span className="text-uppercase text-primary bg-light px-2">Contact
                                    Us</span></h1>
                            </div>
                            <p className="text-center mb-4">{showSuccessMessage ? `Thank you for contacting ${settingData.siteName}! Your message has been successfully submitted.
                             Our support team has received you request and will review it carefully. We'll get back to you as soon as possible.
                              We appreciate your time and look forward to assissting you.` : `Have a question or need assistance?
                               Our ${settingData.siteName} support team is here to help. Whether you need help with an order, product, payment, delivery, return, or any other concern,
                                feel free to reach out. We're always happy to assist you.`}</p>
                            <div className="wow fadeIn" data-wow-delay="0.3s">
                                <form onSubmit={postData}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} name="name" value={data.name} onChange={getInputData} placeholder="Your Name" />
                                                <label>Your Name</label>
                                            </div>
                                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`} name="email" value={data.email} onChange={getInputData} placeholder="Your Email Address" />
                                                <label>Your Email Address</label>
                                            </div>
                                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} name="phone" value={data.phone} onChange={getInputData} placeholder="Your Phone Number" />
                                                <label>Your Phone Number</label>
                                            </div>
                                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className={`form-control ${show && errorMessage.subject ? 'border-danger' : ''}`} name="subject" value={data.subject} onChange={getInputData} placeholder="Subject" />
                                                <label>Subject</label>
                                            </div>
                                            {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className={`form-control ${show && errorMessage.message ? 'border-danger' : ''}`} name="message" value={data.message} onChange={getInputData} placeholder="Leave a message here"
                                                    style={{ height: "150px" }}></textarea>
                                                <label for="message">Message</label>
                                            </div>
                                            {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
