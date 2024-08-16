import React from 'react';
import { useParams } from 'react-router-dom'; 
import BeatDetails from '../../components/BeatDetails/BeatDetails'; 

function BeatDetailsPage() {
  const { id: beatId } = useParams(); 

  return (
    <div>
      <BeatDetails beatId={beatId} />
    </div>
  );
}

export default BeatDetailsPage;
