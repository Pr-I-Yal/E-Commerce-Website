import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleProduct({ item }) {
    return (
        <div className="team-item position-relative overflow-hidden">
            <img className="img-fluid w-100" src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} style={{ height: 350 }} alt="" />
            <div className="team-overlay">
                <small className="mb-2">{item.brand}</small>
                <h6 className="lh-base text-light">{item.name}</h6>
                <h5 className='text-light'><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice}<sup>{item.discount}% Off</sup></h5>
                <div className="d-flex justify-content-center">
                    <Link className="btn btn-outline-light btn-sm-square border-2 p-2 w-100" to={`product/${item.id}`}>
                        <i className="text-success bi bi-cart-plus"></i>
                        <span className='ms-2'>Add to Cart</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
