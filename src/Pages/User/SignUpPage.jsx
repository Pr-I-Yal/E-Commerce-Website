import React, { useState } from 'react'
import TextValidators from '../../Validators/TextValidators'
import { Link, useNavigate } from 'react-router-dom'
import BreadCrum from '../../Components/BreadCrum'

export default function SignUpPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        username: "User Name Field is Mandatory",
        email: "Email Field is Mandatory",
        phone: "Phone Field is Mandatory",
        password: "Password Field is Mandatory",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            if (data.password !== data.cpassword) {
                setErrorMessage({ ...errorMessage, password: "Password And Confirm Password Doesn't Matched !" })
                setShow(true)
            } else {
                var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
                response = await response.json()
                let item = response.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase())
                if (item) {
                    setShow(true)
                    setErrorMessage({
                        ...errorMessage,
                        username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? "Username Already Taken" : "",
                        email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email Address Already Taken" : ""
                    })
                    return
                }

                //Remove Above Line In Case Of Real Backend
                var response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        status: true
                    })
                })
                response = await response.json()
                // if (response.result === "Fail") {
                //     setErrorMessage({ ...errorMessage, ...response.reason })
                //     setShow(true)
                //     return
                // }
                navigate("/login")
            }
        }
    }
    return (
        <>
            <BreadCrum title="Create Your Account" />

            <div className="container my-4">
                <div className="row">
                    <div className="col-xl-9 col-md-10 col-sm-11 m-auto">
                        <h5 className='bg-primary text-center text-light p-2'>Create Your Account</h5>
                        <form onSubmit={postData}>
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control
                                        ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone Number*</label>
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control
                                        ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Username*</label>
                                    <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control
                                        ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email Address*</label>
                                    <input type="text" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control
                                       ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control 
                                        ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control 
                                    ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />
                                </div>

                                <div className="col-12">
                                    <button type="submit" className='btn btn-primary w-100'>Sign Up</button>
                                </div>

                            </div>
                        </form>
                        <div>
                            <Link to="/login">Already Have An Account?Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
