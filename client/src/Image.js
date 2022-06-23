import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Image1.css';
import {
    Link
} from "react-router-dom";
function Image() {
    const location = useLocation();
    const data = location.state;
    console.log(data);
    return (
        <>
            <div style={{ backgroundColor: "black" }}>
                <div className="row1" style={{ marginTop: "2%" }}>
                    {data.map((user) => (
                        <div className="column1">
                            <img src={"https://image.tmdb.org/t/p/w500" + user.file_path} alt="Paris" style={{height:"300px",width:"200px",borderRadius:"20px"}} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Image;
