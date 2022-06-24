import 'react-slideshow-image/dist/styles.css';
import './image.css';
import {
    Link, useNavigate
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import './body.css';
import Featured_today from './Featured_today';
import Navbar from './Navbar';
import Popular from './Popular';
import Latest from './Latest';
import Upcoming from './Upcoming';
import Top from './Top';

function Home() {
    const navigate = useNavigate();
    const doStuff = event => navigate('/', { replace: true });
    useEffect(() => {
        if (localStorage.getItem("profile_data") === null) {
            doStuff();
        }
    }, [])
    
    return (
        <>
            <Navbar></Navbar>
            <Featured_today/>
            <Upcoming/>
            <Latest/>
            <Popular/>
            <Top/>
        </>
    );
}
{/*  */}
export default Home;
