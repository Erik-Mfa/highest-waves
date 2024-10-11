import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentId: null,
  currentTrack: null,
  currentTitle: '',
  currentOwner: null,
  currentCover: '',
  isPlaying: false,
  isRepeating: false,
  volume: 0.5,
  isShuffling: false, // Add shuffle state
};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setCurrentTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setCurrentCover: (state, action) => {
      state.currentCover = action.payload;
    },
    setCurrentOwner: (state, action) => {
      state.currentOwner = action.payload;
    },
    togglePlayPause: (state, action) => {
      state.isPlaying = action.payload ?? !state.isPlaying;
    },
    setIsRepeating: (state, action) => {
      state.isRepeating = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setIsShuffling: (state, action) => { // Define setIsShuffling reducer
      state.isShuffling = action.payload;
    },
  },
});

export const {
  setCurrentId,
  setCurrentTrack,
  setCurrentTitle,
  setCurrentCover,
  setCurrentOwner,
  togglePlayPause,
  setIsRepeating,
  setVolume,
  setIsShuffling, // Export setIsShuffling
} = audioPlayerSlice.actions;

export const selectCurrentTrack = (state) => state.audioPlayer.currentTrack;
export const selectIsPlaying = (state) => state.audioPlayer.isPlaying;

export default audioPlayerSlice.reducer; // Export the reducer as default
