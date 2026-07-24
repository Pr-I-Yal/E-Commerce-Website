import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// import required modules
import { Autoplay } from 'swiper/modules';

const sliderOptions = {
    grabCursor: true,
    effect: 'creative',
    loop: true,
    breakpoints:{
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


export default function ProductSlider() {
    return (
        <>
            <div className="container-fluid mt-5">
                <div className="container mt-5">
                    <div className="row g-0">
                        <div className="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex flex-column justify-content-center bg-primary h-100 p-5">
                                <h1 className="text-white mb-5">Our Latest <span
                                    className="text-uppercase text-primary bg-light px-2">Projects</span></h1>
                                <h4 className="text-white mb-0"><span className="display-1">6</span> of our latest projects</h4>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="g-0">
                                <Swiper {...sliderOptions}>
                                    <SwiperSlide>
                                        <div className="wow fadeIn" data-wow-delay="0.2s">
                                            <div className="project-item position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src="img/project-1.jpg" alt="" />
                                                <a className="project-overlay text-decoration-none" href="#!">
                                                    <h4 className="text-white">Kitchen</h4>
                                                    <small className="text-white">72 Projects</small>
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="wow fadeIn" data-wow-delay="0.3s">
                                            <div className="project-item position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src="img/project-2.jpg" alt="" />
                                                <a className="project-overlay text-decoration-none" href="#!">
                                                    <h4 className="text-white">Bathroom</h4>
                                                    <small className="text-white">67 Projects</small>
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="wow fadeIn" data-wow-delay="0.4s">
                                            <div className="project-item position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src="img/project-3.jpg" alt="" />
                                                <a className="project-overlay text-decoration-none" href="#!">
                                                    <h4 className="text-white">Bedroom</h4>
                                                    <small className="text-white">53 Projects</small>
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="wow fadeIn" data-wow-delay="0.5s">
                                            <div className="project-item position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src="img/project-4.jpg" alt="" />
                                                <a className="project-overlay text-decoration-none" href="#!">
                                                    <h4 className="text-white">Living Room</h4>
                                                    <small className="text-white">33 Projects</small>
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="wow fadeIn" data-wow-delay="0.6s">
                                            <div className="project-item position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src="img/project-5.jpg" alt="" />
                                                <a className="project-overlay text-decoration-none" href="#!">
                                                    <h4 className="text-white">Furniture</h4>
                                                    <small className="text-white">87 Projects</small>
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="wow fadeIn" data-wow-delay="0.7s">
                                            <div className="project-item position-relative overflow-hidden">
                                                <img className="img-fluid w-100" src="img/project-6.jpg" alt="" />
                                                <a className="project-overlay text-decoration-none" href="#!">
                                                    <h4 className="text-white">Rennovation</h4>
                                                    <small className="text-white">69 Projects</small>
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
