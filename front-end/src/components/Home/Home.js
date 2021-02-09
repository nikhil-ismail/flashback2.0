import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
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
        console.log('search')
        setEndPoint('search');
        setQuery(search);
    }

    const handleFavourite = () => {
        setEndPoint('favourites');
    }

    const handleFeedChange = () => {
        console.log(feedChanges);
        setFeedChanges(feedChanges + 1);
    }

    useEffect(() => {
        let mounted = true;
        axios.get(`http://localhost:5000/${endPoint}/${props.userId}?search=${query}`)
        .then(response => {
            if (mounted) {
                setImgUrls(response.data);
            }
        })
        .catch(err => console.log(err));

        return () => mounted = false;
    }, [endPoint, query, feedChanges])

    return (
        <div className="home-page">
            <Navigation
                userId={props.userId}
                onHome={handleHome}
                onFavourite={handleFavourite}
                onSearch={handleSearch}
                onSignout={props.onSignOut}
                onFeedChange={handleFeedChange}
            />
            <div className="feed">
                {
                    imgUrls.length === 0
                    ?
                    <p>Upload your first memory!</p>
                    :
                    imgUrls.map((imgUrl, index) => {
                        return <Feed imgUrl={imgUrl} key={index} onFeedChange={handleFeedChange} onSearch={handleSearch} />
                    })
                }
            </div>
        </div>
    );
}

export default Home;