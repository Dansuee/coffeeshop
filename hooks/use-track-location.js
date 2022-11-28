import { useState } from "react";

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [latLong, setLatLong] = useState('')
   
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude}, ${longitude}`);
        setLocationErrorMsg('');
    }

    const error = () => {
        setLocationErrorMsg('Unable to retrieve your location');
    }

    const handleTrackLocation = () => {
        if(!navigator.geolocation) {
           setLocationErrorMsg('geolocation not supported to you browser')
        }else {
            navigator.geolocation.getCurrentPosition(success,error)
        }
    };
      
    return {
        latLong,
        handleTrackLocation,
        locationErrorMsg
    }
}


export default useTrackLocation;