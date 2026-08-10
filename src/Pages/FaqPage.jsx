import React from 'react'
import BreadCrum from '../Components/BreadCrum'
import Newsletter from '../Components/Newsletter'
import Service from '../Components/Service'
import Faq from '../Components/Faq'

export default function FaqPage() {
    return (
        <>
            <BreadCrum title="Faq" />
            <Faq />
            <Service />
            <Newsletter />
        </>
    )
}
