import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Dashboard.css";
import QrReader from 'react-qr-scanner';
const ScanQR = ({ setScanResult }) => {
  const handleCamError = (error) => {
    console.log(error);
  };
  const handleCamScan = (result) => {
    if (result) {
      setScanResult(result.text);
    }
  }
  return (
    <QrReader
      onError={handleCamError}
      onScan={handleCamScan}
      delay={1000}
      style={{ width: '100%' }}

    />
  );
}
const Dashboard = props => {
  console.log(props);
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const { user } = props.auth;
  const items = props.items;
  console.log("Items: ", items);
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };
  const toggleShowScanner = () => {
    setShowScanner(!showScanner);
  }
  useEffect(() => {
    if (!showScanner) {
      
    }
  }, [showScanner]);
  return (
    <div style={{ height: "75vh", flexDirection: "column" }} className="container valign-wrapper">
      <div className="row">
        <div className="landing-copy col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]} <span className="emoji" aria-label="waving emoji" role="img">👋</span>
            <p className="flow-text grey-text text-darken-1">
              Get started with generating a QR Code for your items or report a lost item.
            </p>
          </h4>
        </div>
      </div>

      <div className="row" style={{
        margin: "auto 0",
        width: "100%"
      }}>

        <div className="col s12 m6" style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <div className="row" style={{
            margin: "auto 0",
            width: "100%"
          }}>
            <div className="col s12">
            <button
              style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-4"
              onClick={e => toggleShowScanner(!showScanner)}
            >
              { showScanner ? 
              <>
                Turn camera off <span className="emoji" aria-label="turn off emoji" role="img">🚫</span>
              </>
              : (
                <>
                  Scan QR to report lost item  <span className="emoji" aria-label="magnifying glass emoji" role="img">📷</span>
                </>
              )}
            </button>

            </div>
            { showScanner ?
            (
              <div className="col s12">
              <ScanQR
                setScanResult={setScanResult}
              />
              <h3>{scanResult}</h3>
              </div>
            ) 
             : ''
            }
            
           
           
          </div>
        </div>
        <div className="col s12 m6" style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Link
            to="/generateQR"
            style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-4"
          >
            Generate a new QR <span className="emoji" aria-label="gear emoji" role="img">⚙️</span>
          </Link>
        </div>
        <div className="col s12" style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "2rem"
            }}
            onClick={onLogoutClick}
            className="btn waves-effect waves-light hoverable red accent-3"
          >
            Logout <span className="emoji" aria-label="door emoji" role="img">🚪</span>
          </button>
        </div>
      </div>
    </div>
  );
  // }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
