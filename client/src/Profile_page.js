import React, { useEffect, useContext, useState, useCallback } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from './Light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import default_profile_image from './default_profile_image.jpg';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { LoginContext1 } from './profile_data';
import { Helmet } from "react-helmet";
function Profile_page() {
    const navigate = useNavigate();
    const doStuff = event => navigate('/', { replace: true });
    const [data, setData] = useState({});
    const [fav, setFav] = useState([]);
    const { light, setLight } = useContext(LoginContext);
    useEffect(() => {
        if (localStorage.getItem("profile_data") === null) {
            doStuff();
        }
        var profile_obj = localStorage.getItem('profile_data');
        var profile_obj1 = JSON.parse(profile_obj);
        console.log("a");
        setData(profile_obj1);
    }, [])
    useEffect(() => {
        if (data) {
            console.log('a');
            getFav();
        }
    }, [data])
    const handleMouseIn = event => {
        event.currentTarget.style.opacity = '0.9';
    };
    const handleMouseOut = event => {
        event.currentTarget.style.opacity = '1';
    };
    const getFav = async () => {
        var email = data.email;
        const res = await fetch("/getfav", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const result = await res.json();
        console.log(result);
        setFav(result);
    }
    const addPhoto = async () => {
        var email = data.email;
        const res = await fetch("/getfav", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const result = await res.json();
        console.log(result);
        setFav(result);
    }
    return (
        <>
            <Helmet>
                <style>{"body { background-color: white; }"}</style>
            </Helmet>
            <div className="top_background" style={{ width: "100%", position: "relative", height: "20rem", backgroundColor: "black" }}>
                {data.profile_photo ? <div className='profile_photo'>
                    <img src={data.picture} style={{ height: "12rem", width: "12rem", borderRadius: "60px", position: "absolute", left: "6%", top: "75%" }} />
                </div> :
                    <FontAwesomeIcon icon={faCircleUser} size="10x" color="yellow" style={{ position: "absolute", top: "20vh", left: "5%", backgroundColor: "black", borderRadius: "50%" }} />
                }
            </div>
            <div style={{ display: "flex", marginTop: "8%", marginLeft: "7%" }}>
                <div style={{ flexGrow: "1" }}>
                    <div style={{ fontSize: "24px" }}>
                        <h>Name:</h>
                    </div>
                    <div style={{ fontSize: "36px" }}>
                        <h>{data.username}</h>
                    </div>
                </div>
                <div style={{ flexGrow: "1" }}>
                    <div style={{ fontSize: "24px" }}>
                        <h>Email:</h>
                    </div>
                    <div style={{ fontSize: "36px" }}>
                        <h>{data.email}</h>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "black",marginTop:"10vh"}}>
                <div style={{ fontSize: "3vw", marginLeft: "2vw", paddingTop: "10vh", color: "white" }}>
                    Favouraite
                </div>
                <div className='row' style={{ position: "relative", marginTop: "3vh", marginLeft: "1.5vw" }}>
                    {fav && fav.favo && fav.favo.map((user) => (
                        <div className="container" key={user.data.id} style={{ position: "relative", paddingLeft: "0", paddingRight: "0" }}>
                            <Link to="/Page" state={user.data}>
                                <div className='rating' >
                                    <FontAwesomeIcon icon={faStar} style={{ color:"#f5c518", width: "8%", height: "8%", position: "absolute", left: "1vw", top: "1vh" }} />
                                    <span style={{ color:"#f5c518", fontSize: "1.5vw", position: "absolute", left: "15%", top: "2.5%" }}>{user.data.vote_average}</span>
                                </div>
                                <div className="polaroid" style={{ height: "80%", width: "20vw", color: "black" }}>
                                    <img src={"https://image.tmdb.org/t/p/w500" + user.data.poster_path} alt="Norther Lights" style={{ width: "100%", height: "100%", borderRadius: "10px" }} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} />
                                    <button type="button" style={{ backgroundColor: "white", whiteSpace: "nowrap", overflow: "hidden", textDecoration: "none", position: "absolute", top: "75%", left: "22%", fontSize: "1.2vw", paddingTop: "1%", paddingRight: "4%", paddingLeft: "4%", paddingBottom: "1%", borderRadius: "50px 50px 50px 50px", textOverflow: "----" }}><Link to="/Trailer" state={user.data} style={{ textDecoration: "none", color:"black" }}><FontAwesomeIcon icon={faPlay} size="1x" />   Watch Trailer</Link></button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Profile_page;
