import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../Feed/Feed';
import './Favourites.css';

const Favourites = (props) => {
    const [imgUrls, setImgUrls] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/favourites/id=${props.userId}`)
        .then(response => {
            setImgUrls(response.data);
        })
        .catch(err => console.log(err));
    }, [imgUrls.length])

    return (
        <div className="feed-container-a">
            <div className="feed">
                {
                    imgUrls.length === 0
                    ?
                    <p>Upload your first memory!</p>
                    :
                    imgUrls.map((imgUrl, index) => {
                        return <Feed imgUrl={imgUrl.img_path} key={index} />
                    })
                }
            </div>
        </div>
    );
}

export default Favourites;