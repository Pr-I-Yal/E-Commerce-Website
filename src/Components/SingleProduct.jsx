import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ item }) {
    return (
        <div className="team-item position-relative overflow-hidden">
            <img className="img-fluid w-100" src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 350 }} alt="" />
            <div className="team-overlay">
                <div className="position-absolute bottom-0 start-0 m-3 d-flex">
                    <small className="px-2 py-2 bg-success text-light">{item.brand}</small>
                    <small className="px-2 py-2 bg-success text-light">{item.stockQuantity} Left in Stock</small>
                </div>
                <h6 className="position-absolute top-0 start-0 m-3 px-2 py-1 text-light bg-dark bg-opacity-75 rounded">{item.name}</h6>
                <div className="position-absolute bottom-0 start-0 mb-5 ms-3">
                    <h5 className='text-light mb-2'>
                        <del>&#8377;{item.basePrice}</del>
                        <span className="ms-2">&#8377;{item.finalPrice}</span>
                        <sup className="ms-2 text-warning">{item.discount}% Off</sup>
                    </h5>
                </div>
                <div className="position-absolute bottom-0 end-0 m-3">
                    <Link className="btn btn-outline-light border-2 px-2 py-1" to={`/product/${item.id}`}>
                        <i className="text-success bi bi-cart-plus"></i>
                        <span className='ms-1'>Add to Cart</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
