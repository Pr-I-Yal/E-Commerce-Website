import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../../Components/BreadCrum'

import { deleteCart, getCart } from "../../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreators"

export default function CheckoutPage() {
    let [address, setAddress] = useState([])

    let [data, setData] = useState([])
    let [total, setTotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [subtotal, setSubtotal] = useState(0)

    let [selected, setSelected] = useState({
        deliveryAddress: {},
        paymentMode: "COD"
    })

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function calculate(cart) {
        let total = 0
        cart.forEach(x => total += x.total)
        if (total > 0 && total < 1000) {
            setShipping(150)
            setTotal(total + 150)
        }
        else {
            setShipping(0)
            setTotal(total)
        }
        setSubtotal(total)
    }

    function placeorder() {
        let item = {
            user: localStorage.getItem("userid"),
            deliveryAddress: selected.deliveryAddress,
            orderStatus: "Order Has Been Placed",
            paymentMode: selected.paymentMode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: data
        }
        dispatch(createCheckout(item))
        data.forEach(x => {
            let p = ProductStateData.find(p => p.id === x.product)
            p.stockQuantity = p.stockQuantity - x.quantity
            p.stock = p.stockQuantity === 0 ? false : true
            dispatch(updateProduct(p))
            dispatch(deleteCart({ id: x.id }))
        })
        navigate("/order-confirmation")
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setData(cart)
                calculate(cart)
            }
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setAddress(response.address ?? [])
            if (response.address?.length)
                setSelected({ ...selected, deliveryAddress: { ...response.address[0] } })
        })()
    }, [ProductStateData.length])

    return (
        <>
            <Breadcrum title="Place Order" />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className='text-center p-2 bg-primary text-light'>Delivery Address</h5>
                        {address.length ?
                            address.map((item, index) => {
                                return <div className="card px-3 py-2 mb-3" key={index} onClick={() => setSelected({ ...selected, deliveryAddress: { ...item } })}>
                                    <h5>{item.name}</h5>
                                    <p>{item.phone},{item.email}</p>
                                    <p>{item.address}</p>
                                    <p>{item.pin},{item.city},{item.state}</p>
                                    {selected.deliveryAddress?.address === item.address ? <i className='bi bi-check fs-3 position-absolute end-0 p-2'></i> : null}
                                </div>
                            })
                            :
                            <div className='card p-5 text-center'>
                                <h4>No Address Record Found</h4>
                                <Link to="/profile?option=Address" className="btn btn-primary">Create Address</Link>
                            </div>}
                    </div>
                    <div className="col-md-6">
                        <h5 className='text-center p-2 bg-primary text-light'>Products in Cart</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>&#8377;{item.total}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <table className='table table-bordered mt-4'>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>
                                            <select name="mode" onChange={(e) => setSelected({ ...selected, paymentMode: e.target.value })} className='form-select'>
                                                <option value="COD">COD</option>
                                                <option value="Net Banking">Net Banking/Card/UPI</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {address.length ? <tr>
                                        <td colSpan={2}>
                                            <button className='btn btn-primary w-100' onClick={placeorder}>Place Order</button>
                                        </td>
                                    </tr> : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}