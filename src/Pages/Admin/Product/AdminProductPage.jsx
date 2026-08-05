import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.min.css"

import Swal from 'sweetalert2'

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreators"

export default function AdminProductPage() {
    let [data, setData] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteRecords(id) {
        // if (window.confirm("Are you sure to delete the Record?")) {
        // }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct({ id: id }))
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
            dispatch(getProduct())
            if (ProductStateData.length) {
                setData(ProductStateData)
                let time = setTimeout(() => {
                    new DataTable('#myTable');
                }, 500)
                return time
            }
        })()
        return () => clearTimeout(time)
    }, [ProductStateData.length])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Product
                            <Link to="/admin/product/create">
                                <i className='bi bi-plus text-light float-end'></i>
                            </Link>
                        </h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Maincategory</th>
                                        <th>Subcategory</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Base Price</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
                                        <th>Stock</th>
                                        <th>Stock Quantity</th>
                                        <th>Pic</th>
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
                                            <td>{item.maincategory}</td>
                                            <td>{item.subcategory}</td>
                                            <td>{item.brand}</td>
                                            <td><div style={{ width: 200 }}>{item.color?.join(", ")}</div></td>
                                            <td><div style={{ width: 150 }}>{item.size?.join(", ")}</div></td>
                                            <td>&#8377;{item.basePrice}</td>
                                            <td>{item.discount}% Off</td>
                                            <td>&#8377;{item.finalPrice}</td>
                                            <td>{item.stock ? "In Stock" : "Out of Stock"}</td>
                                            <td>{item.stockQuantity}</td>
                                            <td>
                                                <div style={{ width: 350 }}>
                                                    {item.pic?.map((pic, index) => {
                                                        return <Link key={index} to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${pic}`} target='_blank'>
                                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${pic}`} className='m-1' height={70} width={70} alt="" />
                                                        </Link>
                                                    })}
                                                </div>
                                            </td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/product/update/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                                            <td><button onClick={() => deleteRecords(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button></td>
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
