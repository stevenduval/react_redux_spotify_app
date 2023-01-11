import { useDispatch, useSelector } from 'react-redux';
import { selectPlaylistTracks, selectSearchResults, setPlaylistTracks } from '../../app/spotifyDataSlice';
import { TrackList } from '../Track/TrackList';
import { Grid } from '@mui/material';


export const SearchResults = (props) => {

    const { playing, handlePlay } = props;
    
    const data = useSelector(selectSearchResults);
    const playlistTracks = useSelector(selectPlaylistTracks);

    const dispatch = useDispatch();

    // add track to playlist
    const onAdd = (track) => {
        if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        dispatch(setPlaylistTracks([...playlistTracks, track]));
    }

    return (
        <Grid item xs={12} md={6}>
           <TrackList data={data} onAdd={onAdd} isRemoval={false} playing={playing} handlePlay={handlePlay} />
        </Grid>
    );

}