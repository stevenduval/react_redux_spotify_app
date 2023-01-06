import { Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { savePlaylist, selectAccessToken, selectPlaylistName, selectPlaylistTracks, setPlaylistName, setPlaylistTracks ,setPlaylistTracksAfterRemoval } from "../../app/spotifyDataSlice";
import { TrackList } from "../Track/TrackList";


export const Playlist = (props) => {

    const { playing, handlePlay } = props;

    const playlistTracks = useSelector(selectPlaylistTracks);
    const playlistName = useSelector(selectPlaylistName);
    const accessToken = useSelector(selectAccessToken);

    const dispatch = useDispatch();

    const onRemove = (track) => {
        //remove track from playlist
        const tracksAfterRemoval = playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
        dispatch(setPlaylistTracksAfterRemoval(tracksAfterRemoval));
    }

    const handleChange = (e) => {
        // set playlist name
        dispatch(setPlaylistName(e.target.value));
    }

    const handleSave = () => {
        // save playlist to spotify account
        if (playlistName.length > 0 && playlistTracks.length > 0) {
            const uris = playlistTracks.map(track => track.uri);
            dispatch(savePlaylist({playlistName, accessToken, uris}))
                .then(() => {
                    //clear playlist name
                    dispatch(setPlaylistName(''))
                    // clear playlist tracks
                    dispatch(setPlaylistTracks([]));
                })
        }
    }

    return (
        <Grid item xs={12} md={6}>
            <TextField id="standard-basic" label="Enter Playlist Name" value={playlistName} variant="standard" fullWidth onChange={handleChange}/>
            <TrackList data={playlistTracks} onRemove={onRemove} isRemoval={true} playing={playing} handlePlay={handlePlay} />
            <Button variant="contained" sx={{display: 'block', margin: '0 auto', background: '#1db954', padding: '5px'}} onClick={handleSave}>Save to Spotify</Button>
        </Grid>
    );

}