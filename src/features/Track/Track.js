import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';


export const Track = (props) => {

    const { data, handlePlay, playing, isRemoval, onAdd, onRemove } = props;

    const addTrack = () => onAdd(data);
    const removeTrack = () => onRemove(data);

    // Add & Remove Icons
    const renderPlaylistAction = (isRemoval) => {
        if (isRemoval) {
            return <IconButton onClick={removeTrack} edge='end' aria-label='remove'><RemoveIcon /></IconButton>
        } else {
            return <IconButton onClick={addTrack} edge='end' aria-label='add'><AddIcon /></IconButton>
        }
    }

    // If song preview is avail show play or stop icons, if not avail show do not disturb icon
    const renderPlaylistPreviewAction = () => {
        if (data.preview) {
            if (playing === data.preview) {
                return <StopCircleIcon className='stop' onClick={() => handlePlay(data.preview)} fontSize='large' sx={{ cursor: 'pointer' }} />
            } else {
                return <PlayCircleIcon className='play' onClick={() => handlePlay(data.preview)} fontSize='large' sx={{ cursor: 'pointer' }} />
            }
        } else {
            return <DoNotDisturbOnIcon fontSize='large' />
        }
    }

    return (
        <ListItem secondaryAction={renderPlaylistAction(isRemoval)} >
            <ListItemAvatar>
                <Avatar>
                    {renderPlaylistPreviewAction()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data.name} secondary={`${data.artist} | ${data.album}`} />
        </ListItem>
    );

}