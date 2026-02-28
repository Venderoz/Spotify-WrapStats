import { useMemo } from 'react';
import './MusicStory.css';

const MusicStory = ({ tracks }) => {
    
    const storyData = useMemo(() => {
        if (!tracks || tracks.length === 0) return null;

        const decades = {};
        let oldestTrack = tracks[0];

        let totalDuration = 0;

        tracks.forEach(track => {
            if(track.album.albumType !== "SINGLE"){
                const year = parseInt(track.album.releaseDate.substring(0, 4));
                const decade = Math.floor(year / 10) * 10 + "s";
                decades[decade] = (decades[decade] || 0) + 1;
            
                const trackDate = new Date(track.album.releaseDate);
                if (trackDate < new Date(oldestTrack.album.releaseDate)) {
                    oldestTrack = track;
                }

                totalDuration += track.durationMs;
            }

        });

        const favoriteDecade = Object.keys(decades).reduce((a, b) => decades[a] > decades[b] ? a : b);
        const avgMinutes = (totalDuration / tracks.length / 60000).toFixed(1);

        
        let durationText = "";
        if (avgMinutes < 3.0) durationText = "Lately, you've needed quick energy boosts.";
        else if (avgMinutes > 4.5) durationText = "This month, you've had the patience for masterpieces.";
        else durationText = "You've been sticking to the sweet spot of radio hits.";

        return {
            decade: favoriteDecade,
            oldestTitle: oldestTrack.name,
            oldestTtileLink: oldestTrack.uri,
            oldestArtist: oldestTrack.artists[0].name,
            oldestYear: oldestTrack.album.releaseDate.substring(0, 4),
            avgTime: avgMinutes,
            durationVerdict: durationText
        };

    }, [tracks]);

    if (!storyData) return null;

    return (
        <div className="story-container">
            <h2 className="story-header">What go we have here?</h2>
            
            <div className="story-content">
                <div className="story-sentence-container">
                    <p className="story-sentence">
                        Lately, your headphones have been stuck in the <span className="highlight">{storyData.decade}</span> That's the era currently fueling your days.
                    </p>
                </div>
                <div className="story-sentence-container">
                    <p className="story-sentence">
                        Your recent tracks average <span className="highlight">{storyData.avgTime} minutes</span> {storyData.durationVerdict}
                    </p>
                </div>
                <div className="story-sentence-container">
                    <p className="story-sentence">
                        Even though you're looking forward, you revisited a classic from <span className="highlight">{storyData.oldestYear}</span>
                            <span className="highlight-alt"><a href={storyData.oldestTtileLink} className="link-spotify-overlay">"{storyData.oldestTitle}" </a></span> by {storyData.oldestArtist}.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MusicStory;