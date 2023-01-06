import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

export const Track = (props) => {

    const { data, handlePlay, playing, isRemoval, onAdd, onRemove } = props;

    const addTrack = () => onAdd(data);
    const removeTrack = () => onRemove(data);

    const renderPlaylistAction = (isRemoval) => {
        if (isRemoval) { 
           return <IconButton onClick={removeTrack} edge="end" aria-label="remove"><RemoveIcon /></IconButton>
        } else { 
            return <IconButton onClick={addTrack} edge="end" aria-label="add"><AddIcon /></IconButton>
        }
    }
 
    return (
        <ListItem
            secondaryAction={renderPlaylistAction(isRemoval)} >
            <ListItemAvatar>
                <Avatar>
                    {data.preview ? (
                        <> {playing === data.preview ? (
                            <StopCircleIcon className='stop' onClick={() => handlePlay(data.preview)} fontSize="large" sx={{ cursor: "pointer" }} />
                            ) : (
                            <PlayCircleIcon className='play' onClick={() => handlePlay(data.preview)} fontSize="large" sx={{ cursor: "pointer" }} />
                            )}
                        </>
                    ) : (
                            <DoNotDisturbOnIcon fontSize="large"/>
                    )}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={data.name}
                secondary={`${data.artist} | ${data.album}`}
            />
        </ListItem>
    );

}