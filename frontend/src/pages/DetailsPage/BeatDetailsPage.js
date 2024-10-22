/* eslint-disable react/prop-types */
import React from 'react'
import BeatDetails from '../../components/Beats/BeatDetails/BeatDetails'

function BeatDetailsPage({ playTrack }) {
  return (
    <div>
      <BeatDetails playTrack={playTrack} />
    </div>
  )
}

export default BeatDetailsPage
