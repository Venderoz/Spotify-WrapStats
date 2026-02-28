import { useState, useEffect } from "react";
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Login from './Login/Login.jsx';
import ThemeToggle from './ThemeToggle/ThemeToggle.jsx';
import ActionButton from './ActionButton/ActionButton.jsx';
import GenreChart from "./Chart/GenreChart.jsx";
import PopularityChart from "./Chart/PopularityChart.jsx";
import TopArtistsGrid from "./TopArtistsGrid/TopArtistsGrid.jsx";
import MusicStory from "./MusicStory/MusicStory.jsx";


import './root.css';
import './App.css';


function App() {
    const [userData, setData] = useState(() => {
        const savedData = localStorage.getItem("spotify-data");
        return savedData ? JSON.parse(savedData) : null;
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });

    const toggleTheme = () => {
        setIsDarkMode((prevMode => !prevMode));
    }

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);
    
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        const getMyData = async (code) => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/all-data?code=${code}`);
            const data = await response.json();
            
            setData(data);
            localStorage.setItem("spotify-data", JSON.stringify(data));
            console.log(data);
            
            window.history.pushState({}, null, "/");
        }
        
        if (code) {
            getMyData(code);
        }
    }, []);

    const handleLogin = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login-url`);
        const url = await response.text();
        window.location.href = url;
    }

    const handleLogout = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`);
        const message = await response.text();
        window.alert(message);
        localStorage.removeItem("spotify-data");
        setData(null);
    };
    
    return (
        <div className="app-container">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>

            {!userData && (
                <Login handleLogin={handleLogin} />
            )}

            {userData && (
                <>
                    <Header />   
                    <div className="dashboard">
                        <div className="welcome-section">
                            <div className="greeting-container">
                                <div className="greeting">
                                    <h1>Welcome, <a href={userData.user.uri}>{userData.user.displayName}!</a></h1>
                                    <p>Your listening history tells a story. Dive into your stats to see which songs you played on repeat and which artists dominated your playlists recently.</p>
                                    <ActionButton fn={handleLogout} content="Logout"/>
                                </div>
                                {userData.user.images?.length > 0 && 
                                    <div className="img-container">
                                        <img 
                                            src={userData.user.images[0].url} 
                                            alt="Profile"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                        <h3 className="headliner">Summarize your latest activity with Charts!</h3>
                        <div className="chart-section">
                            <div className="charts">
                                <GenreChart artists={userData.topArtists} isDarkMode={isDarkMode}/>
                                <PopularityChart tracks={userData.topTracks} isDarkMode={isDarkMode}/>
                            </div>
                        </div>
                        <h3 className="headliner">Your Top Artists</h3>
                        <div className="top-artists-section">
                            <TopArtistsGrid artists={userData.topArtists} tracks={userData.topTracks}/>
                        </div>
                        <h3 className="headliner">Some interesting facts about you</h3>
                        <div className="music-story-section">
                            <MusicStory tracks={userData.topTracks}/>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </div >
    );
}
export default App