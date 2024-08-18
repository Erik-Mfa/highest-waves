import React from 'react';
import { useParams } from 'react-router-dom'; 
import BeatDetails from '../../components/BeatDetails/BeatDetails'; 

function BeatDetailsPage({user}) {
  const { id: beatId } = useParams(); 

  return (
    <div>
      <BeatDetails beatId={beatId} user={user}/>
    </div>
  );
}

export default BeatDetailsPage;
