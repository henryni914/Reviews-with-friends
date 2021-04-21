import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Step from '../components/Step';
import Footer from '../components/Footer';
import API from '../utils/API';
import PopularSection from '../components/PopularSection';

export default function Home() {

    return (
        <>
            <section id='main-landing-section'></section>
            <Step />
            <AboutUs />
            <PopularSection />
        </>
    )
}