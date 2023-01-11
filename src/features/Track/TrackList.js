import { Track } from './Track';
import { List } from '@mui/material';


export const TrackList = (props) => {

    const {data, onAdd, onRemove, isRemoval, playing, handlePlay} = props;

    return (
        <List dense>
            {data.map((item, index) => (
                <Track data={item} key={index} playing={playing} handlePlay={handlePlay} isRemoval={isRemoval} onAdd={onAdd} onRemove={onRemove} />
            ))}
        </List>
    );

}