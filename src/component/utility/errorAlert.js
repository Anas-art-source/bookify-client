
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: "auto",
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts(props) {
  console.log(props.error, "RERREREREEREERE")
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">{props.error}</Alert>
    </div>
  );
}