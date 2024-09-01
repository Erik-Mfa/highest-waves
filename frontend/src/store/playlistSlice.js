import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlist: [], // Array of track objects
  currentIndex: 0,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    addTrack: (state, action) => {
      state.playlist.push(action.payload);
    },
    removeTrack: (state, action) => {
      state.playlist = state.playlist.filter((_, index) => index !== action.payload);
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state) => {
      console.log("state")
      state.currentIndex = (state.currentIndex + 1) % state.playlist.length;
    },
    prevTrack: (state) => {
      state.currentIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
    },
    addCurrentTrackToStart: (state) => {
      const currentTrack = state.playlist[state.currentIndex];
      if (currentTrack) {
        state.playlist = [currentTrack, ...state.playlist.filter((_, index) => index !== state.currentIndex)];
        state.currentIndex = 0;
      }
    },
  },
});

export const { setPlaylist, addTrack, removeTrack, setCurrentIndex, nextTrack, prevTrack, addCurrentTrackToStart } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist.playlist;
export const selectCurrentTrackIndex = (state) => state.playlist.currentIndex;

export default playlistSlice.reducer;
