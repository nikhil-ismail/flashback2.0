import React, {useState} from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
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
        url === '/signin'
        ? <Signin onRouteChange={handleRouteChange} onSuccessfulSignin={handleSuccessfulSignin} />
        : <Register onRouteChange={handleRouteChange} />
        )
      }
    </div>
  );
}

export default App;