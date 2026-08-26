import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import FeaturePage from './Pages/FeaturePage'
import FaqPage from './Pages/FaqPage'
import ShopPage from './Pages/ShopPage'
import ProductPage from './Pages/ProductPage'
import TestimonialPage from './Pages/TestimonialPage'
import ErrorPage from './Pages/ErrorPage'
import ContactUsPage from './Pages/ContactUsPage'
import PrivacyPolicyPage from './Pages/PolicyPages/PrivacyPolicyPage'
import RefundPolicyPage from './Pages/PolicyPages/RefundPolicyPage'
import TermsAndConditionsPage from './Pages/PolicyPages/TermsAndConditionsPage'

import SignUpPage from './Pages/User/SignUpPage'
import LoginPage from './Pages/User/LogInPage'

import ProfilePage from './Pages/User/ProfilePage'
import CartPage from './Pages/User/CartPage'
import CheckoutPage from './Pages/User/CheckoutPage'
import OrderConfirmationPage from './Pages/User/OrderConfirmationPage'

import AdminHomePage from './Pages/Admin/AdminHomePage'

import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/Maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/Maincategory/AdminUpdateMaincategoryPage'

import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminCreateSubcategoryPage from './Pages/Admin/Subcategory/AdminCreateSubcategoryPage'
import AdminUpdateSubcategoryPage from './Pages/Admin/Subcategory/AdminUpdateSubcategoryPage'

import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminCreateBrandPage from './Pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandPage from './Pages/Admin/Brand/AdminUpdateBrandPage'

import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturePage from './Pages/Admin/Feature/AdminCreateFeaturePage'
import AdminUpdateFeaturePage from './Pages/Admin/Feature/AdminUpdateFeaturePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminCreateFaqPage from './Pages/Admin/Faq/AdminCreateFaqPage'
import AdminUpdateFaqPage from './Pages/Admin/Faq/AdminUpdateFaqPage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'

import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminCreateProductPage from './Pages/Admin/Product/AdminCreateProductPage'
import AdminUpdateProductPage from './Pages/Admin/Product/AdminUpdateProductPage'

import AdminNewsletterPage from './Pages/Admin/Newsletter/AdminNewsletterPage'

import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'

import AdminCheckoutPage from './Pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './Pages/Admin/Checkout/AdminCheckoutShowPage'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/feature' element={<FeaturePage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/testimonial' element={<TestimonialPage />} />
        <Route path='/contactus' element={<ContactUsPage />} />

        <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
        <Route path='/refund-policy' element={<RefundPolicyPage />} />
        <Route path='/tc' element={<TermsAndConditionsPage />} />

        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Buyer Routes */}
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/order-confirmation' element={<OrderConfirmationPage />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHomePage />} />

        <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
        <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
        <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategoryPage />} />

        <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
        <Route path='/admin/subcategory/create' element={<AdminCreateSubcategoryPage />} />
        <Route path='/admin/subcategory/update/:id' element={<AdminUpdateSubcategoryPage />} />

        <Route path='/admin/brand' element={<AdminBrandPage />} />
        <Route path='/admin/brand/create' element={<AdminCreateBrandPage />} />
        <Route path='/admin/brand/update/:id' element={<AdminUpdateBrandPage />} />

        <Route path='/admin/feature' element={<AdminFeaturePage />} />
        <Route path='/admin/feature/create' element={<AdminCreateFeaturePage />} />
        <Route path='/admin/feature/update/:id' element={<AdminUpdateFeaturePage />} />

        <Route path='/admin/faq' element={<AdminFaqPage />} />
        <Route path='/admin/faq/create' element={<AdminCreateFaqPage />} />
        <Route path='/admin/faq/update/:id' element={<AdminUpdateFaqPage />} />

        <Route path='/admin/setting' element={<AdminSettingPage />} />

        <Route path='/admin/product' element={<AdminProductPage />} />
        <Route path='/admin/product/create' element={<AdminCreateProductPage />} />
        <Route path='/admin/product/update/:id' element={<AdminUpdateProductPage />} />

        <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

        <Route path='/admin/contactus' element={<AdminContactUsPage />} />
        <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />

        <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
        <Route path='/admin/checkout/show/:id' element={< AdminCheckoutShowPage />} />

        <Route path='/*' element={<ErrorPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
