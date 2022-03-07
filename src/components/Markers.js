import {useState, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'

const Markers = (options) => {
  const [marker, setMarker] = useState(null)
  
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())  
    }
     

  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options)
      marker.setMap('map')
    }
  }, [marker, options])
  return (
    <div>Test</div>
  )
}

export default Markers