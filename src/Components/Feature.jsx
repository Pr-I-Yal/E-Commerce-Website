import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"

export default function Feature() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getFeature()))()
    }, [FeatureStateData.length])

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center wow fadeIn" data-wow-delay="0.1s">
                        <h1 className="mb-5">Why People <span className="text-uppercase text-primary bg-light px-2">Choose Us</span>
                        </h1>
                    </div>
                    <div className="row g-5 align-items-center text-center">
                        {FeatureStateData.filter(x => x.status).map((item, index) => {
                            return <div key={index} className="col-md-6 col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                                <span dangerouslySetInnerHTML={{ __html: item.icon }} className='text-primary display-4'></span>
                                <h4>{item.name}</h4>
                                <p className="mb-0">{item.shortDescription}</p>
                            </div>
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
