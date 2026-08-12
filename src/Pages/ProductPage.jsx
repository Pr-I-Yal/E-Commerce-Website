import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrum from '../Components/BreadCrum'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import ProductSlider from '../Components/ProductSlider'

export default function ProductPage() {
    let { id } = useParams()
    let [selected, setSelected] = useState({
        color: '',
        size: '',
        quantity: '1'
    })

    let [data, setData] = useState({})
    let [relatedData, setRelatedData] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setSelected({ ...selected, color: item.color[0], size: item.size[0] })
                    setRelatedData(ProductStateData.filter(x => x.status && x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])
    return (
        <>
            <BreadCrum title={data.name ?? "Product"} />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>{data.name}</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Maincategory</th>
                                        <td>{data.maincategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Subcategory</th>
                                        <td>{data.subcategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Brand</th>
                                        <td>{data.brand}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td><del className='text-danger'>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup className='text-warning'>{data.discount}% Off</sup></td>
                                    </tr>
                                    <tr>
                                        <th>Stock</th>
                                        <td>{data.stock ? `${data.stockQuantity} Left In Stock` : 'Out Of Stock'}</td>
                                    </tr>
                                    <tr>
                                        <th>Color</th>
                                        <td>
                                            <div className="btn-group">
                                                {data.color?.map((item, index) => {
                                                    return <button key={index}
                                                        onClick={() => setSelected({ ...selected, color: item })}
                                                        className={`btn ${selected.color === item ? 'btn-primary' : ''}`}>{item}</button>
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>
                                            <div className="btn-group">
                                                {data.size?.map((item, index) => {
                                                    return <button key={index}
                                                        onClick={() => setSelected({ ...selected, size: item })}
                                                        className={`btn ${selected.size === item ? 'btn-primary' : ''}`}>{item}</button>
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary'
                                                            onClick={() => selected.quantity === 1 ? null : setSelected({ ...selected, quantity: selected.quantity - 1 })}>
                                                            <i className='bi bi-dash'></i>
                                                        </button>
                                                        <h4 className='text-center' style={{ width: "40%" }}>{selected.quantity}</h4>
                                                        <button className='btn btn-primary'
                                                            onClick={() => selected.quantity === data.stockQuantity ? null : setSelected({ ...selected, quantity: selected.quantity + 1 })}>
                                                            <i className='bi bi-plus'></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="btn-group w-100">
                                                        <button className='btn btn-primary'><i className='bi bi-cart-plus me-2'></i>Add To Cart</button>
                                                        <button className='btn btn-success'><i className='bi bi-suit-heart me-2'></i>Wishlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>
                                            <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {relatedData ? <ProductSlider title="Other Related Products" data={relatedData} /> : null}

            </div>
        </>
    )
}
