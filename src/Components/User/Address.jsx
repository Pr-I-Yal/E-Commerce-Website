import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'

const dataOptions = {
    name: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: ""
}
export default function Address() {
    let [user, setUser] = useState()

    let [data, setData] = useState({ ...dataOptions })
    let [option, setOption] = useState({})

    function create() {
        setOption({
            type: "Create",
            showModale: true
        })
    }

    function deleteRecord(index) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let address = user.address
                address.splice(index, 1)
                user.address = address
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...user, address: address })
                })
                setUser({ ...user })
                toast("Address Record Has Been Deleted!!!");

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    function update(index) {
        setOption({
            type: "Update",
            showModale: true,
            index: index
        })
        setData({ ...user.address[index] })
    }

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()
        let address = user.address ?? []
        if (option.type === "Create")
            address.push({ ...data })
        else {
            address[option.index] = { ...data }
        }
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...user, address: address })
        })
        setUser({ ...user, address: address })
        setOption({ ...option, showModale: false })
        setData({ ...dataOptions })
        toast("Address Record Has Been Updated!!!");
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setUser(response)
        })()
    }, [])
    return (
        <>
            <ToastContainer />
            <div className=''>
                <div className='float-end'>
                    <button className='btn btn-primary' onClick={create}>Add New Address</button>
                </div>
                <div className='mt-5' style={{ clear: "both" }}>
                    {
                        user?.address?.map((item, index) => {
                            return <div className="card px-3 py-2" key={index}>
                                <h5>{item.name}</h5>
                                <p>{item.phone},{item.email}</p>
                                <p>{item.address}</p>
                                <p>{item.pin},{item.city},{item.state}</p>
                                <div className="btn-group position-absolute end-0">
                                    <button className='btn btn-primary' onClick={() => update(index)}><i className='bi bi-pencil-square'></i></button>
                                    <button className='btn btn-danger' onClick={() => deleteRecord(index)}><i className='bi bi-trash'></i></button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={`modal fade ${option.showModale ? 'show d-block' : 'd-none'}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{option.type}</h1>
                            <button type="button" className="btn-close" onClick={() => setOption({ ...option, showModale: false })}></button>
                        </div>
                        <form onSubmit={postData}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Name*</label>
                                        <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className='form-control' required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Email Address*</label>
                                        <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className='form-control' required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Phone Number*</label>
                                        <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className='form-control' required />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Address*</label>
                                        <textarea type="text" name="address" value={data.address} onChange={getInputData} placeholder='Address' className='form-control' required ></textarea>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>Pin Code*</label>
                                        <input type="text" name="pin" value={data.pin} onChange={getInputData} placeholder='Pin Code' className='form-control' required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>City Name*</label>
                                        <input type="text" name="city" value={data.city} onChange={getInputData} placeholder='City Name' className='form-control' required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label>State Name*</label>
                                        <input type="text" name="state" value={data.state} onChange={getInputData} placeholder='State Name' className='form-control' required />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary w-100">{option.type}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}