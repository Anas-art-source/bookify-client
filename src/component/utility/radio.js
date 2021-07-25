import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function RadioGroupForm (props) {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value)
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.value[0].toUpperCase() + props.value.slice(1)}</FormLabel>
      <RadioGroup aria-label={props.value}  value={value} onChange={handleChange}>
        <FormControlLabel value={props.value} control={<Radio />} label={props.label} />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioGroupForm;
