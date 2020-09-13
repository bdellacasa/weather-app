import React from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = window.matchMedia("(max-width: 600px)").matches ? {
  width: '80vw',
  height: '80vw',
  borderRadius: '1em'
} :
  {
    width: '500px',
    height: '500px',
    borderRadius: '1em'
  };

const Map = ({ lat, lon }) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      clickableIcons={false}
      zoom={14}
      center={{
        lat: lat,
        lng: lon
      }}
    >
      <Marker
        position={{
          lat: lat,
          lng: lon
        }}
      />
    </GoogleMap>
  )
}

export default Map;