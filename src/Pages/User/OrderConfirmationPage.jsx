import React from 'react'
import { Link } from 'react-router-dom'

import BreadCrum from '../../Components/BreadCrum'

export default function OrderConfirmationPage() {
    return (
        <>
            <BreadCrum title="Order Has Been Placed!" />
            <div className="container-fluid py-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="bi bi-bag-check display-1 text-primary"></i>
                            <h1 className="display-1">Thank You !</h1>
                            <h1 className="mb-4">Order Has Been Placed <i class="bi bi-emoji-laughing"></i></h1>
                            <p className="mb-4">Thank You for shopping with Us! Your Order has been successfully placed and is now being processed.
                                Sit back, relax and get ready to receive your purchase at your doorstep soon.</p>
                            <Link className="btn btn-primary py-3 px-4" to="/shop">Shop More</Link>
                            <Link className="btn btn-primary py-3 px-4" to="/profile?option=Orders">Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
