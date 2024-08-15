import React from 'react';
import { useParams } from 'react-router-dom'; // Ensure this is imported
import BeatDetails from '../../components/BeatDetails/BeatDetails'; // Ensure this is imported correctly

function BeatDetailsPage() {
  const { id: beatId } = useParams(); // Use useParams to get the beatId

  return (
    <div>
      <BeatDetails beatId={beatId} />
    </div>
  );
}

export default BeatDetailsPage;
