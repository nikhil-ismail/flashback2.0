import React, {useState} from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Home from './components/Home/Home';
import './App.css';

const App = () => {
  const [url, setUrl] = useState(localStorage.getItem("token") === null ? 'signin' : 'home');
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("token") === null ? false : true);

  const handleRouteChange = (route) => {
    if (route === 'signout') {
      localStorage.removeItem('token')
      setUrl('signin');
      setIsSignedIn(false);
    } else if (route === 'signin') {
      setUrl('signin');
    } else if (route === 'register') {
      setUrl('register');
    } else if (route === 'home') {
      setUrl('home');
    }
  }

  const handleSuccessfulSignin = () => {
    setIsSignedIn(true);
  }

  return (
    <div>
      {
      isSignedIn === true
      ?
        (
          <Home onSignOut={handleRouteChange} />
        )
      :
        url === 'register'
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