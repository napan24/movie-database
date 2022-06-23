import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Image1.css';
import {
    Link
} from "react-router-dom";
function Trailer() {
    const [data, setData] = useState([]);
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState([]);
    const trending = async () => {
        fetch('https://api.themoviedb.org/3/movie/' + data1.id + '?api_key=456737a4f09595605c3e1f4945b38c73&append_to_response=videos,credits,images').then((res) => res.json()).then((data) => {
            setData(data);
            setLoading(data.videos.results);
            setVideo(data.videos.results[0]);
        })
    };
    useEffect(() => {
        trending();
    }, []);
    let find = loading.find(vid => vid.name === 'Official Trailer');
    const location = useLocation();
    const data1 = location.state;
    let a = video.key;
    if (find && find.key) {
        a = find.key;
    }
    const link = 'https://www.youtube.com/embed/' + a;
    return (
        <>
            <div style={{ backgroundColor: "black" }}>
                <div className="row1" style={{ marginTop: "2%" }}>
                    <iframe id="existing-iframe-example"
                        width="100%" height="500px" style={{ borderRadius: "20px" }}
                        src={link}
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </>
    );
}
export default Trailer;
