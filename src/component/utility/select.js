import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './selectForm.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(20),
  },
  filled: {
    width: 80
  }
}));



function SelectForm (props) {
    const classes = useStyles();
    const [variable, setVariable] = React.useState('');
  
    const handleChange = (event) => {
      setVariable(event.target.value);
      props.onChange(event.target.value)
    };

    return (
        <FormControl variant="outlined" className='form-control'>
        <InputLabel  id="demo-simple-select-outlined-label"  className='Mui-focus'>{props.name}</InputLabel>

        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={variable}
          onChange={handleChange}
          label={props.name}
          onBlur={props.onBlur}
          required={props.required}
        >

          {props.selectionOptions.map(select => <MenuItem classes={classes.filled} value={ select === 'none' ? "" : select} defaultValue={props.defaultValue}>{select[0].toUpperCase() + select.slice(1)}</MenuItem>)}
       
        </Select>
      </FormControl>
    )
}

export default SelectForm;