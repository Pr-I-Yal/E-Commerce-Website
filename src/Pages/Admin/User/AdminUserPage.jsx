import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"

import Swal from 'sweetalert2'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getUser, deleteUser } from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUserPage() {
    let [data, setData] = useState([])

    let UserStateData = useSelector(state => state.UserStateData)
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
                dispatch(deleteUser({ id: id }))
                setData(data.filter(x => x.id !== id))

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        let time = (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                setData(UserStateData)
                let time = setTimeout(() => {
                    new DataTable('#myTable');
                }, 500)
                return time
            }
        })()
        return () => clearTimeout(time)
    }, [UserStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>User
                            <Link to="/admin/user/create">
                                <i className='bi bi-plus text-light float-end'></i>
                            </Link>
                        </h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
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
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.role}</td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/user/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                                            <td><button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button></td>
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