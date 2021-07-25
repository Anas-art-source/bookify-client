import './backdropTrans.css';
import { createPortal } from 'react-dom';

export default function BackdropTrans (props) {

    return (
        createPortal(<div onClick={props.onClick} className="backdrop-transparent"></div>, document.querySelector('.modal'))
        
    )
}