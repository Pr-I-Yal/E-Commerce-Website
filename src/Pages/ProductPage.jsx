import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';

import BreadCrum from '../Components/BreadCrum'
import ProductSlider from '../Components/ProductSlider'

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import { getTestimonial, createTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"

export default function ProductPage() {
    let { id } = useParams()
    let [review, setReview] = useState([])

    let [star, setStar] = useState(0)
    let [message, setMessage] = useState("")
    let [reviewMessage, setReviewMessage] = useState("")
    let [submitting, setSubmitting] = useState(false)

    let [selected, setSelected] = useState({
        color: '',
        size: '',
        quantity: 1
    })

    let [data, setData] = useState({})
    let [relatedData, setRelatedData] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function addToCart() {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                color: selected.color,
                size: selected.size,
                quantity: selected.quantity,
                total: data.finalPrice * selected.quantity,

                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0],
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function getStar(star) {
        if (star === "5")
            return <span><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i></span>
        else if (star === "4")
            return <span><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i></span>
        else if (star === "3")
            return <span><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></span>
        else if (star === "2")
            return <span><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></span>
        else
            return <span><i className='bi bi-star-fill text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i><i className='bi bi-star text-warning'></i></span>
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,

                name: data.name,
                brand: data.brand,
                color: data.color,
                size: data.size,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0],
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=Wishlist")
    }

    async function submitReview(e) {
        e.preventDefault();
        setReviewMessage("");

        const userId = localStorage.getItem("userid");

        if (!userId) {
            setReviewMessage("Please log in to submit a review.");
            return;
        }

        if (star === 0) {
            setReviewMessage("Please select a star rating.");
            return;
        }

        if (!message.trim()) {
            setReviewMessage("Please enter your review.");
            return;
        }

        try {
            setSubmitting(true);

            const testimonial = {
                user: userId,
                product: id,
                username: localStorage.getItem("username") || "Customer",
                star: String(star),
                message: message.trim()
            };

            await dispatch(createTestimonial(testimonial));

            // Refresh the testimonials from the backend
            await dispatch(getTestimonial());

            setStar(0);
            setMessage("");
            setReviewMessage("Your review has been submitted!");
        } catch (error) {
            console.error("Review submission failed:", error);
            setReviewMessage("Unable to submit your review. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setSelected({ ...selected, color: item.color[0], size: item.size[0] })
                    setRelatedData(ProductStateData.filter(x => x.status && x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])


    useEffect(() => {
        dispatch(getTestimonial());
    }, [dispatch]);

    useEffect(() => {
        if (TestimonialStateData.length > 0) {
            const productReviews = TestimonialStateData.filter(
                (item) => String(item.product) === String(id)
            );

            setReview(productReviews);
        } else {
            setReview([]);
        }
    }, [TestimonialStateData, id]);

    return (
        <>
            <BreadCrum title={data.name ?? "Product"} />

            <div className="container my-3">
                <div className="row">
                    <div className="col-md-6">
                        <Swiper
                            effect={'cube'}
                            grabCursor={true}
                            loop={true}
                            cubeEffect={{
                                shadow: true,
                                slideShadows: true,
                                shadowOffset: 20,
                                shadowScale: 0.94,
                            }}
                            pagination={true}
                            modules={[EffectCube, Pagination]}
                            className="mySwiper"
                        >
                            {data.pic?.map((pic, index) => {
                                return <SwiperSlide key={index}>
                                    <img className='w-100' style={{ height: 500 }} src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${pic}`} alt='Product Image' />
                                </SwiperSlide>
                            })}
                        </Swiper>
                        <div className="col-lg-12">

                            <div className="col-lg-12 mt-4">
                                <h4 className="mb-3">
                                    Reviews ({review.length})
                                </h4>

                                {/* Existing product reviews */}
                                {review.length > 0 ? (
                                    review.map((item) => (
                                        <div className="card p-4 mb-3" key={item.id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5>{item.username}</h5>
                                                {getStar(String(item.star))}
                                            </div>

                                            <p className="mb-1">{item.message}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="card p-4 mb-4">
                                        No Reviews Yet. Be the first to review this product!
                                    </div>
                                )}

                                {/* Review submission form */}
                                <div className="card p-4 mt-4">
                                    <h5 className="mb-3">Write a Review</h5>

                                    <form onSubmit={submitReview}>
                                        <label className="form-label d-block">
                                            Your Rating
                                        </label>

                                        <div className="mb-3">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <button
                                                    type="button"
                                                    key={value}
                                                    className="btn p-1"
                                                    aria-label={`Rate ${value} stars`}
                                                    onClick={() => setStar(value)}
                                                >
                                                    <i
                                                        className={`bi ${value <= star
                                                                ? "bi-star-fill text-warning"
                                                                : "bi-star text-warning"
                                                            }`}
                                                        style={{ fontSize: "25px" }}
                                                    />
                                                </button>
                                            ))}
                                        </div>

                                        <label htmlFor="reviewMessage" className="form-label">
                                            Your Review
                                        </label>

                                        <textarea
                                            id="reviewMessage"
                                            className="form-control mb-3"
                                            rows="4"
                                            placeholder="Share your experience with this product..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />

                                        {reviewMessage && (
                                            <p role="status" className="mb-3">
                                                {reviewMessage}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={submitting}
                                        >
                                            {submitting ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className='bg-primary text-center p-2 text-light'>{data.name}</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Maincategory</th>
                                        <td>{data.maincategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Subcategory</th>
                                        <td>{data.subcategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Brand</th>
                                        <td>{data.brand}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td><del className='text-danger'>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice} <sup className='text-warning'>{data.discount}% Off</sup></td>
                                    </tr>
                                    <tr>
                                        <th>Stock</th>
                                        <td>{data.stock ? `${data.stockQuantity} Left In Stock` : 'Out Of Stock'}</td>
                                    </tr>
                                    <tr>
                                        <th>Color</th>
                                        <td>
                                            <div className="btn-group">
                                                {data.color?.map((item, index) => {
                                                    return <button key={index}
                                                        onClick={() => setSelected({ ...selected, color: item })}
                                                        className={`btn ${selected.color === item ? 'btn-primary' : ''}`}>{item}</button>
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>
                                            <div className="btn-group">
                                                {data.size?.map((item, index) => {
                                                    return <button key={index}
                                                        onClick={() => setSelected({ ...selected, size: item })}
                                                        className={`btn ${selected.size === item ? 'btn-primary' : ''}`}>{item}</button>
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="row">
                                                <div className="col-4">
                                                    {data.stock ? <div className="btn-group w-100">
                                                        <button className='btn btn-primary'
                                                            onClick={() => selected.quantity === 1 ? null : setSelected({ ...selected, quantity: selected.quantity - 1 })}>
                                                            <i className='bi bi-dash'></i>
                                                        </button>
                                                        <h4 className='text-center' style={{ width: "40%" }}>{selected.quantity}</h4>
                                                        <button className='btn btn-primary'
                                                            onClick={() => selected.quantity === data.stockQuantity ? null : setSelected({ ...selected, quantity: selected.quantity + 1 })}>
                                                            <i className='bi bi-plus'></i>
                                                        </button>
                                                    </div> : null}
                                                </div>
                                                <div className="col-8">
                                                    <div className="btn-group w-100">
                                                        {data.stock ? <button className='btn btn-primary' onClick={addToCart}><i className='bi bi-cart-plus me-2'></i>Add To Cart</button>
                                                            : null}
                                                        <button className='btn btn-success' onClick={addToWishlist}><i className='bi bi-suit-heart me-2'></i>Add To Wishlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>
                                            <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {relatedData ? <ProductSlider title="Other Related Products" data={relatedData} /> : null}


            </div>
        </>
    )
}

