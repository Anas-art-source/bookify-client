import { GoogleMap, Marker,  withGoogleMap,  withScriptjs } from "react-google-maps"


const MyMapComponent = (props) => {
  return  <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            isMarkerShown
           
            >
          {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
}


const withGoogle = withGoogleMap(MyMapComponent)
const WithScript =  withScriptjs(withGoogle)

export default function MapComponent (props)  {

              return ( 
              <WithScript 
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
              loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
              containerElement={<div style={{ height: `400px`,  width: '100%' }} />}
              mapElement={<div style={{ height: `100%` ,  width: '100%'}} />}
            />
              )

}