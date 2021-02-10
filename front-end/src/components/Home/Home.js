import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import './Home.css';

const Home = (props) => {
    const [imgUrls, setImgUrls] = useState([]);
    const [query, setQuery] = useState('');
    const [endPoint, setEndPoint] = useState('home');
    const [feedChanges, setFeedChanges] = useState(0);

    const handleHome = () => {
        setEndPoint('home');
    }

    const handleSearch = search => {
        setEndPoint('search');
        setQuery(search);
    }

    const handleFavourite = () => {
        setEndPoint('favourites');
    }

    const handleFeedChange = () => {
        setFeedChanges(feedChanges + 1);
    }

    const handleMemoryLane = () => {
        setEndPoint('random');
        handleFeedChange();
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/${endPoint}/${props.userId}?search=${query}`)
        .then(response => {
            setImgUrls(response.data);
        })
        .catch(err => console.log(err));

    }, [endPoint, query, feedChanges])

    return (
        <div className="home-page">
            <Navigation
                userId={props.userId}
                onHome={handleHome}
                onSearch={handleSearch}
                onFeedChange={handleFeedChange}
            />
            <div className="sidebar-feed">
                <div className="sidebar">
                    <Sidebar
                        currentPage={endPoint}
                        onFeedChange={handleFeedChange}
                        onHome={handleHome}
                        onFavourite={handleFavourite}
                        onMemoryLane={handleMemoryLane}
                        onSignout={props.onSignOut}
                    />
                </div>
                <div className="feed">
                    {
                        imgUrls.length === 0
                        ?
                        (
                            endPoint === 'home'
                            ?
                            <p className="no-results">Upload your first memory!</p>
                            :
                            <p className="no-results">You don't have any favourite memories yet.</p>
                        )
                        :
                        imgUrls.map((imgUrl, index) => {
                            return <Feed imgUrl={imgUrl} key={index} onFeedChange={handleFeedChange} onSearch={handleSearch} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;