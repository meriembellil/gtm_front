import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function Maps(props) {

  const { lat, lng } = props;
  return (
    <Map
      google={props.google}
      zoom={8}
      initialCenter={{
        lat: lat,
        lng: lng,
      }}
    >
      <Marker name={'Current location'}/>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDyIUz248P92vDZF_JALddrNxCcT5nu86o"
})(Maps)