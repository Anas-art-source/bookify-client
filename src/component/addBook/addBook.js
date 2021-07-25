import React from "react";
import Stepper from '../utility/stepper'
import './addBook.css';
import Select from '../utility/select'
import Map from "../utility/googleMap"
import useFormValidation from "../hooks/formValidation";
import useFetch from '../hooks/useFetch';
import Loading from '../utility/loading';
import Modal from '../utility/modal';
import { useSelector } from "react-redux";

export default function AddBookForm (props) {

    const [date, setDate] = React.useState('')
    const [files, setFiles] = React.useState([])
    const {sendRequest, isLoading, isValid, error, setIsValid} = useFetch()
    const [isValidPhoto, setIsValidPhoto] = React.useState(true)
    const [isValidDate, setIsValidDate] = React.useState(true)
    const [successfulUpload, setSuccessfulUpload] = React.useState(false)
    const loginUserId = useSelector(state => state.currentUser.id)
    //FORM VALIDATION FUNCTION
    function bookNameValidFunc (value) {
        return value.length > 0 
    }

    function bookAuthorValidFunc (value) {
        return value.length > 4
    }

    function bookCategoryValidFunc (value) {
        return ["fiction", 'non-fiction', 'medical', 'commerce', 'engineering'].includes(value)
    }

    function bookPriceValidFunc (value) {
        return value === 0 || value > 0
    }

    function bookConditionValidFunc (value) {
        console.log(value, "HERE IS CONDITION")
        return ["used", "new"].includes(value)
    }

    function onChangeDate (e) {
        if (!e.target.value) setIsValidDate(false)
        const date = new Date(e.target.value).toISOString()
        setDate(date)
        setIsValidDate(true)
    }

    function filesHandler (e) {
        let fileArr = []
        for (let file of e.target.files) {
            fileArr.push(file)
        }

        if (fileArr.length > 0 && fileArr.length < 5) {
            setFiles(fileArr);
            setIsValidPhoto(true)
            return
        }
        
        setIsValidPhoto(false)
    }

    // function bookDateValidFunc (value) {
    //     return true
    // }

    const {  onBlurInput: onBlurName, isValid: isValidName, onChangeText: onChangeName, input: name} = useFormValidation(bookNameValidFunc)
    const {  onBlurInput: onBlurPrice, isValid: isValidPrice, onChangeText: onChangePrice, input: price} = useFormValidation(bookPriceValidFunc)
    const {  onBlurInput: onBlurAuthor, isValid: isValidAuthor, onChangeText: onChangeAuthor, input: author} = useFormValidation(bookAuthorValidFunc)
    const {  onBlurInput: onBlurCategory, isValid: isValidCategory, onChangeText: onChangeCategory, input: category} = useFormValidation(bookCategoryValidFunc)
    const {  onBlurInput: onBlurCondition, isValid: isValidCondition, onChangeText: onChangeCondition, input: condition} = useFormValidation(bookConditionValidFunc)

    async function onSubmitBookForm (e) {
        // e.preventDefault();
        const bookForm = new FormData();
        bookForm.append("name", name);
        bookForm.append("author", author);
        bookForm.append("category", category);
        bookForm.append("price", price);
        bookForm.append('condition', condition);
        bookForm.append("publishBook", date);
        bookForm.append("owner", loginUserId )
        
        files.forEach((file, i) => {
            bookForm.append('photos', file)
        })

        // bookForm.append("location", JSON.stringify({ type: "Points", coordinates: [12, 12]}))

        const response = await sendRequest(`http://localhost:1000/api/v1/books`, 'POST', bookForm, true )
        console.log(response, "RESPONSE FROM THE SERVER")

        if (response?.status === "SUCCESSFUL") {
            setSuccessfulUpload(true)
        }

    }



    return (
        <Stepper onSubmit={onSubmitBookForm}>
              {!isValid && 
                 <div  onClick={() => setIsValid(true)} > 
                    <Modal><h2 className='error-text'>{` ${error}`}</h2></Modal>
                 </div>
                 }

                {successfulUpload && 
                 <div  onClick={() => setIsValid(true)} > 
                    <Modal><h2>Successfully Listed Book</h2></Modal>
                 </div>
                 }


                 {/* LOADING MODAL */}
                     {isLoading && <div className="loading-div">
                         <Loading />
                     </div>
                 }
            <form className="addbook-form">
                <div className="slide">
                    <div className='addbook-form-box'>
                        <label htmlFor="name">Book Name* </label>
                        <input id="name"  defaultValue="random" type="text" onChange={onChangeName} onBlur={onBlurName} required/>
                        {!isValidName && <span className='error'>Please Type Valid Book Name </span>}
                    </div>

                    <div className='addbook-form-box'>
                        <label htmlFor="author">Author Name*</label>
                        <input id="author"   defaultValue="random" type="text" onChange={onChangeAuthor}  onBlur={onBlurAuthor} required/>
                        {!isValidAuthor && <span className='error'>Please Type Valid Author Name </span>}

                    </div>

                    <div className='addbook-form-box'>
                       <Select name="category" selectionOptions={["fiction", 'non-fiction', 'medical', 'commerce', 'engineering']} value={category} onChange={onChangeCategory} onBlur={onBlurCondition} required={true} />
                       {!isValidCategory && <span className='error'>Please Select Valid Category </span>}

                    </div>

                </div>

                <div className="slide">
                    <div className='addbook-form-box'>
                        <label htmlFor="price">Price*</label>
                        <input id="price"  defaultValue="123" type="number" onChange={onChangePrice} onBlur={onBlurPrice} required/>
                        {!isValidPrice && <span className='error'>Please Enter Valid Price</span>}

                    </div>

                    <div className='addbook-form-box'>
                       <Select name="condition" selectionOptions={["used", "new"]} onChange={onChangeCondition} onBlur={onBlurCondition} required={true}/>
                       {!isValidCategory && <span className='error'>Please Select Valid Condition </span>}

                    </div>

                    <div className='addbook-form-box'>
                        <label htmlFor="publishing-year">Publishing Year*</label>
                        <input id="publishing-year"   type="date" required onChange={onChangeDate}  />
                        {!isValidDate && <span className='error'>Please Select Valid Date </span>}

                    </div>

                    
                    <div className='addbook-form-box'>
                        <label htmlFor="photos">Photos *</label>
                        <input id="photos"  type="file" multiple required onChange={filesHandler}  />
                        {!isValidPhoto && <span className='error'>Minumun 1 and maximum 4 Photos are allowed </span>}

                    </div>


                </div>

                <div className="slide">
                         <Map />
                </div>

            </form>
        </Stepper>
        
    )
}

// export default function AddBook () {
        
//     function activeSlideHandler (activeSlide) {
//     }

//     return (
//             <Stepper Form={AddBookForm} activeSlide={activeSlideHandler}/>
            
//     )
// }


// name: {
//     type: String,
//     required: [true, 'Book should have a title']
// },
// author: {
//     type: String,
// },
// category: {
//     type: String,
//     enum: ["fiction", 'non-fiction', 'medical', 'commerce', 'engineering'],
//     required: [true, 'Book Should Have A Category']
// },
// price: {
//     type: Number,
//     min: 0,
//     required: [true, "Book Must have price. If free, enter 0 as price"]
// },
// date: {
//     type: Date,
//     default: Date.now()
// },
// publishBook: {
//     type: Date,
// },
// condition: {
//     type: String,
//     enum: ['new', 'used'],
//     default: 'used'
// },
// //COMMENTS: VIRTUAL POPULATE
// owner: {
//     type: mongoose.Schema.ObjectId,
//     ref: "Users"
// },
// ratingCount: Number,
// // REVIEWS
// averageRating: {
//     type: Number
// },
// postedAt: {
//     type: Date,
//     default: Date.now()
// },
// photos: [String],
// location: {
//     type: {
//         type: String, // Don't do `{ location: { type: String } }`
//         default: "Point",
//         enum: ['Point'], 
//          },
//     coordinates: [Number]


// }