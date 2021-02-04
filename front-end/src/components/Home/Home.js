import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../Feed/Feed';
import './Home.css';

const Home = (props) => {
    const [feedData, setFeedData] = useState([]);

    const apiUrl = `http://localhost:5000/feed/id=${props.userId}`;
    const fetchData = async () => {
        const response = await axios.get(apiUrl);
        setFeedData(response.data);
    }

    useEffect(() => {
        fetchData();
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
                        return <Feed refreshDetails={setFeedData} postData={feedData} key={index} />
                    })
                }
            </div>
        </div>
    );
}

export default Home;