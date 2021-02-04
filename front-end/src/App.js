import React, {useState} from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import './App.css';

const App = () => {
  const [user, setUser] = useState({id: 1});
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
      ? (
        <div className="home-container">
          <div className="nav-home">
            <Navigation onRouteChange={handleRouteChange} userId={user.id} />
            <Home userId={user.id} />
          </div>
        </div>
        )
      : (
        url === '/register'
        ? <Register onRouteChange={handleRouteChange} /> 
        : <Signin onRouteChange={handleRouteChange} onSuccessfulSignin={handleSuccessfulSignin} />
        )
      }
    </div>
  );
}

export default App;