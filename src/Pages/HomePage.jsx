import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { EffectCreative, Autoplay } from 'swiper/modules';

import About from '../Components/About'
import Feature from '../Components/Feature'
import ProductSlider from '../Components/ProductSlider'
import Service from '../Components/Service'
import Products from '../Components/Products'
import Testimonial from '../Components/Testimonial'
import Newsletter from '../Components/Newsletter'
import Faq from '../Components/Faq';

const sliderOptions = {
    grabCursor: true,
    effect: 'creative',
    loop: true,
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ['100%', 0, 0],
        },
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    modules: [EffectCreative, Autoplay],
    className: "mySwiper"

}

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"

export default function HomePage() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)

    let dispatch = useDispatch()

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    return (
        <>
            <div className="container-fluid pb-5 hero-header bg-light mb-5">
                <div className="container py-5">
                    <div className="row g-5 align-items-center mb-5">
                        <div className="col-lg-6">
                            <h1 className="display-1 mb-4 animated slideInRight">Dash Into <span className="text-primary">Savings </span>
                                Every Day!</h1>
                            <h5 className="d-inline-block border border-2 border-white py-3 px-5 mb-0 animated slideInRight">
                                Where Every Deal Feels Like a Win.</h5>
                        </div>
                        <div className="col-lg-6">
                            <div className="header-carousel animated fadeIn">
                                <Swiper {...sliderOptions}>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner1.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner2.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner3.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner4.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner5.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner6.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner7.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner8.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner9.jpg" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img className="img-fluid" style={{ height: 400 }} src="/Images/Banner10.jpg" alt="" />
                                    </SwiperSlide>

                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 animated fadeIn">
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="bi bi-check fs-1 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Top Brands</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="bi bi-tag fs-1 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">Upto 90% off</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="bi bi-arrow-repeat fs-1 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">15 Days Return</h5>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 btn-square border border-2 border-white me-3">
                                    <i className="bi bi-headset fs-1 text-primary"></i>
                                </div>
                                <h5 className="lh-base mb-0">24/7 Customer Support</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <About />
            {MaincategoryStateData.filter(x => x.status && ProductStateData.filter(p => p.maincategory === x.name).length !== 0).map(item => {
                return <ProductSlider key={item.id} title={item.name} data={ProductStateData.filter(x => x.maincategory === item.name)} />
            })}
            <Feature />
            <Faq />
            <Products data={ProductStateData.filter(x => x.status)} />
            <Service />
            <Testimonial />
            <Newsletter />

        </>
    )
}
