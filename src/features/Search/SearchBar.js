import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks, selectAccessToken } from "../../app/spotifyDataSlice";

export const SearchBar = () => {

    const dispatch = useDispatch();
    const token = useSelector(selectAccessToken);

    const handleChange = (e) => {
        const term = e.target.value;
        dispatch(fetchTracks({term, token}));
    }

    const label = 'Enter a Song, Album, or Artist'; 

    return (
        <TextField id="outlined-basic" label={label} variant="outlined" fullWidth onChange={handleChange} />
    );

}