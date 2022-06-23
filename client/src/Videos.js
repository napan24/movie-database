import 'react-slideshow-image/dist/styles.css';
import './image.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
function Videos() {
    const location = useLocation();
    const data = location.state;
    console.log(data);
    return (
        <>
            <div style={{ backgroundColor: "black" }}>
                <div className="row" style={{ marginTop: "2%" }}>
                    {data.map((user) => (
                        <div className="column">
                            {user.key && <iframe id="existing-iframe-example"
                                width="90%" height="350" style={{ borderRadius: "20px" }}
                                src={'https://www.youtube.com/embed/' + user.key}
                                frameBorder="0"
                            ></iframe>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Videos;
