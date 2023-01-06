import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTracks = createAsyncThunk(
    'spotify/getTracks',
    async (data) => {
        const { term, token } = data;
        if (!term) { 
            return [];
        }
        const response =  await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
          });
        const trackData = await response.json();
        return trackData.tracks.items.map(item => ({
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            uri: item.uri,
            preview: item.preview_url
        }));
    }
)

export const savePlaylist = createAsyncThunk(
    'spotify/savePlaylist',
    async (data) => {
        const { playlistName, accessToken, uris } = data;
        let userID, playListID;
        // get user id 
        try {
            const response = await fetch(`https://api.spotify.com/v1/me`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                userID = jsonResponse.id;
            }
        }
        catch (error) {
            console.error(error);
        }

        // create playlist and get playlist id
        try {
            const data = JSON.stringify({ name: `${playlistName}` });
            const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                method: 'POST',
                body: data
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                playListID = jsonResponse.id;
            }
        }
        catch (error) {
            console.error(error);
        }

        // add tracks to playlist

        try {
            const data = JSON.stringify({ uris });
            const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                method: 'POST',
                body: data
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
)


const initialState = {
    accessToken : '',
    searchResults: [],
    playlistName : '',
    playlistTracks: [],
    trackPreviewPlaying : '',
    searchResultsError: false,
    searchResultsLoading: false,
  };

export const spotifyDataSlice = createSlice({
    name: 'spotifyData',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setPlaylistName: (state, action) => {
            state.playlistName = action.payload;
        },
        setPlaylistTracks: (state, action) => {
            state.playlistTracks = action.payload;
        },
        setPlaylistTracksAfterRemoval: (state, action) => {
            state.playlistTracks = action.payload;
        },
        setTrackPreviewPlaying: (state, action) => {
            state.trackPreviewPlaying = action.payload;
        }
    }, 
    extraReducers: (builder) => {
        // to fetch tracks
        builder.addCase(fetchTracks.pending, (state, action) => {
            state.searchResultsLoading = true;
            state.searchResultsError = false;
        })
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.searchResults = action.payload;
            state.searchResultsLoading  = false;
            state.searchResultsError = false;
        })
        builder.addCase(fetchTracks.rejected, (state, action) => {
            state.searchResultsLoading = false;
            state.searchResultsError = true;
        })
    },
})


export const selectAccessToken = (state) => state.spotifyData.accessToken;

export const selectSearchResults = (state) => state.spotifyData.searchResults;
export const isLoadingSearchResults = (state) => state.spotifyData.searchResultsLoading;
export const isErrorSearchResults = (state) => state.spotifyData.searchResultsError;

export const selectPlaylistName = (state) => state.spotifyData.playlistName;
export const selectPlaylistTracks = (state) => state.spotifyData.playlistTracks;
export const selectTrackPreviewPlaying = (state) => state.spotifyData.trackPreviewPlaying;

export const { setToken, setPlaylistName, setPlaylistTracks, setPlaylistTracksAfterRemoval, setTrackPreviewPlaying } = spotifyDataSlice.actions

export default spotifyDataSlice.reducer;