import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"


import Swal from 'sweetalert2'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'


import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"

export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteContactUs({ id: id }))
                setData(data.filter(x => x.id !== id))

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    function updateRecord(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You Can revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                let item = data.find(x => x.id === id)
                let index = data.findIndex(x => x.id === id)

                dispatch(updateContactUs({ ...item, status: !item.status }))
                data[index] = { ...item, status: !item.status }
                setData(data)
                setFlag(!flag)

                Swal.fire({
                    title: "Updated!",
                    text: "Your record has been updated.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                setData(ContactUsStateData)
                let time = setTimeout(() => {
                    new DataTable('#myTable');
                }, 500)
                return time
            }
        })()
        return () => clearTimeout(time)
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>ContactUs</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.subject}</td>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                            <td onClick={() => updateRecord(item.id)} style={{ cursor: "pointer" }}>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                                            <td>{item.status ? null : <button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button>}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}