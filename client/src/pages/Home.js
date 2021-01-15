import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import API from '../utils/API';
import PopularSection from '../components/PopularSection';

export default function Home() {

    return (
        <>
            <section id='main-landing-section'>
                <Navbar />
                {/* <h1>Hello </h1> */}
            </section>
            <AboutUs />
            <PopularSection />
            <section id='footer'>
                <Footer />
            </section>
        </>
    )
}