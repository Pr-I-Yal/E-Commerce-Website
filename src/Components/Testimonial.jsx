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

export default function Testimonial() {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-9">
                            <div className="testimonial-carousel wow fadeIn" data-wow-delay="0.2s">
                                <Swiper {...sliderOptions}>
                                    <SwiperSlide>
                                        <div className="testimonial-item">
                                            <div className="row g-5 align-items-center">
                                                <div className="col-md-6">
                                                    <div className="testimonial-img">
                                                        <img className="img-fluid" src="img/testimonial-1.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="testimonial-text pb-5 pb-md-0">
                                                        <h3>Sustainable Material</h3>
                                                        <p>Aliqu diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed
                                                            stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna
                                                            dolore erat
                                                            amet</p>
                                                        <h5 className="mb-0">Boris Johnson</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="testimonial-item">
                                            <div className="row g-5 align-items-center">
                                                <div className="col-md-6">
                                                    <div className="testimonial-img">
                                                        <img className="img-fluid" src="img/testimonial-2.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="testimonial-text pb-5 pb-md-0">
                                                        <h3>Customer Satisfaction</h3>
                                                        <p>Clita erat ipsum et lorem et sit, sed
                                                            stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna
                                                            dolore erat
                                                            amet</p>
                                                        <h5 className="mb-0">Alexander Bell</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="testimonial-item">
                                            <div className="row g-5 align-items-center">
                                                <div className="col-md-6">
                                                    <div className="testimonial-img">
                                                        <img className="img-fluid" src="img/testimonial-3.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="testimonial-text pb-5 pb-md-0">
                                                        <h3>Budget Friendly</h3>
                                                        <p>Diam amet diam et eos labore. Clita erat ipsum et lorem et sit, sed
                                                            stet no labore lorem sit. Sanctus clita duo justo et tempor eirmod magna
                                                            dolore erat
                                                            amet</p>
                                                        <h5 className="mb-0">Bradley Gordon</h5>
                                                    </div>
                                                </div>
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
