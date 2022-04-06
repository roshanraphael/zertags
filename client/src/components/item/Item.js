import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useEffect, useState, useRef } from 'react';
import QRCodeStyling from "qr-code-styling";
import { useLocation, Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Loader from '../Loader/Loader';
import GeoLocator from '../geolocater/GeoLocater';
import Locater from "../Locater/Locater";

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
        // <div className={props.className}>
        <div ref={ref} />
        // <button className="btn" onClick={onDownloadClick}>Download</button> */}
        // </div>
    )
}


const Item = (props) => {
    const local = useLocation();
    const history = useHistory();
    const { id, userId } = useParams();
    const { user } = props.auth;
    window.scrollTo(0, 0);
    const [item, setItem] = useState(null);
    const [loading, isLoading] = useState(true);
    const [localUser, setLocalUser] = useState({})
    const [success, setSuccess] = useState('')
    const [uId, setUId] = useState('')

    useEffect(() => {
        setLocalUser(JSON.parse(localStorage.getItem('user')))

        const fetchItems = async (user) => {
            const { data } = await axios.get(`http://localhost:5000/api/items/${id}/${userId}`);
            return data;
        }
        fetchItems(user).then(data => {
            console.log("FNOVEBIBVIFE",data);
            // const res = data.filter(i => i._id === id)[0];
            // console.log(res);
            setItem(data.data);
            setUId(data.userId)
            isLoading(false);
        });
    }, [])

    const [location, setLocation] = useState(null);
    const [message, setMessage] = useState('');
    const askLocation = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            setLocation(position.coords);
        })
    }
    const onChange = e => {
        setMessage(e.target.value);
    }
    const addNotif = async () => {
        console.log(item);
        console.log(user._id);
        const { data } = await axios.post(`http://localhost:5000/api/items/notif/${item._id}/${userId}`, {
            latitude: location.latitude || '',
            longitude: location.longitude || '',
            message,
        });
        setSuccess('Location post successfully')
            setTimeout(() => {
            history.push("/dashboard");      
            }, 3000)
        return data;
    };
    const handleSubmit = e => {
        e.preventDefault();
        console.log(location);
        console.log(message);
        addNotif();
    }
   
    return (
        <>
            <div style={{ height: "75vh", paddingTop: "5vh", flexDirection: "column", color: "white" }} className="container valign-wrapper">
                
            <Link to="/dashboard" className="btn-flat waves-effect" style={{
                        color: "#EEE"
                    }}>
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        Dashboard
                    </Link>

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
                                {uId === localUser._id ? null : 
                                    <div className="col s12 l6">
                                    <form>
                                        <div>
                                            Hey, thanks for finding my lost item. Could you please help me with the details to contact you?
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="messageBox">Message</label>
                                            <input value={message} onChange={e => onChange(e)} id="messageBox" type="text" name="message" rows={5} />
                                        </div>
                                        <button className="btn btn-small" onClick={(e) => askLocation(e)}>Add location</button>
                                        <p><button className="btn" type="submit" onClick={e => handleSubmit(e)}>Submit</button></p>
                                            {success !== "" ? <div className="green darken-1 text-lighten-1 badge"><div style={{padding: 10}}>
                                            <h5>{success}</h5></div></div> : null}
                                        {location ? (
                                            <>
                                                <GeoLocator location={location} />
                                                {/* <Locater location={location} /> */}
                                            </>
                                        ) : ''}
                                    </form>
                                    </div>
                                }
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