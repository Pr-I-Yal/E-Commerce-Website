import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import TextValidators from '../../../Validators/TextValidators'

import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUpdateUserPage() {
    let { id } = useParams()

    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin"
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
    })

    let [show, setShow] = useState(false)

    let UserStateData = useSelector(state => state.UserStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target

        setData({
            ...data,
            [name]: name == "status"
                ? value === "1"
                    ? true
                    : false
                : value
        })
        setErrorMessage({
            ...errorMessage,
            [name]: TextValidators(e)
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            // Check whether username or email already exists
            // Exclude the current user using id
            let item = UserStateData.find(
                x =>
                    String(x.id) !== String(id) &&
                    (
                        x.username.toLowerCase() === data.username.toLowerCase() ||
                        x.email.toLowerCase() === data.email.toLowerCase()
                    )
            )

            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    username:
                        item.username.toLowerCase() === data.username.toLowerCase()
                            ? "Username Already Taken"
                            : "",
                    email:
                        item.email.toLowerCase() === data.email.toLowerCase()
                            ? "Email Address Already Taken"
                            : "",
                })
                return
            }
            // Update user
            dispatch(updateUser({
                ...data,
                id: id
            }))
            navigate("/admin/user")
        }
    }

    // Get users
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    // Find user according to URL id
    useEffect(() => {
        if (UserStateData.length) {
            let item = UserStateData.find(
                x => String(x.id) === String(id)
            )
            if (item) {
                setData({
                    ...item
                })
            }
            else {
                navigate("/admin/user")
            }
        }
    }, [UserStateData, id, navigate])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>

                    <div className="col-lg-9">

                        <h5 className='bg-primary p-2 text-light text-center'>
                            Update User

                            <Link to="/admin/user">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>

                        </h5>


                        <form onSubmit={postData}>

                            <div className="row">


                                {/* Name */}

                                <div className="col-md-6 mb-3">

                                    <label>Name*</label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={getInputData}
                                        placeholder='User Name'
                                        className={`form-control ${show && errorMessage.name
                                                ? 'border-danger'
                                                : 'border-primary'
                                            }`}
                                    />

                                    {show && errorMessage.name
                                        ? <p className='text-danger'>
                                            {errorMessage.name}
                                        </p>
                                        : null}

                                </div>


                                {/* Phone */}

                                <div className="col-md-6 mb-3">

                                    <label>Phone Number*</label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        onChange={getInputData}
                                        placeholder='Phone Number'
                                        className={`form-control ${show && errorMessage.phone
                                                ? 'border-danger'
                                                : 'border-primary'
                                            }`}
                                    />

                                    {show && errorMessage.phone
                                        ? <p className='text-danger'>
                                            {errorMessage.phone}
                                        </p>
                                        : null}

                                </div>


                                {/* Username */}

                                <div className="col-md-6 mb-3">

                                    <label>Username*</label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={getInputData}
                                        placeholder='Username'
                                        className={`form-control ${show && errorMessage.username
                                                ? 'border-danger'
                                                : 'border-primary'
                                            }`}
                                    />

                                    {show && errorMessage.username
                                        ? <p className='text-danger'>
                                            {errorMessage.username}
                                        </p>
                                        : null}

                                </div>


                                {/* Email */}

                                <div className="col-md-6 mb-3">

                                    <label>Email Address*</label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={getInputData}
                                        placeholder='Email Address'
                                        className={`form-control ${show && errorMessage.email
                                                ? 'border-danger'
                                                : 'border-primary'
                                            }`}
                                    />

                                    {show && errorMessage.email
                                        ? <p className='text-danger'>
                                            {errorMessage.email}
                                        </p>
                                        : null}

                                </div>


                                {/* Role */}

                                <div className="col-lg-6 mb-3">

                                    <label>Role*</label>

                                    <select
                                        name="role"
                                        onChange={getInputData}
                                        value={data.role}
                                        className='form-select border-primary'
                                    >

                                        <option>Admin</option>
                                        <option>Super Admin</option>

                                    </select>

                                </div>


                                {/* Status */}

                                <div className="col-lg-6 mb-3">

                                    <label>Status*</label>

                                    <select
                                        name="status"
                                        value={data.status ? "1" : "0"}
                                        onChange={getInputData}
                                        className='form-select border-primary'
                                    >

                                        <option value="1">
                                            Active
                                        </option>

                                        <option value="0">
                                            Inactive
                                        </option>

                                    </select>

                                </div>


                                {/* Update Button */}

                                <div className="col-12 mb-3">

                                    <button className='btn btn-primary w-100'>
                                        Update
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}