import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useEffect, useState, useRef } from 'react';
import QRCodeStyling from "qr-code-styling";

import axios from 'axios';
import Loader from '../Loader/Loader';
import GeoLocator from '../geolocater/GeoLocater';
import Locater from "../Locater/Locater";

const QRViewer = props => {
    const item = props.item;
    const ref = useRef(null);
    const [qrCode] = useState(new QRCodeStyling({
        width: 400,
        height: 400,
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
        // <div className={props.className}>
        <div ref={ref} />
        // <button className="btn" onClick={onDownloadClick}>Download</button> */}
        // </div>
    )
}


const Item = (props) => {
    const { id } = useParams();
    const { user } = props.auth;
    window.scrollTo(0, 0);
    const [item, setItem] = useState(null);
    const [loading, isLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const askLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            setLocation(position.coords);
        })
    }
    useEffect(() => {
        const fetchItems = async (user) => {
            const { data } = await axios.get("http://localhost:5000/api/items/", {
                params: {
                    email: user.email
                }
            }
            );
            return data.items;
        }
        fetchItems(user).then(data => {
            console.log(data);
            const res = data.filter(i => i._id === id)[0];
            console.log(res);
            setItem(res);
            isLoading(false);
        });
    }, [])

    return (
        <>
            <div style={{ height: "75vh", flexDirection: "column", color: "white" }} className="container valign-wrapper">
                {loading ? (
                    <Loader style={{
                        position: 'absolute',
                        top: '50vh',
                        left: '50vw'
                    }} />
                ) :
                    item ? (
                        <>
                            <div className="row" style={{
                                width: "100%"
                            }}>
                                <div className="col s12 l6">
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                    <QRViewer item={item} />
                                </div>
                                <div className="col s12 l6">
                                    <button className="btn btn-large" onClick={() => askLocation()}>Send Location</button>
                                    {location ? (
                                        <>
                                            <GeoLocator location={location} />
                                            {/* <Locater location={location} /> */}
                                        </>
                                    ) : ''}
                                </div>
                            </div>

                        </>
                    )
                        : ''}
            </div>
        </>
    )
};

Item.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    items: state.items
});

export default connect(
    mapStateToProps,
)(Item);