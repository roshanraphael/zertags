// import { geolocated } from "react-geolocated";
import { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const API_KEY = 'AIzaSyBBgjGhKUYq7RtCDJV5ZtwQYHF5qXkHHwc';

const mapStyles = {
    width: '100%',
    height: '100%'
};

const GeoLocater = (props) => {
    const { location, google } = props;
    console.log(location);
    return (
        <div>
            {location ? (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                    <Map
                        google={google}
                        zoom={15}
                        style={{
                            // width: '100%',
                            // height: '100%',
                            width: '100%',
                            height: '100%',
                            maxWidth: '500px',
                            maxHeight: '500px'
                        }}
                        initialCenter={{
                            lat: location.latitude,
                            lng: location.longitude
                        }}
                    >
                        <Marker
                            // onClick={this.onMarkerClick}
                            name={'This is test name'}
                        />
                    </Map>
                </div>
            ) : ''}
        </div>
    )
}
export default  GoogleApiWrapper({
    apiKey: API_KEY
  })(GeoLocater);
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