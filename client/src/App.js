import React, { createContext, useEffect, useState } from 'react';
import './Slider.css';
import './App.css';
import Featured_today from './Featured_today';
import Image from './Image';
import Videos from './Videos';
import Navbar from './Navbar';
import Trailer from './Trailer';
import { Login } from './Login';
import { Signup } from './Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from './Page';
import Profile_login from './Profile_login';
import Profile_page from './Profile_page';
import Home from './Home';
import { LoginContext } from './Light';
import { LoginContext1 } from './profile_data';
function App() {
  const [light, setLight] = useState(false);
  const [data, setData] = useState([]);
  return (
    <>
      <LoginContext1.Provider value={{ data, setData }}>
        <LoginContext.Provider value={{ light, setLight }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<Profile_page />} />
              <Route exact path="/Home" element={<Home />} />
              <Route exact path="/Page" element={<Page />} />
              <Route exact path="/Videos" element={<Videos />} />
              <Route exact path="/Images" element={<Image />} />
              <Route exact path="/Trailer" element={<Trailer />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </LoginContext1.Provider>
    </>
  );
}

export default App;
