import React, { useState } from 'react';
import './search.scss';
import searchIcon from '../../assets/search.png';

const Search = (props) => {
  const [query, setQuery] = useState('');

  const search = () => {
    if (query.length > 0) {
      props.searchCity(query);
    }
  }

  const handleOnKeyDown = (event) => {
    if (event.keyCode == '13'){
      event.preventDefault();
      search(); // Enter pressed
    }
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
        <div className={"search-container"}>
            <form>
                <input
                    id={"search_form"}
                    className={"search-form"}
                    placeholder={"City"}
                    onKeyDown={e => handleOnKeyDown(e)}
                    onChange={handleChange}
                />
            </form>
            <img src={searchIcon} className={"search-button"} onClick={() => search()}/>
        </div>
  )
}

export default Search;