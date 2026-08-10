import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';

import RichTextEditor from '../../../rte/RichTextEditor';
import { createStructuredContent } from '../../../rte/richTextEditorBridge';

import AdminSidebar from '../../../Components/Admin/AdminSidebar'

import { getSetting, createSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"

export default function AdminSettingPage() {
    let editorRefPrivacyPolicy = useRef(null)
    let editorRefTermsAndConditions = useRef(null)
    let editorRefRefundPolicy = useRef(null)

    let [privacyPolicy, setPrivacyPolicy] = useState("")
    let [termsAndConditions, setTermsAndConditions] = useState("")
    let [refundPolicy, setRefundPolicy] = useState("")

    let [data, setData] = useState({
        siteName: "",
        map1: "",
        map2: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: ""
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function postData(e) {
        e.preventDefault()
        let item = {
            ...data,
            privacyPolicy: privacyPolicy,
            termsAndConditions: termsAndConditions,
            refundPolicy: refundPolicy
        }
        if (SettingStateData.length)
            dispatch(updateSetting({ ...item, id: SettingStateData[0].id }))
        else
            dispatch(createSetting({ ...item }))

        toast("Setting Data has been Updated !");
    }

    function syncDocument(documentModel, nextHtml, option) {
        const resolvedHtml = nextHtml !== undefined ? nextHtml : renderHTML(documentModel);
        if (option === "privacyPolicy")
            setPrivacyPolicy(resolvedHtml)
        else if (option === "termsAndConditions")
            setTermsAndConditions(resolvedHtml)
        else
            setRefundPolicy(resolvedHtml)
    }

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setData({ ...data, ...SettingStateData[0] })
                setTimeout(() => {
                    syncDocument(createStructuredContent(""), SettingStateData[0].privacyPolicy ?? "", "privacyPolicy");
                    syncDocument(createStructuredContent(""), SettingStateData[0].termsAndConditions ?? "", "termsAndConditions");
                    syncDocument(createStructuredContent(""), SettingStateData[0].refundPolicy ?? "", "refundPolicy");
                }, 500)
            }
        })()
    }, [SettingStateData.length])

    return (
        <>
            <ToastContainer />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-lg-9">
                        <h5 className='bg-primary p-2 text-light text-center'>Setting</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Site Name</label>
                                    <input type="text" name="siteName" value={data.siteName} onChange={getInputData} className='form-control border-primary' placeholder='Site Name' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} className='form-control border-primary' placeholder='Email Address' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} className='form-control border-primary' placeholder='Phone Number' />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Whatsapp</label>
                                    <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} className='form-control border-primary' placeholder='Whatsapp' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Address</label>
                                    <input type="text" name="address" value={data.address} onChange={getInputData} className='form-control border-primary' placeholder='Address' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Map1</label>
                                    <input type="url" name="map1" value={data.map1} onChange={getInputData} className='form-control border-primary' placeholder='Map1' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Map2</label>
                                    <input type="url" name="map2" value={data.map2} onChange={getInputData} className='form-control border-primary' placeholder='Map2' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Facebook Profile Page Url</label>
                                    <input type="url" name="facebook" value={data.facebook} onChange={getInputData} className='form-control border-primary' placeholder='Facebook Profile Page Url' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Twitter Profile Page Url</label>
                                    <input type="url" name="twitter" value={data.twitter} onChange={getInputData} className='form-control border-primary' placeholder='Twitter Profile Page Url' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Linkedin Profile Page Url</label>
                                    <input type="url" name="linkedin" value={data.linkedin} onChange={getInputData} className='form-control border-primary' placeholder='Linkedin Profile Page Url' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Youtube Profile Page Url</label>
                                    <input type="url" name="youtube" value={data.youtube} onChange={getInputData} className='form-control border-primary' placeholder='Youtube Profile Page Url' />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label>Instagram Profile Page Url</label>
                                    <input type="url" name="instagram" value={data.instagram} onChange={getInputData} className='form-control border-primary' placeholder='Instagram Profile Page Url' />
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Privacy Policy</label>
                                    <RichTextEditor
                                        ref={editorRefPrivacyPolicy}
                                        className="editor-host border-primary"
                                        value={privacyPolicy}
                                        onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml, "privacyPolicy")}
                                        style={{ minHeight: 380 }}
                                    />
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Terms And Conditions</label>
                                    <RichTextEditor
                                        ref={editorRefTermsAndConditions}
                                        className="editor-host border-primary"
                                        value={termsAndConditions}
                                        onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml, "termsAndConditions")}
                                        style={{ minHeight: 380 }}
                                    />
                                </div>

                                <div className='col-12 mb-3'>
                                    <label>Refund Policy</label>
                                    <RichTextEditor
                                        ref={editorRefRefundPolicy}
                                        className="editor-host border-primary"
                                        value={refundPolicy}
                                        onChange={(nextHtml, editor) => syncDocument(editor.getJSON(), nextHtml, "refundPolicy")}
                                        style={{ minHeight: 380 }}
                                    />
                                </div>

                                <div className="col-12 mb-3">
                                    <button className='btn btn-primary w-100'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}
