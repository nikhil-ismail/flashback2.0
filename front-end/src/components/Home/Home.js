import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../Feed/Feed';
import './Home.css';

const Home = (props) => {
    const [imgUrls, setImgUrls] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/feed/id=${props.userId}`)
        .then(response => {
            setImgUrls(response.data);
        })
        .catch(err => console.log(err));
    }, [imgUrls.length])

    return (
        <div className="feed-container">
            {
                imgUrls.length === 0
                ?
                <p>Upload your first memory!</p>
                :
                imgUrls.map((imgUrl, index) => {
                    return <Feed onRouteChange={props.onRouteChange} onSearch={props.handleSearch} imgUrl={imgUrl.img_path} key={index} />
                })
            }
        </div>
    );
}

export default Home;