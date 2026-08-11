import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BreadCrum from '../Components/BreadCrum'
import SingleProduct from '../Components/SingleProduct'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"

const colors = ["Black", "White", "Blue", "Red", "Orange", "Gray", "Green", "Pink", "Yellow", "Purple", "Magenta", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

export default function ShopPage() {
    let [data, setData] = useState([])

    let [selected, setSelected] = useState({
        maincategory: [],
        subcategory: [],
        brand: [],
        color: [],
        size: []
    })

    let [sortFilter, setSortFilter] = useState("1")
    let [search, setSearch] = useState("")

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    function getInput(key, value) {
        let arr = selected[key]
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setSelected({ ...selected, [key]: arr })
        filter({ ...selected, [key]: arr })
    }

    function filter(selected) {
        let data = ProductStateData.filter(x => x.status && (
            (selected.maincategory?.length === 0 || selected?.maincategory?.includes(x.maincategory)) &&
            (selected.subcategory?.length === 0 || selected?.subcategory?.includes(x.subcategory)) &&
            (selected.brand?.length === 0 || selected?.brand?.includes(x.brand)) &&
            (selected.color?.length === 0 || new Set(selected?.color).intersection(new Set(x.color)).size > 0) &&
            (selected.size?.length === 0 || new Set(selected?.size).intersection(new Set(x.size)).size > 0)
        ))
        applySortFilter(data, sortFilter)
    }

    function applySortFilter(data, value) {
        if (value === "1")
            setData(data.sort((x, y) => y.id.localeCompare(x.id)))
        else if (value === "2")
            setData(data.sort((x, y) => x.finalPrice - y.finalPrice))
        else
            setData(data.sort((x, y) => y.finalPrice - x.finalPrice))

        setSortFilter(value)
    }

    function postSearch() {
        let ch = search.toLocaleLowerCase()
        let data = ProductStateData.filter(x => x.status && (
            (x.name.toLocaleLowerCase().includes(ch)) ||
            (x.maincategory.toLocaleLowerCase === ch) ||
            (x.subcategory.toLocaleLowerCase === ch) ||
            (x.brand.toLocaleLowerCase === ch) ||
            (x.color.find(p => p.toLocaleLowerCase() === ch))
        ))

        applySortFilter(data, sortFilter)
    }

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
                    <div className="col-md-3">

                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Maincategory</li>
                            {MaincategoryStateData.filter(x => x.status).map(item => {
                                return <li className="list-group-item" key={item.id} onClick={() => getInput('maincategory', item.name)}>
                                    <span>{item.name}</span>
                                    {selected.maincategory?.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}
                                </li>
                            })}
                        </ul>

                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Subcategory</li>
                            {SubcategoryStateData.filter(x => x.status).map(item => {
                                return <li className="list-group-item" key={item.id} onClick={() => getInput('subcategory', item.name)}>
                                    <span>{item.name}</span>
                                    {selected.subcategory?.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}
                                </li>
                            })}
                        </ul>

                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Brands</li>
                            {BrandStateData.filter(x => x.status).map(item => {
                                return <li className="list-group-item" key={item.id} onClick={() => getInput('brand', item.name)}>
                                    <span>{item.name}</span>
                                    {selected.brand?.includes(item.name) ? <i className='bi bi-check float-end'></i> : null}
                                </li>
                            })}
                        </ul>

                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Colors</li>
                            {colors.map((item, index) => {
                                return <li className="list-group-item" key={index} onClick={() => getInput('color', item)}>
                                    <span>{item}</span>
                                    {selected.color?.includes(item) ? <i className='bi bi-check float-end'></i> : null}
                                </li>
                            })}
                        </ul>

                        <ul className="list-group mb-3">
                            <li className="list-group-item active" aria-current="true">Sizes</li>
                            {sizes.map((item, index) => {
                                return <li className="list-group-item" key={index} onClick={() => getInput('size', item)}>
                                    <span>{item}</span>
                                    {selected.size?.includes(item) ? <i className='bi bi-check float-end'></i> : null}
                                </li>
                            })}
                        </ul>

                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-xl-9 col-md-6 mb-3">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    postSearch()
                                }}>
                                    <div className="btn-group w-100">
                                        <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} placeholder='Search Products By Name, Category, Brand or Color etc' className='form-control' />
                                        <button className='btn btn-primary' onSubmit={postSearch}>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-3">
                                <select className='form-select' onChange={(e) => applySortFilter(data, e.target.value)}>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : Low to High</option>
                                    <option value="3">Price : High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {data.map(item => {
                                return <div key={item.id} className="col-md-6 col-lg-4">
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
