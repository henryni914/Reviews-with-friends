import { React, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import ReduxTest from '../components/ReduxTest';
import { useAuth0 } from '../utils/auth0context';
import API from '../utils/API';

export default function Home() {

    const { user, isAuthenticated } = useAuth0();
    console.log('home', user)

    // useEffect(() => {
    //     API.popularMovies()
    //     .then(
    //         res => {
    //             console.log(res.data.results)
    //         }
    //     )
    // })

    return (
        <>
            <section id='main-landing-section'>
                <Navbar userInfo={user}/>
                <h1>Hello </h1>
            </section>
            <AboutUs />
            <ReduxTest />
            <section id='footer'>
                <Footer />
            </section>
        </>
    )
}