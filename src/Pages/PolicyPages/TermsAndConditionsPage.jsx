import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../../Redux/ActionCreators/SettingActionCreators"

import BreadCrum from '../../Components/BreadCrum'

export default function TermsAndConditionsPage() {
    let [settingData, setSettingData] = useState({
        termsAndConditions: ""
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = {}
                Object.keys(settingData).forEach(key => {
                    item[key] = SettingStateData[0][key] ? SettingStateData[0][key] : settingData[key]
                })
                setSettingData({ ...item })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <BreadCrum title="Terms And Conditions" />
            <div className="container my-5">
                <div dangerouslySetInnerHTML={{ __html: settingData.termsAndConditions }} />
            </div>

        </>
    )
}
