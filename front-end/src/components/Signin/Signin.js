import React, {useState} from 'react';
import './Signin.css';
import Typing from 'react-typing-animation';

const Signin = (props) => {
    const [_username, setUsername] = useState('');
    const [_password, setPassword] = useState('');

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: _username,
                    password: _password,
                })
            });

            if (response.ok) {
                const json = await response.json();
                props.onRouteChange('home');
                props.onSuccessfulSignin(json.user_id);
                console.log('User successfully signed in');
            } else {
                console.log('Unable to sign in user');
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            console.log('An error occurred signing in');
            console.log(err);
            setUsername('');
            setPassword('');
        }
    }

    const AnimatedTypingComponent = () => (
        <Typing>
        <div>
          <h5>Upload and store your photos and albums.</h5>
        </div>
      </Typing>
    );

    const AnimatedTypingComponentTwo = () => (
        <Typing>
        <div>
          <Typing.Delay ms={4000} />
          <h5>Search memories using natural language.</h5>
        </div>
      </Typing>
    );

    return (
        <div class="signin">
            <div class="signin-form-card-left">
                <h1>Welcome Back</h1>
                <form>
                    <div className="signin-form-body">
                        <input
                            type="text"
                            placeholder="Username"
                            value={_username}
                            name="username"
                            required
                            className="signin-form-input"
                            onChange={onUsernameChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={_password}
                            name="password"
                            required
                            className="signin-form-input"
                            onChange={onPasswordChange}
                        />
                        <button
                            variant="primary"
                            type="submit"
                            className="signin-form-button"
                            onClick={handleSignin}
                        >
                            Sign In
                        </button>
                        <p
                            className="signin-link"
                            onClick={() => props.onRouteChange('register')}
                        >
                            <div className="click">Don't have an account? Sign up</div>
                        </p>
                    </div>
                </form>
            </div>
            <div className="signin-form-card-right">
                <h1><div id="flashback">Flashback</div></h1>
                <br />
                <AnimatedTypingComponent />
                <AnimatedTypingComponentTwo />
                <br />
                <br />
                <div className="google">
                    Sign in with Google
                </div>
                <br />
                <div className="facebook">
                    Sign in with Facebook
                </div>
                <br />
                <div className="apple">
                    Sign in with Apple
                </div>
            </div>
        </div>
    );
}

export default Signin;