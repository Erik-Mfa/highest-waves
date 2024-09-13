import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './audioPlayerSlice';
import playlistReducer from './playlistSlice';
import cartReducer from './cartSlice'; 

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    playlist: playlistReducer,
    cart: cartReducer, 
  },
});
