import './TopArtistsGrid.css';

const TopArtistsGrid = ({ artists, tracks }) => {
    if (!artists || artists.length === 0) return null;

    const heroArtist = artists[0];
    const otherArtists = artists.slice(1, 9);

    const heroTracks = tracks 
        ? tracks.filter(track => track.artists.some(a => a.id === heroArtist.id)).slice(0, 5) 
        : [];

    return (
            <div className="artists-grid">
                <div className="artist-card hero-card" style={{ backgroundImage: `url(${heroArtist.images[0].url})` }}>
                    <a href={heroArtist.uri} className="link-spotify-overlay">
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <span className="rank-badge">#1</span>
                                <h3 className="hero-name">{heroArtist.name}</h3>
                                <div className="hero-genres">
                                    {heroArtist.genres.slice(0, 3).join(' • ')}
                                </div>
                                
                                {heroTracks.length > 0 && (
                                    <div className="hero-tracks">
                                        <p className="hero-tracks-title">Your HITS:</p>
                                        <ul className="hero-track-list">
                                        {heroTracks.map(track => (
                                            <li className="hero-track-name" key={track.name}><span>{track.name}</span></li>
                                        ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </a>
                </div>

                {otherArtists.map((artist, index) => (
                    <div key={artist.id} className="artist-card small-card" style={{ backgroundImage: `url(${artist.images[0].url})` }}>
                        <a href={artist.uri} className="artist-spotify-overlay">
                            <div className="small-card-overlay">
                                <div className="small-card-info">
                                    <span className="rank-badge">#{index + 2}</span>
                                    <h4 className="small-name">{artist.name}</h4>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
                
            </div>
    );
};

export default TopArtistsGrid;