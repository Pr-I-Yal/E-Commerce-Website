import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import FeaturePage from './Pages/FeaturePage'
import ShopPage from './Pages/ShopPage'
import ProductPage from './Pages/ProductPage'
import TestimonialPage from './Pages/TestimonialPage'
import ErrorPage from './Pages/ErrorPage'
import ContactUsPage from './Pages/ContactUsPage'
import PrivacyPolicyPage from './Pages/PolicyPages/PrivacyPolicyPage'
import RefundPolicyPage from './Pages/PolicyPages/RefundPolicyPage'
import DataPolicyPage from './Pages/PolicyPages/DataPolicyPage'
import AdminHomePage from './Pages/Admin/AdminHomePage'
import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategoryPage from './Pages/Admin/Maincategory/AdminCreateMaincategoryPage'
import AdminUpdateMaincategoryPage from './Pages/Admin/Maincategory/AdminUpdateMaincategoryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/feature' element={<FeaturePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/testimonial' element={<TestimonialPage />} />
        <Route path='/contact' element={<ContactUsPage />} />

        <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
        <Route path='/refund-policy' element={<RefundPolicyPage />} />
        <Route path='/data-policy' element={<DataPolicyPage />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
        <Route path='/admin/maincategory/create' element={<AdminCreateMaincategoryPage />} />
        <Route path='/admin/maincategory/update/:id' element={<AdminUpdateMaincategoryPage />} />



        <Route path='/*' element={<ErrorPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
