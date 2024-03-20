// Home.js
import React from 'react';
import './Home.css'; 
import homeImage from '../assets/stock-teaching-image.png';
import { Link } from 'react-router-dom';

//The best way to visualize this when creating your own pages is to put a background-color on each of the div elements
//You can use a lot of the css I used on this Home.css for your own pages or understanding of what they do


function Home() {
    return (
        <div className="Home">
            <div className="Home-screen">
                <nav className="Home-nav">
                    <div className="Home-nav-logo">
                        <a href="/">GROUPER</a>
                    </div>
                    <div className="Home-nav-links">
                    <Link to="/browse">BROWSE</Link>
                        <Link to="/BadAddGroup.html">BadAddGroup</Link>
                        <Link to="/tasks">TASKS</Link> {}
                        <Link to="/groups">GROUPS</Link> {}
                        <Link to="/login">SIGN IN</Link> {}
                    </div>
                </nav>
                <div className="Home-second">
                    <div className="Home-header-container">
                        <div className="Home-header" >
                            Embark on Your Learning Adventure
                        </div>
                        <div className="Home-subheader">
                            <Link to="/register">Get Started</Link> { }
                        </div>
                    </div>
                    <img src={homeImage} alt="Home" />
                </div>
            </div>
        </div>
    );
}

export default Home;
