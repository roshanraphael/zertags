import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import QRIcon from "../../assets/qr.svg";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed navbarCustom">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
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
                marginRight: "4px"
              }}/>
             <h4 className="navTitle">ZerTags</h4>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
