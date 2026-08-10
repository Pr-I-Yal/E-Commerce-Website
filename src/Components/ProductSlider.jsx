import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const sliderOptions = {
    grabCursor: true,
    effect: 'creative',
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: -0,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    },
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
    modules: [Autoplay],
    className: "mySwiper"

}


export default function ProductSlider({ title, data }) {
    return (
        <>
            <div className="container-fluid mt-5">
                <div className="container mt-5">
                    <div className="row g-0">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex flex-column justify-content-center bg-primary h-100 p-5">
                                <h1 className="text-white mb-5">Our Latest <span
                                    className="text-uppercase text-primary bg-light px-2">Products</span></h1>
                                <h4 className="text-white mb-0">for {title}</h4>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="g-0">
                                <Swiper {...sliderOptions}>
                                    {data.map(item => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="wow fadeIn" data-wow-delay="0.2s">
                                                <div className="project-item position-relative overflow-hidden">
                                                    <img className="img-fluid w-100" style={{ height: 300 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic[0]}`} alt="" />
                                                    <Link className="project-overlay text-decoration-none" to={`/product/${item.id}`}>
                                                        <h4 className="text-white">{item.name}</h4>
                                                        <p className="text-white">{item.brand}</p>
                                                        <p className="text-white">{item.stockQuantity} Left In Stock</p>
                                                        <small className="text-white"><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% OFF</sup></small>
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
