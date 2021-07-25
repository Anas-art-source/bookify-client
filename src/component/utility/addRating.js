import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function SimpleRating(props) {
  // const [value, setValue] = React.useState(0);

  return (
    
        <Rating name="pristine" value={props.value} onChange={(event, newValue) => { props.setValue(newValue)} } size="large" />
      
  );
}