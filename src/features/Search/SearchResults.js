import { Grid } from "@mui/material";
import { TrackList } from "../Track/TrackList";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylistTracks, selectSearchResults, setPlaylistTracks } from "../../app/spotifyDataSlice";

export const SearchResults = (props) => {

    const { playing, handlePlay } = props;
    
    const data = useSelector(selectSearchResults);
    const playlistTracks = useSelector(selectPlaylistTracks);

    const dispatch = useDispatch();

    const onAdd = (track) => {
        // add track to playlist
        if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        dispatch(setPlaylistTracks([...playlistTracks, track]));
    }

    console.log(data);
    return (
        <Grid item xs={12} md={6}>
           <TrackList data={data} onAdd={onAdd} isRemoval={false} playing={playing} handlePlay={handlePlay} />
        </Grid>
    );

}