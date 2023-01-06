import { SearchBar } from '../Search/SearchBar';
import { SearchResults } from '../Search/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Login } from '../Login/Login';

import { Container, Grid } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, setToken } from "../../app/spotifyDataSlice";
import { useNavigate } from "react-router-dom";

import { useEffect, useState, useRef } from "react";


export const Home = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const accessTokenState = useSelector(selectAccessToken);

    // check to see if implicit grant data is available for initial load and page refresh
    useEffect(() => {
        if (window.location.hash.substring(1).length > 0) {
            const params =  new URLSearchParams(window.location.hash.substring(1))
            let accessToken = params.get("access_token");
            const expiration = params.get("expires_in");
            window.setTimeout(() => accessToken = '', expiration * 1000);
            window.history.pushState('Access Token', null, '/');
            window.sessionStorage.setItem("accessToken", accessToken);
            dispatch(setToken(accessToken));
            history('/');
        } else if (window.sessionStorage.getItem("accessToken")) {
            dispatch(setToken(window.sessionStorage.getItem("accessToken")));
        }

    }, [dispatch, history]);

    // set url of playing track
    const [playing, setPlaying] = useState(null);

    // mutable reference to audio 
    const song = useRef(null);

    const handlePlay = (url) => {
        // if song playing, pause song and clear state
        if (song.current) { 
            song.current.pause();
            setPlaying(null);
            // if current song playing is clicked clear ref and exit
            if (song.current.src === url) { 
                song.current = null;
                return false;
            }
        }
        // set ref, set state, play song
        song.current = new Audio(url);
        setPlaying(url);
        song.current.play();
        // once song ends clear ref and state
        song.current.onended = () => {
            song.current = null;
            setPlaying(null);
        }
    }


    return (
        <>
            {accessTokenState.length === 0 && <Login />}
            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <SearchBar />
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <SearchResults playing={playing} handlePlay={handlePlay} />
                    <Playlist playing={playing} handlePlay={handlePlay} />
                </Grid>
            </Container>
        </>
    );

}