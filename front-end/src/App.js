import React, {useState} from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Favourites from './components/Favourites/Favourites';
import Search from './components/Search/Search';
import './App.css';

const App = () => {
  const [user, setUser] = useState({id: 2});
  const [url, setUrl] = useState('/signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const handleRouteChange = (route) => {
    if (route === 'signout') {
      setUrl('/signin');
      setIsSignedIn(false);
    } else if (route === 'signin') {
      setUrl('/signin');
    } else if (route === 'register') {
      setUrl('/register');
    } else if (route === 'home') {
      setUrl('/home');
      setIsSignedIn(true);
    } else if (route === 'favourites') {
      setUrl('/favourites');
    } else if (route === 'search') {
      setUrl('/search');
    }
  }

  const handleSuccessfulSignin = (userId) => {
    setUser({id: userId})
    setIsSignedIn(true);
  }

  const handleSearch = (results) => {
    setSearchResults(results);
  }

  return (
    <div>
      {
      isSignedIn === true
      ?
        url !== '/home'
        ?
          url === '/favourites'
          ?
          (
          <div className="home-container">
            <Navigation onRouteChange={handleRouteChange} onSearch={handleSearch} userId={user.id} />
            <Favourites onRouteChange={handleRouteChange} userId={user.id} />
          </div>
          )
          :
          (
          <div className="home-container">
            <Navigation onRouteChange={handleRouteChange} onSearch={handleSearch} userId={user.id} />
            <Search onRouteChange={handleRouteChange} results={searchResults} userId={user.id} />
        </div>
          )
        :
          (
          <div className="home-container">
            <Navigation onRouteChange={handleRouteChange} onSearch={handleSearch} userId={user.id} />
            <Home onRouteChange={handleRouteChange} onSearch={handleSearch} userId={user.id} />
          </div>
          )
      :
        url === '/register'
        ?
          (
          <Register onRouteChange={handleRouteChange} /> 
          )
        : 
          (
          <Signin onRouteChange={handleRouteChange} onSuccessfulSignin={handleSuccessfulSignin} />
          )
      }
    </div>
  );
}

export default App;