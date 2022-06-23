import { css } from "@emotion/react";
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './poster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Percentage_circle.css';
import './Cast.css';
import img1 from './img1.jpg';
import img4 from './img4.webp';
import img3 from './img3.jpg';
import img2 from './img2.jpg';
import img from './img.jpg';
import './body.css';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
    Link
} from "react-router-dom";
import { LoginContext } from './Light';
import YouTube, { YouTubeProps } from 'react-youtube';
import Loader from "./Loader";
function Page() {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [video, setVideo] = useState([]);
    const [genre, setGenre] = useState([]);
    const [backdrops, setBackdrops] = useState([]);
    const [production, setProuction] = useState([]);
    const [cast, setCast] = useState([]);
    const location = useLocation();
    const data1 = location.state;
    const [loading, setLoading] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [ini, setIni] = useState(0);
    const [final, setFinal] = useState(4);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const { light, setLight } = useContext(LoginContext);
    const [results, setResults] = useState(0);
    const [page, setPage] = useState(1);
    const [background1, setBackground1] = useState([]);
    const [background2, setBackground2] = useState([]);
    const [background3, setBackground3] = useState([]);
    const [background4, setBackground4] = useState([]);
    const trending = async () => {
        console.log("a");
        setLoader(true);
        const response = await fetch('https://api.themoviedb.org/3/movie/' + data1.id + '?api_key=' + API_KEY + '&append_to_response=videos,credits,images,similar&page=' + page);
        const data = (await response.json());
        setData(data);
        setBackdrops(data.images.posters);
        setBackground1(data.images.posters[0]);
        setBackground2(data.images.posters[1]);
        setBackground3(data.images.posters[2]);
        setBackground4(data.images.posters[4]);
        setLoading(data.videos.results);
        setGenre(data.genres.slice(0, 2));
        setProuction(data.production_companies.slice(0, 2));
        setVideo(data.videos.results[0]);
        setCast(data.credits.cast.slice(0, 4));
        setLoader(false);
    };
    const simi = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/' + data1.id + '?api_key=' + API_KEY + '&append_to_response=videos,credits,images,similar&page=' + page);
        const data = (await response.json());
        setRecommend(data.similar.results.slice(ini, final));
        setResults(data.similar.results.length);
    };
    const handleMouseIn = event => {
        event.currentTarget.style.opacity = '0.9';
    };
    const handleMouseOut = event => {
        event.currentTarget.style.opacity = '1';
    };
    let find = loading.find(vid => vid.name === 'Official Trailer');
    useEffect(() => {
        trending();
    }, []);
    useEffect(() => {
        simi();
    }, [final])

    // backgroundImage: "url(https://image.tmdb.org/t/p/w500" + background1.file_path + ")"
    // backgroundImage: 'url(https://image.tmdb.org/t/p/w500' + data.backdrop_path + ')'
    const [count, setCount] = useState(0);
    const background = {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };
    const title = {
        color: "#f5c518",
        marginTop: "0",
        fontWeight: "700",
        fontSize: "5vw",
        textAlign: "center",
        opacity: "1"
    }
    const styles = {
        height: "30vw",
        width: "20vw",
        borderRadius: "20px"
    }
    let a = "";
    let b = "";
    if (video && video.key) {
        b = video.key;
    }
    if (find && find.key) {
        a = find.key;
    }
    else if (video && video.key) {
        a = video.key;
    }
    const onClickFor = () => {
        if (final + 4 > results) {
            setPage(page + 1);
            setIni(0);
            setFinal(4);
        }
        else {
            setIni(ini + 4);
            setFinal(final + 4);
        }
    }
    const onClickBack = () => {
        if (ini - 4 > 0) {
            setIni(ini - 4);
            setFinal(final - 4);
        }
        else if (page > 1) {
            setPage(page - 1);
            setIni(results - 4);
            setFinal(results);
        }
    }
    const func = () => {
        setLight(!light);
    }
    const link = 'https://www.youtube.com/embed/' + a;
    const video_link = 'https://www.youtube.com/embed/' + b;
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;
    const background_path1 = {
        width: "100vw",
        height: "205vh",
        position: "absolute",
        zIndex: "-1",
    }
    const background_path = {
        width: "100vw",
        height: "115vh",
        position: "absolute",
        zIndex: "-1",
        top: "205vh"
    }
    const background_path2 = {
        width: "100vw",
        height: "180vh",
        position: "absolute",
        zIndex: "-1",
        top: "320vh"
    }
    const background_path3 = {
        width: "100vw",
        height: "160vh",
        position: "absolute",
        zIndex: "-1",
        top: "500vh"
    }
    const background_path4 = {
        width: "100vw",
        height: "90vh",
        position: "absolute",
        zIndex: "-1",
        top: "660vh"
    }
    return (
        loader ? <Loader /> : <>
            <div>
                <div style={{ backgroundImage: "url(" + img1 + ")", backgroundSize: "cover" }}>
                    <div>
                        <h5 className="title" style={title}>
                            {data.title}
                        </h5>
                    </div>
                    <div style={{ display: "flex", marginTop: "5%",height:"80vh" }}>
                        <img src={"https://image.tmdb.org/t/p/w500" + data.poster_path} alt="Norther Lights" style={{ opacity: "1", width: "25vw", height: "30vw", float: "left", flex: "3", marginLeft: "3%" }} />
                        <div style={{ marginLeft: "50px", flex: "10" }}>
                            <div style={{ color: "#f5c518", fontSize: "3vw" }}>
                                {production.map((user) => (
                                    <div style={{ marginBottom: "2%" }}>
                                        {user.name}
                                    </div>
                                ))}
                            </div>
                            <div>
                                {genre.map((user) => (
                                    <span className="badge rounded-pill bg-light text-dark" style={{ marginRight: "1%" }}>{user.name}</span>
                                ))}
                            </div>
                            <div >
                                <h5 style={{ color: "#f5c518", fontSize: "3vw" }}>Release Date:</h5>
                                <h5 style={{ left: "100%", color: "black", fontSize: "2vw", marginBottom: "4vh" }}>
                                    {data.release_date}
                                </h5>
                            </div>
                            <div className="desc">
                                <h5 style={{ left: "100%", color: "white", fontSize: "1.5vw", wordWrap: "break-word" }}>
                                    {data.overview}
                                </h5>
                            </div>
                            <button type="button" className="btn btn-outline-primary" style={{ marginTop: "2%", marginBottom: "2%", backgroundColor: "black" }}><a href={data.homepage} style={{ textDecoration: "none", color: "white" }}>LEARN MORE</a></button>
                        </div>
                    </div>
                    {a ? <iframe id="existing-iframe-example"
                        style={{height:"100vh",width:"100vw"}}
                        src={link}
                        frameBorder="0"
                    ></iframe> : b && <iframe id="existing-iframe-example"
                    style={{height:"100vh",width:"100vw"}}
                        src={video_link}
                        frameBorder="0"
                    ></iframe>}
                    <div>
                        <h5 style={{ color: "#f5c518", fontSize: "7vw", textAlign: "center", wordWrap: "break-word" }}>
                            {data.tagline}
                        </h5>
                    </div>
                    <hr style={{ backgroundColor: "black", height: "0.8vh" }}></hr>
                    <h5 style={{ color: "#f5c518", fontSize: "7vw", marginTop: "2%", whiteSpace: "nowrap" }}>
                        Top Cast:
                    </h5>
                    <div style={{ display: "flex", flexWrap: "nowrap", justifyContent: "space-between", marginBottom: "4vh" ,color: "#f5c518"}}>
                        {cast.map((user) => (
                            user.profile_path && <div style={{ width: "24%", marginTop: "4vh" }}>
                                <img src={"https://image.tmdb.org/t/p/w500" + user.profile_path} style={{ borderRadius: "20px" }} alt="Norther Lights" onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} />
                                <div style={{ color: "#f5c518", fontSize: "3vmin", width: "24vw", wordWrap: "break-word" }}>
                                    <h>{user.character}</h>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr style={{ backgroundColor: "black", height: "0.8vh", marginTop: "0", marginBottom: "0" }}></hr>
                </div>
                <div style={{ color: "#f5c518", fontSize: "5vw", textAlign: "center", paddingTop: "5%", paddingBottom: "1%", backgroundImage: "url(" + img2 + ")", backgroundSize: "cover" }}>
                    {backdrops.length>0 && <div style={{ marginBottom: "3vh" }}>
                        {data.title + " Wallpapers"}
                    </div>}
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "4vh" }}>
                        {backdrops.slice(0, 8).map((user) => (
                            user.file_path && <div style={{ width: "25%", marginBottom: "3vh" }}>
                                <img src={"https://image.tmdb.org/t/p/w500" + user.file_path} alt="Paris" style={styles} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} />
                            </div>
                        ))}
                    </div>
                    {backdrops.length>0 && <button type="button" className="btn btn-outline-primary" style={{ marginTop: "2%", marginBottom: "2%", backgroundColor: "black" }}><Link to="/Images" state={backdrops} style={{ color: "white", textDecoration: "none" }}>More Wallpapers</Link></button>}
                    {backdrops.length>0&&<hr style={{ backgroundColor: "black", height: "0.8vh" }}></hr>}
                    {loading.length>0 && <div style={{ paddingTop: "2vh" }}>
                        {data.title + " Videos"}
                    </div>}
                    <div className="row" style={{ marginTop: "2%" }}>
                        {loading.slice(0, 4).map((user) => (
                            <div className="column">
                                {user.key && <iframe id="existing-iframe-example"
                                    style={{ borderRadius: "20px",width:"45vw",height:"45vh" }}
                                    src={'https://www.youtube.com/embed/' + user.key}
                                    frameBorder="0"
                                ></iframe>}
                            </div>
                        ))}
                    </div>
                    {loading.length>0 && <button type="button" className="btn btn-outline-primary" style={{ marginTop: "2%", marginBottom: "2%", backgroundColor: "black" }}><Link to="/Videos" state={loading} style={{ textDecoration: "none", color: "white" }}>More Videos</Link></button>}
                    {loading.length>0 &&<hr style={{ backgroundColor: "black", height: "0.8vh" }}></hr>}
                </div>
                <div style={{ color: "#f5c518", fontSize: "5vw", textAlign: "center", paddingTop: "5%", paddingBottom: "1%", backgroundImage: "url(" + img3 + ")", backgroundSize: "cover" }}>
                    <div>
                        Similar Movies
                    </div>
                    <div className='row' style={{ position: "relative", marginTop: "3vh", marginLeft: "1.5vw" }}>
                        <button onClick={onClickBack} style={{ width: "4%", height: "9%", backgroundColor: "transparent", borderColor: "transparent", borderRadius: "40px", position: "absolute", zIndex: "2", left: "-3.5vw", top: "35%" }}><FontAwesomeIcon icon={faCircleChevronLeft} style={{ zIndex: "2", width: "7vw", height: "7vh" }} color={light ? "#f5c518" : "white"} /></button>
                        <button onClick={onClickFor} style={{ width: "4%", height: "9%", backgroundColor: "transparent", borderColor: "transparent", borderRadius: "40px", position: "absolute", zIndex: "2", right: "9vw", top: "35%" }}><FontAwesomeIcon icon={faCircleChevronRight} style={{ zIndex: "2", width: "7vw", height: "7vh" }} color={light ? "#f5c518" : "white"} /></button>
                        {recommend.map((user) => (
                            <div className="container" key={user.id} style={{ position: "relative", paddingLeft: "0", paddingRight: "0" }}>
                                <Link to="/Page" state={user}>
                                    <div className='rating' >
                                        <FontAwesomeIcon icon={faStar} style={{ color: light ? "#f5c518" : "white", width: "8%", height: "8%", position: "absolute", left: "1vw", top: "1vh" }} />
                                        <span style={{ color: light ? "#f5c518" : "white", fontSize: "1.5vw", position: "absolute", left: "15%", top: "2.5%" }}>{user.vote_average}</span>
                                    </div>
                                    <div className="polaroid" style={{ height: "80%", width: "20vw", color: "black" }}>
                                        <img src={"https://image.tmdb.org/t/p/w500" + user.poster_path} alt="Norther Lights" style={{ width: "100%", height: "100%", borderRadius: "10px" }} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} />
                                        <button type="button" style={{ backgroundColor: light ? "white" : "black", whiteSpace: "nowrap", overflow: "hidden", textDecoration: "none", position: "absolute", top: "75%", left: "22%", fontSize: "1.2vw", paddingTop: "1%", paddingRight: "4%", paddingLeft: "4%", paddingBottom: "1%", borderRadius: "50px 50px 50px 50px", textOverflow: "----" }}><Link to="/Trailer" state={user} style={{ textDecoration: "none", color: light ? "black" : "white" }}><FontAwesomeIcon icon={faPlay} size="1x" />   Watch Trailer</Link></button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Page;
// {a.length > 0 &&
//     (a).map((user) => (
//         user.name
//     ))
// }