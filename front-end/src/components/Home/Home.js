import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../Feed/Feed';
import './Home.css';

const Home = (props) => {
    const [feedData, setFeedData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/feed/id=${props.userId}`)
        .then(response => {
            console.log("received data")
            setFeedData(response.data);
            console.log(feedData);
        })
        .catch(err => console.log(err));
    }, [feedData.length])

    return (
        <div className="feed-container-a">
            <div className="feed">
                {
                    feedData.length === 0
                    ?
                    <p>Upload your first memory!</p>
                    :
                    feedData.map((feedData, index) => {
                        return <Feed postData={feedData} key={index} />
                    })
                }
            </div>
        </div>
    );
}

export default Home;