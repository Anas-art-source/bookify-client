import React from "react";
import Avatar from '@material-ui/core/Avatar';
import './cardHeader.css'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {capitalize, formatDate} from '../helper/format'

function CardHeader (props) {
    console.log(props, "PROPPSS")
    return (
        <div className='cardHeader'>
            <Avatar src={props.ownerPhoto} alt={props.ownerId} />

            <div className='nameBox'>
                <a className="name" href={`/users/${props.ownerId}`}>{capitalize(props.ownerName)}</a>
                <p className='date'>{formatDate(props.date)}</p>
            </div>

            <div className='priceBox'>
                <h4 className='price'>Rs. {props.price}</h4>
                <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={props.averageRating} readOnly />
                </Box>
            </div>
        </div>
    )
    
}

export default CardHeader;

