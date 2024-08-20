import React from 'react';
import { useParams } from 'react-router-dom'; 
import BeatDetails from '../../components/Beats/BeatDetails/BeatDetails'; 

function BeatDetailsPage({ playTrack }) {
  const { id: beatId } = useParams(); 

  return (
    <div>
      <BeatDetails beatId={beatId} playTrack={playTrack} />
    </div>
  );
}

export default BeatDetailsPage;
