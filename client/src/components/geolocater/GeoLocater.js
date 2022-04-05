// import { geolocated } from "react-geolocated";
import { useState } from 'react';
const GeoLocater = props => {
    const [location, setLocation] = useState(null);
    const askLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            setLocation(position.coords);
        })
    }
    return (
        <div>
            {location ? (
                <>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </>
            ) : ''}
        </div>
    )
}
export default GeoLocater;
// const GeoLocater = props => {
//     return !props.isGeolocationAvailable ? (
//         <div>Your browser does not support Geolocation</div>
//     ) : !props.isGeolocationEnabled ? (
//         <div>Geolocation is not enabled</div>
//     ) : props.coords ? (
//         <pre></</pre>
//     ) : (
//         <p>Getting location</p>
//     );
// }
// export default geolocated({
//     positionOptions: {
//         enableHighAccuracy: false,
//     },
//     userDecisionTimeout: 5000,
// })(GeoLocater);