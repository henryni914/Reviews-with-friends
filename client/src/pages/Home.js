import { React, useEffect } from 'react';
import AboutUs from '../components/AboutUs';
import Step from '../components/Step';
import PopularSection from '../components/PopularSection';

export default function Home() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },[])

    return (
        <>
            <section id='main-landing-section'></section>
            <Step />
            <AboutUs />
            <PopularSection />
        </>
    )
}