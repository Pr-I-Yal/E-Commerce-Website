import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import RichTextEditor from '../../../rte/RichTextEditor';
import { createStructuredContent } from '../../../rte/richTextEditorBridge';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import ImageValidators from '../../../Validators/ImageValidators'
import TextValidators from '../../../Validators/TextValidators'

import { createProduct, getProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreators'

const colors = ["Black", "White", "Blue", "Red", "Orange", "Gray", "Green", "Pink", "Yellow", "Purple", "Magenta", "N/A"]
const sizes = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

export default function AdminCreateProductPage() {
    let editorRef = useRef(null)

    let [description, setDescription] = useState("")

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        basePrice: "",
        discount: "",
        finalPrice: "",
        stock: "",
        stockQuantity: "",
        pic: [],
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name field is mandatory.",
        basePrice: "Base Price field is mandatory.",
        discount: "Discount field is mandatory.",
        stockQuantity: "Stock Quantity field is mandatory.",
        color: "Please Select Atleast one Color",
        size: "Please Select Atleast one Size",
        pic: "Pic field is mandatory."
    })

    let [show, setShow] = useState(false)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? Array.from(e.target.files).map(x => "maincategory/" + x.name) : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
        // let value = name === "pic" ? e.target.files : name === "status" ? (e.target.value === "1" ? true : false) : e.target.value
        //OR
        let value = ""
        if (name === "pic") {
            value = Array.from(e.target.files).map(x => "maincategory/" + x.name)
            // value = e.target.files
        }
        else if (name === "status" || name === "stock")
            value = e.target.value === "1" ? true : false
        else
            value = e.target.value

        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidators(e) : TextValidators(e) })
    }

    function getInputCheckbox(key, value) {
        let arr = data[key]
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)

        setData({ ...data, [key]: arr })
        setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `Please Select Atleast one ${key}` : "" })
    }

    function syncDocument(documentModel, nextHtml) {
        const resolvedHtml = nextHtml !== undefined ? nextHtml : renderHTML(documentModel);
        setDescription(resolvedHtml)
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let bp = parseInt(data.basePrice)
            let d = parseInt(data.discount)
            let fp = parseInt(bp - bp * d / 100)
            let stockQuantity = parseInt(data.stockQuantity)
            dispatch(createProduct({
                ...data,
                maincategory: data.maincategory || MaincategoryStateData[0].name,
                subcategory: data.subcategory || SubcategoryStateData[0].name,
                brand: data.brand || BrandStateData[0].name,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                description: description
            }))

            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("pic", data.pic)
            // formData.append("status", data.status)
            // dispatch(createProduct(formData))

            navigate("/admin/product")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Create Product
                            <Link to="/admin/product">
                                <i className='bi bi-arrow-left text-light float-end'></i>
                            </Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text"
                                        name="name"
                                        onChange={getInputData}
                                        placeholder='Product Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label >Maincategory*</label>
                                    <select name="maincategory" className='form-select border-primary'>
                                        {MaincategoryStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label >Subcategory*</label>
                                    <select name="subcategory" className='form-select border-primary'>
                                        {SubcategoryStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label >Brand*</label>
                                    <select name="brand" className='form-select border-primary'>
                                        {BrandStateData.filter(x => x.status).map((item, index) => {
                                            return <option key={index}>{item.name}</option>
                                            // return <option key={index} value={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6 mb-3">
                                    <label >Stock*</label>
                                    <select name="stock" className='form-select border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-lg-4 col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="text"
                                        name="basePrice"
                                        onChange={getInputData}
                                        placeholder='Product Base Price'
                                        className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-lg-4 col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="text"
                                        name="discount"
                                        onChange={getInputData}
                                        placeholder='Product Discount'
                                        className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-lg-4 col-md-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="text"
                                        name="stockQuantity"
                                        onChange={getInputData}
                                        placeholder='Product Stock Quantity'
                                        className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Color*</label>
                                    <div className='row border border-1 border-primary m-1 p-2'>
                                        {colors.map((item, index) => {
                                            return <div className="col-xl-2 col-md-3 col-4" key={index}>
                                                <input type="checkbox"
                                                    name={item}
                                                    value={item}
                                                    id={item}
                                                    onChange={() => getInputCheckbox('color', item)}
                                                    checked={data.color?.includes(item)} />
                                                <label className='ms-2' htmlFor={item}>{item}</label>
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Size*</label>
                                    <div className='row border border-1 border-primary m-1 p-2'>
                                        {sizes.map((item, index) => {
                                            return <div className="col-xl-2 col-md-3 col-4" key={index}>
                                                <input type="checkbox"
                                                    name={item}
                                                    value={item}
                                                    id={item}
                                                    onChange={() => getInputCheckbox('size', item)}
                                                    checked={data.size?.includes(item)} />
                                                <label className='ms-2' htmlFor={item}>{item}</label>
                                            </div>
                                        })}
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Description</label>
                                    <RichTextEditor
                                        ref={editorRef}
                                        className="editor-host border-primary"
                                        value={description}
                                        onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml)}
                                        style={{ minHeight: 380 }}
                                    />
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file"
                                        name="pic"
                                        multiple
                                        onChange={getInputData}
                                        className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
