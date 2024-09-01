import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './audioPlayerSlice';
import playlistReducer from './playlistSlice';

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
    playlist: playlistReducer,
  },
});
