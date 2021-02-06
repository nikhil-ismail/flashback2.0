import React, {useState} from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Favourites from './components/Favourites/Favourites';
import './App.css';

const App = () => {
  const [user, setUser] = useState({id: 2});
  const [url, setUrl] = useState('/home');
  const [isSignedIn, setIsSignedIn] = useState(true);

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
    }
  }


  const handleSuccessfulSignin = (userId) => {
    setUser({id: userId})
    setIsSignedIn(true);
  }

  return (
    <div>
      {
      isSignedIn === true
      ?
        url !== '/home'
        ?
          (
          <div className="home-container">
            <Navigation onRouteChange={handleRouteChange} userId={user.id} />
            <Favourites onRouteChange={handleRouteChange} userId={user.id} />
          </div>
          
          )
        :
          (
          <div className="home-container">
            <Navigation onRouteChange={handleRouteChange} userId={user.id} />
            <Home userId={user.id} />
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