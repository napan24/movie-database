import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'react-slideshow-image/dist/styles.css';
import './image.css';
import {
    Link
    
} from "react-router-dom";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from './Light';
import Loader from './Loader';
function Latest() {
    const [data, setData] = useState([]);
    const [ini, setIni] = useState(0);
    const [user,setUser]=useState({});
    const [final, setFinal] = useState(4);
    const [results, setResults] = useState(0);
    const [page, setPage] = useState(1);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [loading, setLoading] = useState(false);
    const trending = async () => {
        setLoading(true);
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&region=IN&page=' + page);
        const data = (await response.json());
        setResults(data.results.length);
        setData(data.results.slice(ini, final));
        setLoading(false);
        var profile_obj = localStorage.getItem('profile_data');
        var profile_obj1=JSON.parse(profile_obj);
        setUser(profile_obj1);
    };
    useEffect(() => {
        trending();
    }, [final]);
    const handleMouseIn = event => {
        event.currentTarget.style.opacity = '0.9';
    };
    const handleMouseOut = event => {
        event.currentTarget.style.opacity = '1';
    };
    const addFav=async (e,user_data) =>{
        e.preventDefault();
        var movieid=user_data.id;
        var email=user.email;
        const res= await fetch("/addfav",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,user_data,movieid})
        });
        const result=await res.json();
        console.log(result);
    }
    const { light, setLight } = useContext(LoginContext);
    const color = light ? "black" : "#f5c518";
    const fontColor = light ? "#f5c518" : "black";
    const headingsty = {
        color: fontColor,
        fontWeight: "700",
        marginLeft: "1vw",
        fontSize: "3.3vw"
    };
    const background = {
        backgroundColor: color
    };

    const onClickBack = () => {
        if (ini - 4 < 0) {
            setPage(page - 1);
            setIni(results - 4);
            setFinal(results);
        }
        else {
            setIni(ini - 4);
            setFinal(final - 4);
        }
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
    const hov = {
        width: "100%",
        height: "75%",
        borderRadius: "20px"
    };
    return (
        loading ? <Loader /> :
            <>
                <div className="background" style={{ width: "100vw",backgroundColor:light?"black":"#f5c518" }}>
                    <div className="title" style={{ fontSize: "3vw", color: light?"#f5c518":"black",marginBottom:"3vh" }}>
                        Latest
                    </div>
                    <div style={{position:"relative"}}>
                    <FontAwesomeIcon onClick={onClickBack} icon={faCircleChevronLeft} style={{ zIndex: "5",borderRadius: "40px", width: "7vw", height: "7vh", position: "absolute", left: "-1vw", top: "30vh",cursor:"pointer" }} color={light ? "#f5c518" : "white"} />
                        <FontAwesomeIcon onClick={onClickFor} icon={faCircleChevronRight} style={{ zIndex: "2", width: "7vw", height: "7vh",borderRadius: "40px", position: "absolute", right: "0vw", top: "30vh",cursor:"pointer" }} color={light ? "#f5c518" : "white"} />
                        
                        <div style={{ width: "100vw",display:"flex",justifyContent:"space-between" }} >
                            {data.map((user) => (
                                <div className="box" key={user.id} style={{ width: "22%", float: "left",marginRight:"5vh",position: "relative",backgroundImage:"url(https://image.tmdb.org/t/p/w500" + user.poster_path+ ")",borderRadius:"15px",backgroundSize:"cover",backgroundRepeat:"no-repeat" ,backgroundPosition:"center"}}>
                                    <Link to="/Page" state={user}>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} style={{ color: light ? "#f5c518" : "white", width: "12%", height: "8%", position: "absolute", left: "2%", top: "2%", zIndex: "2" }} />
                                            <span style={{ color: light ? "#f5c518" : "white", fontSize: "2vw", position: "absolute", left: "15%", top: "3%", zIndex: "2" }}>{user.vote_average}</span>
                                        </div>
                                    </Link>
                                    <button style={{ backgroundColor: light ? "white" : "black", whiteSpace: "nowrap", overflow: "hidden", textDecoration: "none", position: "absolute", top: "98%", left: "25%", fontSize: "1.2vw", paddingTop: "1%", paddingRight: "4%", paddingLeft: "4%", paddingBottom: "1%", borderRadius: "50px 50px 50px 50px", textOverflow: "----" }}><Link to="/Trailer" state={user} style={{ textDecoration: "none", color: light ? "black" : "white" }}><FontAwesomeIcon icon={faPlay} size="1x" />   Watch Trailer</Link></button>
                                    <button>
                                        <FontAwesomeIcon icon={faCirclePlus} style={{ height: "7%", position: "absolute", right: "-5%", top: "-2%" }} color="white" onClick={(e) => { addFav(e, user); }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
    );
}
export default Latest;
