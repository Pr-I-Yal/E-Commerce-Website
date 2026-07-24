import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import TextValidators from '../../../Validators/TextValidators'

export default function AdminUpdateMaincategoryPage() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })

    let [show, setShow] = useState(false)
    let [ProductStateData, setProductStateData] = useState([])

    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? "maincategory/" + e.target.files[0].name : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
        //OR
        let value = ""
        if (name === "pic")
            value = "maincategory/" + e.target.files[0].name
        else if (name === "status")
            value = e.target.value === "1" ? true : false
        else
            value = e.target.value

        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidators(e) : TextValidators(e) })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let item = ProductStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setErrorMessage({ ...errorMessage, name: "Maincategory With This Name Already Exists" })
                setShow(true)
                returnF
            }
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            if (response)
                navigate("/admin/maincategory")
            else
                alert("Internal Server Error")
        }
    }

    useState(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/maincategory`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find(x => x.id === id)
            if (item)
                setData({ ...data, ...item })
            else
                navigate("/admin/maincategory")

            setProductStateData(response)
        })()
    }, [])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Update Maincategory
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
                                        value={data.name}
                                        onChange={getInputData}
                                        placeholder='Maincategory Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file"
                                        name="pic"
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status"
                                        value={data.status ? "1" : "0"}
                                        onChange={getInputData}
                                        className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
