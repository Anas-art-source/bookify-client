import './signup.css';
import Card from '../utility/card';
import React, {useState} from 'react';
import {  useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useFormValidation from '../hooks/formValidation';
import useFetch from '../hooks/useFetch';
import Modal from '../utility/modal';
import Loading from '../utility/loading';
import { useDispatch} from 'react-redux';
import { currentUserAction } from '../../store/currentUser';
import {useCookies} from "react-cookie";

export default function SignUp (props) {

    const history = useHistory();
    const [location, setLocation] = useState(false);
    const [coordinates, setCoordinates] = useState([])
    const [file, setFile] = useState(true);
    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

 

    
    // FETCH CUSTOM HOOK
    const {sendRequest, isLoading, isValid, setIsValid, error} = useFetch();

    // FORM VALIDATION USING CUSTOM HOOK
    const { onBlurInput: onBlurNameInput, isValid: isValidName, onChangeText: onChangeName, input: name } = useFormValidation(validNameFunc)
    const { onBlurInput: onBlurEmail, isValid: isValidEmail, onChangeText: onChangeEmail, input: email } = useFormValidation(validEmailFunc);
    const { onBlurInput: onBlurPassword, isValid: isValidPassword, onChangeText: onChangePassword, input: password } = useFormValidation(validPasswordFunc);
    const { onBlurInput: onBlurConfirmPassword, isValid: isValidConfirmPassword, onChangeText: onChangeConfirmPassword, input: confirmPassword} = useFormValidation(validConfirmPasswordFunc);
    const { onBlurInput: onBlurDescription, isValid: isValidDescription, onChangeText: onChangeDescription, input: description} = useFormValidation(validDescFunc);
    const { onBlurInput: onBlurCity, isValid: isValidCity, onChangeText: onChangeCity, input: city} = useFormValidation(validCityFunc);
    const { onBlurInput: onBlurLocality, isValid: isValidLocality, onChangeText: onChangeLocality, input: locality} = useFormValidation(validCityFunc);

    // FORM VALIDATION FUNCTION.
    // COULD HAVE USED ARROW FUNCTION 
    function validNameFunc (value) {
        return value.length < 12 && value.length > 0
    }

    function validEmailFunc (value) {
        if (value || value.includes('@')) return true;
        return false
    }

    function validPasswordFunc (value) {
        return value.length > 6 
    }

    function validConfirmPasswordFunc (value) {
        return value === password
    }

    function validDescFunc (value) {
        return value.length < 20 && value.length > 0
    }

    function validCityFunc (value) {
        return value.length >= 3
    }


    function fileHandler (e) {
        setFile(e.target.files[0])
        
    }
        
    function anchorClickHandler (e) {
        e.preventDefault();
        history.push(`${props.signup ? "/login" : "/signup"}`)
    }

    // GETTING USER LOCATION
    function transformLocation (position) {
        const { latitude, longitude} = position.coords
        setCoordinates([latitude, longitude])
    }
    function getLocation () {
        setLocation(true);
        let loc = navigator.geolocation.getCurrentPosition(transformLocation);

    }

    // SUBMIT HANDLER AND API CALLS
    async function submitForm (e) {
        e.preventDefault();
        
        if (props.signup) {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('passwordConfirm', confirmPassword);
            formData.append('description', description)
            formData.append('photo', file, file.filename);
            formData.append('location', JSON.stringify({city: city, locality: locality, coordinates: coordinates}))
            // formData.append('location', {city: "karachi", locality: "azizabad", coordinates: coordinates})
            const response = await sendRequest('http://localhost:1000/api/v1/users/signup', "POST", formData, true);

            // IF RESPONSE IS SUCCESSFUL, API WILL SEND OBJECT WILL STATUS AS SUCCESSFULL
            if (response?.status === 'successfull') {
                setSignUp(true)
                dispatch(currentUserAction.login(response.data.id))
                setCookie("currentUserId", response.data.id)
                history.push(`/users/my-profile`)
            }


        } else {
            const  data = {
                email,
                password
            }
     

            const response = await sendRequest('http://localhost:1000/api/v1/users/login', "POST", data);
             // IF RESPONSE IS SUCCESSFUL, API WILL SEND OBJECT WILL STATUS AS SUCCESSFULL
             console.log(response, "Response")
             if (response?.status === 'successfull') {
                setSignUp(true);
                dispatch(currentUserAction.login(response.data.id))    
                setCookie("currentUserId", response.data.id)           
                history.push(`/users/my-profile`)

            }
        }
    }

    return (
        <Card class="signup-card">
            {/*  ERROR MODAL */}
            {!isValid && 
            <div  onClick={() => setIsValid(true)} > 
                <Modal><h2 className='error-text'>{` ${error}`}</h2></Modal>
            </div>
            }

            {/* LOADING MODAL */}
            {isLoading && <div className="loading-div">
                <Loading />
            </div>
            }

            {/* SUCCESS MODAL */}
            {signUp && 
            <div>
                <Modal><h2 className="success-text"> {props.signup ? 'Successfully Registered': "Successfully Logged In " }</h2></Modal>
            </div>
            }

            
            <h1 className="action-heading">{props.signup ? "Sign Up" : "Log In"}</h1>

            <form className="action-form-box" onSubmit={submitForm} >
                
                {props.signup && 
                <div className={isValidName ? 'action-input-box' : 'action-input-box invalid'}>
                <label htmlFor='username' > Your Name {props.signup ? "*": ""} </label>
                <input id='username' required placeholder="for ex. Shakeel" onBlur={onBlurNameInput} onChange={onChangeName}></input>
            </div>

                }
                
                <div className={isValidEmail ? 'action-input-box' : 'action-input-box invalid'}>
                    <label htmlFor='email' > Your Email {props.signup ? "*": ""}</label>
                    <input id='email' required placeholder="yourname@example.com" onChange={onChangeEmail} onBlur={onBlurEmail}></input>
                </div>

                <div className={isValidPassword ? 'action-input-box' : 'action-input-box invalid'}>
                    <label htmlFor='password' > Password {props.signup ? "*": ""} </label>
                    <input id='password' required onChange={onChangePassword} onBlur={onBlurPassword}></input>
                </div>

                {props.signup && 
                 <div className={isValidConfirmPassword ? 'action-input-box' : 'action-input-box invalid'}>
                    <label htmlFor='Confirm Password' > Confirm Password {props.signup ? "*": ""} </label>
                    <input id='Confirm Password' required onChange={onChangeConfirmPassword} onBlur={onBlurConfirmPassword}></input>
                </div>
                }

                {props.signup && 
                    <div className={isValidDescription ? 'action-input-box' : 'action-input-box invalid'}>
                         <label htmlFor='description' > Discription {props.signup ? "*": ""} </label>
                        <input id='description' required onChange={onChangeDescription} onBlur={onBlurDescription}></input>
                    </div>
                }

                {props.signup && 
                    <div className={isValidCity ? 'action-input-box' : 'action-input-box invalid'}>
                         <label htmlFor='city' > City {props.signup ? "*": ""} </label>
                        <input id='city' required onChange={onChangeCity} onBlur={onBlurCity}></input>
                    </div>
                }

                {props.signup && 
                    <div className={isValidLocality ? 'action-input-box' : 'action-input-box invalid'}>
                         <label htmlFor='address' > locality {props.signup ? "*": ""} </label>
                        <input id='address' required onChange={onChangeLocality} onBlur={onBlurLocality}></input>
                    </div>
                }


                 {props.signup && 
                    <div className='action-input-box'>
                         <FormControlLabel control={ <Checkbox checked={location} onChange={getLocation}
                        name="checkedB"
                        color="primary"
                        />
                            }
                    label="Use Current Location"
                    />
                    </div>
                }

                {props.signup && 
                <div className="action-input-box">
                    <label htmlFor='profile-pic'>Profile Picture</label>
                   <input type="file" accept=".jpg,.jpeg,.png" id='profile-pic' filename="photo" required onChange={fileHandler}/>
                </div>
                }

                

                {props.signup ?
                <div className="action-input-box">
                    <button type="submit" value="Submit" className="btn-submit-form">Submit</button>
                </div>
                :
                <div className="action-input-box">
                    <button type="submit" value="Submit" className="btn-submit-form">Log In</button>
                </div>
                }
            </form>

            <div className="redirect">
                {props.signup ? <p> Already have an account? <a href="/login" onClick={anchorClickHandler}>Log In</a> </p> :<p> Create a new account? <a href="/signup"  onClick={anchorClickHandler}>Sign Up</a> </p> }
            </div>

            
        </Card>
    )
}