import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import TextValidators from '../../../Validators/TextValidators'

import { createMaincategory, getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'

export default function AdminCreateMaincategoryPage() {
    let [data, setData] = useState({
        name: "",
        pic: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "This field is mandatory.",
        pic: "This field is mandatory."
    })

    let [show, setShow] = useState(false)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? "maincategory/" + e.target.files[0].name : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
        // let value = name === "pic" ?  e.target.files[0]: name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
        //OR
        let value = ""
        if (name === "pic") {
            value = "maincategory/" + e.target.files[0].name
            // value = e.target.files[0]
        }
        else if (name === "status")
            value = e.target.value === "1" ? true : false
        else
            value = e.target.value

        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidators(e) : TextValidators(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = MaincategoryStateData.find(x => x.name.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Maincategory With This Name Already Exists" })
                setShow(true)
                return
            }
            dispatch(createMaincategory({ ...data }))

            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("pic", data.pic)
            // formData.append("status", data.status)
            // dispatch(createMaincategory(formData))

            navigate("/admin/maincategory")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Create Maincategory
                            <Link to="/admin/maincategory">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text"
                                        name="name"
                                        onChange={getInputData}
                                        placeholder='Maincategory Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file"
                                        name="pic"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
