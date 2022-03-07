import React from 'react'
import GoogleMapReact from 'google-map-react'

const Map = ({ location, zoomLevel }) => {
  const handleApiLoaded = (map, maps) => {}

  return (
    <div id="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDPi8JMfy1GZjzQpFq1sPqzVMm6ASBLBTs' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
      </div>
    </div>
  )
}

export default Map