import React from 'react';
import { useParams } from 'react-router-dom';
import BeatDetails from '../../components/BeatDetails/BeatDetails';

function BeatDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <BeatDetails beatId={id} />
    </div>
  );
}

export default BeatDetailsPage;
