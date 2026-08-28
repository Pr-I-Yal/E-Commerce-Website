import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"

export default function Orders() {
  let [data, setData] = useState([])

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length)
        setData(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
    })()
  }, [CheckoutStateData.length])

  return (
    <>
      {data.length ?
        <div className='my-3'>
          {data.map((item, index) => {
            return <div className="card p-3 mb-3">
              <div className="table-responsive">
                <h5>Order Details</h5>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Order Status</th>
                      <th>Payment Mode</th>
                      <th>Payment Status</th>
                      <th>Subtotal</th>
                      <th>Shipping</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377;{item.subtotal}</td>
                      <td>&#8377;{item.shipping}</td>
                      <td>&#8377;{item.total}</td>
                      <td>{new Date(item.date)?.toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>

                <h5>Products In This Order</h5>
                {item.products ?
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Brand</th>
                        <th>Sotck</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products?.map(x => {
                        return <tr key={x.id}>
                          <td>
                            <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.pic}`} target='_blank'>
                              <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${x.pic}`} height={70} width={100} alt="" />
                            </Link>
                          </td>
                          <td>{x.name}</td>
                          <td>
                            <div style={{ width: 100 }}>
                              {x.color}
                            </div>
                          </td>
                          <td>
                            <div style={{ width: 100 }}>
                              {x.size}
                            </div>
                          </td>
                          <td>{x.brand}</td>
                          <td>{x.stockQuantity ? `${x.stockQuantity} Left in Stock` : "Out Of Stock"}</td>
                          <td>&#8377;{x.price}</td>
                          <td>{x.quantity}</td>
                          <td>&#8377;{x.total}</td>
                          <td><Link className='btn btn-primary' to={`/product/${x.product}`}>Buy Again</Link></td>
                          <td>{item.orderStatus === "Delivered" ? <button className='btn btn-primary'>Write Review</button> : null}</td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                  : null}
              </div>
            </div>
          })}
        </div> :
        <div className='card p-5 m-5'>
          <h4 className='text-center'>No Order History Found</h4>
          <Link className='btn btn-primary' to="/shop">Shop Now</Link>
        </div>}
    </>
  )
}