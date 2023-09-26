import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ search, handleSearch }) => {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Enter keyword"
        value={search}
        onChange={handleSearch}
      />
      <div className="icon">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default Search;
