import React, {useState} from 'react';
import './Signin.css';
import Typing from 'react-typing-animation';

const Signin = (props) => {
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignin = async (event) => {
        event.preventDefault();

        if (_email === '' || _password === '') {
            setError(true);
        }

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: _email,
                    password: _password,
                })
            });

            if (response.ok) {
                const json = await response.json();
                props.onRouteChange('home');
                props.onSuccessfulSignin(json.user_id);
                console.log('User successfully signed in');
                setError(false);
            } else {
                console.log('Unable to sign in user');
                setError(true)
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            console.log('An error occurred signing in');
            console.log(err);
            setError(true);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div className="signin">
            <div className="signin-form-card-left">
                <h1>Welcome Back</h1>
                <form>
                    <input
                        type="text"
                        placeholder="Email"
                        value={_email}
                        name="email"
                        required
                        className="signin-form-input"
                        onChange={onEmailChange}
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
                    <br />
                    {
                        error &&
                        <p id="error">Invalid email or password</p>
                    }
                </form>
            </div>
            <div className="signin-form-card-right">
                <h1 className="flashback"><i>Flashback</i></h1>
                <br />
                <h5>Upload and store your photos.</h5>
                <h5>Search memories using natural language.</h5>
                <br />
                <h5 className="signin-link">Don't have an account?</h5>
                <button
                    variant="primary"
                    type="submit"
                    className="signin-form-register"
                    onClick={() => props.onRouteChange('register')}
                    >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Signin;