package com.example.backend;


import se.michaelthelin.spotify.model_objects.specification.User;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.model_objects.specification.Artist;
// import se.michaelthelin.spotify.model_objects.specification.*;

public class AllUserData {

    private User user;
    private Track[] topTracks;
    private Artist[] topArtists;

    public AllUserData(User user, Track[] topTracks, Artist[] topArtists) {
        this.user = user;
        this.topTracks = topTracks;
        this.topArtists = topArtists;
    }

    public User getUser() {
        return user;
    }

    public Track[] getTopTracks() {
        return topTracks;
    }

    public Artist[] getTopArtists(){
        return topArtists;
    }
}