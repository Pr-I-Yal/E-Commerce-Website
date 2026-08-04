import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import TextValidators from '../../../Validators/TextValidators'

import { createFeature, getFeature } from '../../../Redux/ActionCreators/FeatureActionCreators'

export default function AdminCreateFeaturePage() {
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name field is mandatory.",
        icon: "Icon field is mandatory.",
        shortDescription: "Short Description field is mandatory."
    })

    let [show, setShow] = useState(false)
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: name == "status" ? value === "1" ? true : false : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidators(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = FeatureStateData.find(x => x.shortDescription.toLocaleLowerCase() === data.shortDescription?.toLocaleLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Feature With This Name Already Exists" })
                setShow(true)
                return
            }
            dispatch(createFeature({ ...data }))
            navigate("/admin/feature")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData.length])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Create Feature
                            <Link to="/admin/feature">
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
                                        placeholder='Feature Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Short Description*</label>
                                    <textarea
                                        name="shortDescription"
                                        onChange={getInputData}
                                        rows={3}
                                        placeholder='Feature Short Description'
                                        className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-primary'}`}
                                    ></textarea>
                                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Icon*</label>
                                    <input type="text"
                                        name="icon"
                                        onChange={getInputData}
                                        placeholder="Icon Tag From Bootstrap like <i class='bi bi-list></i>"
                                        className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
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
