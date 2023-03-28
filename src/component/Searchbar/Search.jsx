import React from 'react'
import './Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
  return (
    <div className='search'>
      <input type="search" placeholder="Enter keyword"/>
      <div className='icon'>
      <FontAwesomeIcon icon={faSearch}/>
      </div>
    </div>
  )
}

export default Search