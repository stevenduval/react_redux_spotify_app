import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from "@mui/material";

export const Login = () => {

    const handleClick = () => {

        // implicit grant spotify
        const clientID = '93f774ac0a7c4aa293f247f7769e0368';
        const redirectURL = 'http://localhost:3000'
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;

    }

    return (
        <Dialog open={true} aria-describedby="please authorize spotify to continue" >
        <DialogTitle sx={{textAlign: "center"}}>Spotify Playlist Maker</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{textAlign: "center"}}>
           To use please authorize Spotify:
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'space-evenly'}}>
        <Button variant="contained" onClick={handleClick} sx={{background: '#1db954'}} >Authorize Spotify</Button>
        </DialogActions>
      </Dialog>
    );

}