import React from "react";
import "./button.css"

function Button (props) {

    const btnClasses = `btn-general ${props.class}`
    return (
        <button className={btnClasses} onClick={props.onClick}>
            {props.value && <h4 className="btn-value">{props.value}</h4> }
            {props.icon && <props.icon/>}
        </button>
    )
}

export default Button;