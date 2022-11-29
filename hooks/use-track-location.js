import { useState } from "react";

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState('');
    const [findingLocation, setFindingLoction] = useState(false)
   
    const success = (position) => {
        const latitude = position.coords.latitude; 
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg('');
        setFindingLoction(false);
    }

    const error = () => {
        setFindingLoction(false)
        setLocationErrorMsg('Unable to retrieve your location');
    }

    const handleTrackLocation = () => {
        setFindingLoction(true);
        if(!navigator.geolocation) {
           setLocationErrorMsg('geolocation not supported to you browser')
        setFindingLoction(false);
        }else {
            navigator.geolocation.getCurrentPosition(success,error)
        }
    };
      
    return {
        latLong,
        handleTrackLocation,
        locationErrorMsg,
        findingLocation
    }
}


export default useTrackLocation;