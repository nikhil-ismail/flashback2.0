import React, {useState} from 'react';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Home from './components/Home/Home';
import './App.css';

const App = () => {
  const [user, setUser] = useState({id: 2});
  const [url, setUrl] = useState('home');
  const [isSignedIn, setIsSignedIn] = useState(true);

  const handleRouteChange = (route) => {
    if (route === 'signout') {
      setUrl('signin');
      setIsSignedIn(false);
    } else if (route === 'signin') {
      setUrl('signin');
    } else if (route === 'register') {
      setUrl('register');
    } else if (route === 'home') {
      setUrl('home');
      setIsSignedIn(true);
    }
  }

  const handleSuccessfulSignin = (userId) => {
    console.log(`Message: ${userId}`)
    setUser({id: userId})
    setIsSignedIn(true);
  }

  return (
    <div>
      {
      isSignedIn === true
      ?
        (
          <Home onSignOut={handleRouteChange} userId={user.id} />
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