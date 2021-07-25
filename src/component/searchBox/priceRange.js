import React from "react";
import Slider from '@material-ui/core/Slider';
import './priceRange.css'

function PriceRange (props) {
    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      const [greaterThanPrice, lessThanPrice] = newValue;
      props.dispatch({type: "price", lessThanPrice: lessThanPrice, greaterThanPrice: greaterThanPrice})

    };

    const min = 0;
    const max= 3000;
    const step = 50;

    function valuetext(value) {
        return `${value}`;
      }


    return (
        <div>
              
                    <h4>Price (PKR)</h4>
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

export default PriceRange;