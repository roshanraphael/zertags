import React, { useState, useEffect, useRef } from "react";
import { Link, StaticRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import { getItems } from "../../actions/itemActions";
import "./Dashboard.css";
import QrReader from 'react-qr-scanner';
import QRCodeStyling from "qr-code-styling";
import axios from 'axios';

// import { useAlert } from 'react-alert'
import store from './../../store'


const ScanQR = ({ setScanResult, history }) => {
  // const alert = useAlert()
  const handleCamError = (error) => {
    console.log(error);
  };
  const handleCamScan = (result) => {
    if (result) {
      setScanResult(result.text);
      const itemId = result.text.split('/').at(-1);
      console.log(itemId);
      history.push(`/item/${itemId}`);
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

const QRViewer = props => {
  const item = props.item;
  const ref = useRef(null);
  const [qrCode] = useState(new QRCodeStyling({
    width: 300,
    height: 300,
    data: `http://localhost:3000/item/${item._id}`,
    dotsOptions: {
      color: "#222"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  }));
  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);
  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: '.png'
    })
  }
  return (
    <>
    <div ref={ref} />
    <button onClick={onDownloadClick}>Download</button>
    </>
  )
}

const Dashboard = props => {
  console.log(props);
  const dispatch = props.dispatch;
  const history = props.history;
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const { user } = props.auth;
  // const { items } = props.items;
  const [items, setItems] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async (user) => {
      console.log('sds');
      const { data } = await axios.get("http://localhost:5000/api/items/", {
        params: {
          email: user.email
        }
      }
      );
      return data.items;
    }
    fetchItems(user).then(data => {
      setItems(data)
      isLoading(false);
    });
  }, [])

  console.log("Items: ", items);
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };
  const toggleShowScanner = () => {
    setShowScanner(!showScanner);
  }
  // if (user) {
  //   props.getItems(user);
  // }
  return (
    <div style={{ height: "75vh", flexDirection: "column", color: "white" }} className="container valign-wrapper">
      <div className="row">
        <div className="landing-copy col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]} <span className="emoji" aria-label="waving emoji" role="img">👋</span>
            <p className="flow-text grey-text text-lighten-4">
              Get started with generating a QR Code for your items or report a lost item.
            </p>
          </h4>
        </div>
      </div>

      <div className="row" style={{
        margin: "auto 0",
        width: "100%"
      }}>

        <div className="col s12" style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <div className="row" style={{

          }}>
            <div className="col s12">
              <button
                style={{
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  width: "400px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-4"
                onClick={e => toggleShowScanner(!showScanner)}
              >
                {showScanner ?
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
            {showScanner ?
              (
                <div className="col s12">
                  <ScanQR
                    setScanResult={setScanResult}
                    history={history}
                  />
                  {/* <h3>{scanResult}</h3> */}
                </div>
              )
              : ''
            }



          </div>
        </div>
        <div className="col s12" style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Link
            to="/generateQR"
            style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              width: "400px"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-4"
          >
            Generate a new QR <span className="emoji" aria-label="gear emoji" role="img">⚙️</span>
          </Link>
        </div>
        {/* <div className="col s12" style={{
          display: "flex",
          justifyContent: "center"
        }}> */}
        <button
          style={{
            width: "150px",
            borderRadius: "8px",
            letterSpacing: "1.5px",
            // marginTop: "0.75rem",
            position: "fixed",
            right: "1rem",
            top: "1rem",
            zIndex: "999"
          }}
          onClick={onLogoutClick}
          className="btn waves-effect waves-light hoverable red accent-3"
        >
          Logout <span className="emoji" aria-label="door emoji" role="img">🚪</span>
        </button>
        {/* </div> */}
      </div>
      <div className="row" style={{
        width: "100%"
      }}>
        <div className="col s12">
          {loading ? (
            <h6>Loading...</h6>
          ) : items && items.length > 0 ? (
            <>
              <h5>Your items:</h5>
              <div className="row">
                {items.map((item, key) => {
                 
                  return (
                    <div className="col s12 m6 l4" key={key}>
                      <div className="card" key={item._id} style={{
                        margin: "1rem"
                      }}>
                        <div className="card-image waves-effect waves-block waves-light">
                         <QRViewer
                          item={item}
                         />
                          {/* <img className="activator" src="https://ae01.alicdn.com/kf/HTB1PWh8a4_rK1RkHFqDq6yJAFXam/kitten-Diamond-Embroidery-sale-cute-cat-Picture-Of-Rhinestone-pet-DIY-Diamond-Painting-Cross-Stitch-Full.jpg_Q90.jpg_.webp" /> */}
                        </div>
                        <div className="card-content waves-effect waves-block waves-light activator">
                          <span className="card-title grey-text text-darken-4">{item.name}</span>
                        </div>
                        <div className="card-reveal">
                          <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                          <p>Here is some more information about this product that is only revealed once clicked on.</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <h6>You have not added any items yet.</h6>
          )}
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
