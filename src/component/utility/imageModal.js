import React, {Fragment, useState , useRef} from 'react';
import './imageModal.css'
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function ImageModalJS (props) {

    const [close, setClose] = useState(false);
    const sliderRef = useRef(null)
    const [slideLeftClicked, setSlideLeftClicked] = useState(0);
    const [slideRightClicked, setSlideRightClicked] = useState(0)


    const modalCloseHandler = () => {
        setClose(true)
        props.display()
    }

    function slideRightHandler () {

        if (slideRightClicked === (sliderRef.current.children.length -1 )) {
            return
        }

        sliderRef.current.style.transform += 'translateX(-540px)';
        setSlideRightClicked((prevState) => (prevState + 1))
    }

    function slideLeftHandler () {

        if (slideRightClicked === 0 ) return;
        setSlideRightClicked((prevState) => (prevState - 1));
        sliderRef.current.style.transform += 'translateX(540px)';

    }

  
    return (

     <Fragment >
            <div  className={ close ? 'close' : 'backdrop'} onClick={modalCloseHandler} > </div>
           
            <div  className={ close ? 'close' : 'image-modal'}>
                    <div className={ close ? 'close' : 'close-btn'} onClick={modalCloseHandler} >
                        <CloseIcon />
                    </div>
                    <div className='arrow-left' onClick={slideLeftHandler}>
                            <ArrowBackIosIcon />
                    </div>
                    <div className='arrow-right' onClick={slideRightHandler}>
                            <ArrowForwardIosIcon />
                    </div>  
                    <div className='slider' ref={sliderRef}>
                        {props.images.map(image => <img src={image} alt='book' className='modal-image' width='540px' height='540px'/>)}
                    </div>
            </div>
    </Fragment>   
    )
}

function ImageModal (props) {

    return (
        ReactDOM.createPortal(<ImageModalJS images={props.images} display={props.display}/>, document.querySelector('.modal'))
    )
}

export default ImageModal;