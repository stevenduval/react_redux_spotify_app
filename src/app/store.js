import { configureStore } from '@reduxjs/toolkit';
import spotifyDataReducer from './spotifyDataSlice';

export const store = configureStore({ 
    reducer: { 
       spotifyData: spotifyDataReducer,
    }
})