import './Login.css';
import ActionButton from '../ActionButton/ActionButton.jsx'

function Login({ handleLogin }) {
    return (
        <div className="login-container">
                    <div className="login-window">
                        <div className="login-header-container">
                            <div className="spotify-logo">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify Logo" />
                            </div>
                            <h1>Spotify Stats</h1>
                        </div>
                        <p>Unlock insights into your listening habits. See your top tracks, artists, and more.</p>
                        <ActionButton fn={handleLogin} content="Login with Spotify"/>
                    </div>
        </div>
    );
}
export default Login;