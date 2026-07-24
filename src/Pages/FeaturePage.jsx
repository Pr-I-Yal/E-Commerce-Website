import React from 'react'
import BreadCrum from '../Components/BreadCrum'
import Features from '../Components/Feature'
import Newsletter from '../Components/Newsletter'

export default function FeaturePage() {
    return (
        <>
            <BreadCrum title="Features" />
            <Features />
            <Newsletter />
        </>
    )
}
