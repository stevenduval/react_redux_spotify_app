import { useDispatch, useSelector } from 'react-redux';
import { fetchTracks, selectAccessToken } from '../../app/spotifyDataSlice';
import { TextField } from '@mui/material';


export const SearchBar = () => {

    const dispatch = useDispatch();
    const token = useSelector(selectAccessToken);

    // on change of search bar fetch tracks to display
    const handleChange = (e) => {
        const term = e.target.value;
        dispatch(fetchTracks({term, token}));
    }

    return (
        <TextField id='outlined-basic' label='Enter a Song, Album, or Artist' variant='outlined' fullWidth onChange={handleChange} />
    );

}