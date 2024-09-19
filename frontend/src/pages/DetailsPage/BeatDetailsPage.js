import React from 'react';
import { useParams } from 'react-router-dom'; 
import BeatDetails from '../../components/Beats/BeatDetails/BeatDetails'; 

function BeatDetailsPage({ playTrack }) {
  

  return (
    <div>
      <BeatDetails playTrack={playTrack} />
    </div>
  );
}

export default BeatDetailsPage;
