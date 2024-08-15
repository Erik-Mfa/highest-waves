import React from 'react';
import { useParams } from 'react-router-dom';
import BeatDetails from '../../components/BeatDetails/BeatDetails';
import PurchaseCart from '../../components/PurchaseCart/PurchaseCart';

function BeatDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <BeatDetails beatId={id} />
      <PurchaseCart beatId={id} />
    </div>
  );
}

export default BeatDetailsPage;
