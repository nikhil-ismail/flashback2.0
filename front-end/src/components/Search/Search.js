import React from 'react';
import './Search.css';

const SearchBar = (props) => {

    const handleChange = (event) => {

    }

    return (
        <div className="search">
            <form>
                <input 
                    placeholder="Search users, tweets, and hashtags"
                    type="text"
                    name="search"
                    className="search-bar"
                    onChange={handleChange} />
                <br />
                <button
                    type="submit"
                    name="action"
                    className="search-button"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchBar;