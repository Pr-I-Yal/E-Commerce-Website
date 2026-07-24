import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
    return (
        <div class="list-group">
            <Link to="/admin" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-house fs-5'></i>
                <span className='float-end'>Home</span>
            </Link>
            <Link to="/admin/maincategory" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-list fs-5'></i>
                <span className='float-end'>Maincategory</span>
            </Link>
            <Link to="/admin/subcategory" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-list-ul fs-5'></i>
                <span className='float-end'>Subcategory</span>
            </Link>
            <Link to="/admin/brand" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-tag fs-5'></i>
                <span className='float-end'>Brand</span>
            </Link>
            <Link to="/admin/product" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-list-check fs-5'></i>
                <span className='float-end'>Product</span>
            </Link>
            <Link to="/admin/feature" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-check-circle fs-5'></i>
                <span className='float-end'>Feature</span>
            </Link>
            <Link to="/admin/faq" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-question-circle fs-5'></i>
                <span className='float-end'>FAQ</span>
            </Link>
            <Link to="/admin/setting" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-gear fs-5'></i>
                <span className='float-end'>Setting</span>
            </Link>
            <Link to="/admin/newsletter" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-envelope fs-5'></i>
                <span className='float-end'>Newsletter</span>
            </Link>
            <Link to="/admin/contact" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-telephone fs-5'></i>
                <span className='float-end'>Contact Us</span>
            </Link>
            <Link to="/admin/checkout" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-cart-check fs-5'></i>
                <span className='float-end'>Checkout</span>
            </Link>
            <Link to="/admin/user" class="list-group-item list-group-item-action active mb-1">
                <i className='bi bi-people fs-5'></i>
                <span className='float-end'>User</span>
            </Link>
        </div>
    )
}
