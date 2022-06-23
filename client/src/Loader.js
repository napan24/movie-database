import React, { useEffect, useContext, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import RingLoader from "react-spinners/RingLoader";
function Loader() {

    return (
        <>
            <div style={{ position: "absolute", left: "35vw", top: "20vh", backgroundColor: "black" }}>
                <RingLoader color="#1C4166" loading size={350} />
            </div>
            <h5 style={{ position: "absolute", right: "35vw", bottom: "0", fontSize: "10vmin" }}>LOADING...</h5>
        </>
    );
}

export default Loader;
