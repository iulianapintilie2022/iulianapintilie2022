import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../logo.png';
import './navbar.css';
import copylink from "../copy.png";


export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

    return (
        <header>
            <nav> 
                <div className="site__navbar gradient__bg">
            
                    <div className="site__navbar-links_logo">
                        <NavLink to="/" exact>
                        <img src={logo} alt="Logo" />
                        </NavLink> </div>


                 
                     <div className="site__navbar-links_container">
                            <NavLink to="/post" className="site__navbar-links">Blog Posts</NavLink>
                            <NavLink to="/project" className="site__navbar-links">Projects</NavLink>
                            <NavLink to="/about" className="site__navbar-links">About Me</NavLink>
                     </div>
                   
            <div className="social">
                        <div className="social-copy">
                            <button onClick={copy} className="social-copy-button">{!copied ? "🔗" : "📋"}</button> </div>
                <SocialIcon url="https://github.com/iulianapintilie2022" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
                <SocialIcon url="https://www.facebook.com/iulianapintilie517" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
                <SocialIcon url="https://www.linkedin.com/in//iuliana-pintilie-a2bb14208" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
                <SocialIcon url="https://www.instagram.com/i.aestheticals/" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
                <SocialIcon url="https://www.freelancer.com/u/iuliana2017" target="_blank" fgColor="#fff" style={{ height: 35, width: 35 }} />
               
            </div>
                    <div className='site__navbar-menu'>
                        {toggleMenu
                            ? <RiCloseLine color="white" onClick={() => setToggleMenu(false)} />
                            : <RiMenu3Line color="white" onClick={() => setToggleMenu(true)} />}
                        {toggleMenu && (
                            <div className='site__navbar-menu_container scale-up-ver-bottom'>
                                <div className='site__navbar-menu_container-links'>
                                    <NavLink to="/post" className="site__navbar-links">Blog Posts</NavLink>
                                    <NavLink to="/project" className="site__navbar-links">Projects</NavLink>
                                    <NavLink to="/about" className="site__navbar-links">About Me</NavLink>
                                </div>
                            </div>)}
                    </div>

    
            </div>
            </nav>
        </header>
    )
}