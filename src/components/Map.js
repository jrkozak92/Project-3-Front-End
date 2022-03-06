import React from 'react'
import GoogleMapReact from 'google-map-react'

const Map = ({ location, zoomLevel }) => (
  <div id="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDPi8JMfy1GZjzQpFq1sPqzVMm6ASBLBTs' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      />
    </div>
  </div>
)

export default Map