import React, { useEffect, useState } from "react";
import './FilterBox.css';

import PriceRange from "./priceRange";
import LocationRange from "./locationRange";
import Select from '../utility/select'
import RadioGroup from '../utility/radio'




function FilterBox (props) {
  const [pathBooks, setPathBooks] = useState(null);

  function conditionHandler (value) {

      props.dispatch({type: "condition", condition: value})
  }

  function priceSortHandler (value) {
    if (value === 'high-to-low') {
        props.dispatch({ type: "priceSort", sort: "-price"})
    }

    if (value === 'low-to-high') {
      props.dispatch({ type: "priceSort", sort: "price"})
    }
  }

  function categoryHandler (value) {
    props.dispatch({type: "category", category: value})
  }

  function recentPostHandler (value) {
    props.dispatch({type: "recentPost", sort: '-date'})
  }

  function ratingSortHandler (value) {
    if (value === 'high-to-low') {
      props.dispatch({ type: "ratingSort", sort: "-averageRating"})
  }

  if (value === 'low-to-high') {
    props.dispatch({ type: "ratingSort", sort: "averageRating"})
  }
  }

  useEffect(() => {
    if (props.path === 'Books') {
      setPathBooks(true)
    } else {
      setPathBooks(false)
    }
  }, [props])

  if (pathBooks) {
    return (
      <div className="filter-wrapper">
      
      <PriceRange dispatch={props.dispatch}/>
      <LocationRange dispatch={props.dispatch}/>
      <Select name='Conditions' selectionOptions={['none', 'new', 'used']} onChange={conditionHandler}/>
      <Select name='Price' selectionOptions={['none', 'high-to-low', 'low-to-high']} onChange={priceSortHandler}/>
      <Select name='Catergory' selectionOptions={['none', 'fiction', 'non-fiction', "engineering", "science"]} onChange={categoryHandler}/>
      <RadioGroup label="Recent Post" value="recent" onChange={recentPostHandler}/>
    </div>
    )
  }

  

  return (
    <div className="filter-wrapper" >
          <LocationRange  dispatch={props.dispatch}/>
          <Select name='Rating' selectionOptions={['none', 'high-to-low', 'low-to-high']} onChange={ratingSortHandler} />
    </div>
  )
}

export default FilterBox;

