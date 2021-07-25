import React from "react";
import Slider from '@material-ui/core/Slider';
// import './locationRange.css'

function LocationRange (props) {
    const [value, setValue] = React.useState([20, 37]);
    const [coordinates, setCoordinates] = React.useState([])

    function transformLocation (position) {
      const { latitude, longitude} = position.coords
      setCoordinates([latitude, longitude])
  }

    const handleChange = (event, newValue) => {
      setValue(newValue);
      const [minDistance, maxDistance] = newValue;
      const currentLocation = navigator.geolocation.getCurrentPosition(transformLocation);
      const [lat, lng] = coordinates;
      props.dispatch({type: "location", geoSpatial: `${lat},${lng},${maxDistance}`})
    };

    const min = 0;
    const max= 15;
    const step = 1;

    function valuetext(value) {
        return `${value}`;
      }


    return (
        <div>
              
                    <h4>Location (Kilometers)</h4>
                    <Slider
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    className='MuiSlider-root'
                    />

        </div>
    )
}

export default LocationRange;