import React from 'react'
import BreadCrum from '../Components/BreadCrum'
import About from '../Components/About'
import Features from '../Components/Feature'
import Testimonials from '../Components/Testimonial'
import Newsletter from '../Components/Newsletter'

export default function AboutPage() {
    return (
        <>
            <BreadCrum title="About Us" />
            <About />
            <Features />
            <Testimonials />
            <Newsletter />
        </>
    )
}
