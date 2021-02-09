import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../Feed/Feed';
import './Search.css';

const Search = (props) => {
    const [imgUrls, setImgUrls] = useState(props.results);

    return (
        <div className="feed-container-a">
            <div className="feed">
                {
                    imgUrls.length === 0
                    ?
                    <p>No results for your search</p>
                    :
                    imgUrls.map((imgUrl, index) => {
                        return <Feed imgUrl={imgUrl} key={index} />
                    })
                }
            </div>
        </div>
    );
}

export default Search;