package com.example.backend;

import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.User;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.model_objects.specification.Artist;
import org.springframework.beans.factory.annotation.Value;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import org.apache.hc.core5.http.ParseException;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SpotifyController {

    @Value("${SPOTIFY_CLIENT_ID}")
    private String clientId;

    @Value("${SPOTIFY_CLIENT_SECRET}")
    private String clientSecret;

    @Value("${SPOTIFY_REDIRECT_URI}")
    private URI redirectUri;

    private SpotifyApi spotifyApi;
    
    @PostConstruct
    public void init() {
        this.spotifyApi = new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRedirectUri(redirectUri)
                .build();
    }

    @GetMapping("/login-url")
    public String getLoginUrl() {
        // These are the "permissions" we ask the user for
        // "user-top-read" = allow us to read their top artists and tracks
        return spotifyApi.authorizationCodeUri()
                .scope("user-top-read,user-library-read")
                .show_dialog(true)
                .build()
                .execute()
                .toString();
    }

    @GetMapping("/logout")
    public String logout() {
        spotifyApi.setAccessToken(null);
        return "Logged out successfully";
    }

    @GetMapping("/all-data")
    public AllUserData getAllUserData(@RequestParam String code) {
        try {
            AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code).build();
            var tokenResponse = authorizationCodeRequest.execute();

            spotifyApi.setAccessToken(tokenResponse.getAccessToken());

            User user = spotifyApi.getCurrentUsersProfile().build().execute();

            Paging<Track> trackPaging = spotifyApi.getUsersTopTracks()
                    .limit(50)
                    .time_range("medium_term")
                    .build()
                    .execute();

            
            Paging<Artist> topArtistPaging = spotifyApi.getUsersTopArtists()
                    .limit(50)
                    .time_range("medium_term")
                    .build()
                    .execute();


            return new AllUserData(
                user,
                trackPaging.getItems(),
                topArtistPaging.getItems()
            );

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }
    }
}