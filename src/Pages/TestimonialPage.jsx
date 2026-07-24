import React from 'react'
import BreadCrum from '../Components/BreadCrum'
import Testimonials from '../Components/Testimonial'
import Newsletter from '../Components/Newsletter'

export default function TestimonialPage() {
    return (
        <>
            <BreadCrum title="Our Testimonials" />
            <Testimonials />
            <Newsletter />
        </>
    )
}
