import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import QRIcon from "../../assets/qr.svg";
const Navbar = () => {
  let listener = null;
  const [scrollState, setScrollState] = useState(false);
  // set to true if page scrolled
  useEffect(() => {
    console.log(scrollState)
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 50) {
        if (!scrollState) {
          setScrollState(true)
        }
      } else {
        if (scrollState) {
          setScrollState(false)
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])
  return (
    <div className="navbar-fixed navbarCustom">
      <nav className="z-depth-0" style={{
        background: scrollState ? "rgb(0,0,0,0.9)" : "transparent"
      }}>
        <div className="nav-wrapper">
          <Link
            to="/"
            style={{
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              fontSize: "3rem"
            }}
            className="col s5 brand-logo center black-text"
          >
            <img src={QRIcon} alt="logo" style={{
              height: "2.5rem",
              marginRight: "4px",
              color: "#fff"
            }} />
            <h4 className="navTitle">ZerTags</h4>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
