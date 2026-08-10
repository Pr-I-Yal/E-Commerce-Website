import React, { useEffect, useState } from 'react'
import BreadCrum from '../Components/BreadCrum'

import { useDispatch, useSelector } from 'react-redux'

import SingleProduct from '../Components/SingleProduct'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"

export default function ShopPage() {
    let [data, setData] = useState([])

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getSubcategory()))()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                setData(ProductStateData.filter(x => x.status))
            }
        })()
    }, [ProductStateData.length])

    return (
        <>
            <BreadCrum title="Shop" />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <div className="row">
                            {data.map(item => {
                                return <div key={item.id} className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                                    <SingleProduct item={item} />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
