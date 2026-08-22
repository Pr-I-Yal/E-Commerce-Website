import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'

import { deleteWishlist, getWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"

export default function Wishlist() {
    let [data, setData] = useState([])
    let WishlistStateData = useSelector(state => state.WishlistStateData)
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
                dispatch(deleteWishlist({ id: id }))
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
        (() => {
            dispatch(getWishlist())
            if (WishlistStateData.length) {
                setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [WishlistStateData.length])

    return (
        data.length ?
            <div className='my-3'>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Brand</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => {
                                return <tr key={item.id}>
                                    <td>
                                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank'>
                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={70} width={100} alt="" />
                                        </Link>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div style={{ width: 100 }}>
                                            {item.color?.join(", ")}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ width: 100 }}>
                                            {item.size?.join(", ")}
                                        </div>
                                    </td>
                                    <td>{item.brand}</td>
                                    <td>{item.stockQuantity ? `${item.stockQuantity} Left in Stock` : "Out of Stock"}</td>
                                    <td>&#8377;{item.price}</td>
                                    <td><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='bi bi-cart-plus'></i></Link></td>
                                    <td><button className='btn btn-danger' onClick={() => deleteRecords(item.id)}><i className='bi bi-trash'></i></button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div> :
            <div className='card p-5 m-5'>
                <h4 className='text-center'>No Items in Wishlist</h4>
                <Link className='btn btn-primary' to="/shop">Shop Now</Link>
            </div>
    )
}
