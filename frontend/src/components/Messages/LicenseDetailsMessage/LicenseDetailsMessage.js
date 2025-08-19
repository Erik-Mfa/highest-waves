import React from 'react'

// eslint-disable-next-line react/prop-types
function LicenseDetailsMessage({ license }) {
  if (!license) return null

  const formatStreamLimit = (limit) => {
    if (limit === -1) return 'Unlimited'
    return Number(limit).toLocaleString()
  }

  const formatVideoLimit = (limit) => {
    if (limit === -1) return 'Unlimited'
    return limit
  }

  return (
    <div className="panel bg-brand-gradient rounded-2xl mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-brand-contrast">{license.name}</h3>
        <span className="text-lg font-semibold text-brand-light">${Number(license.basePrice).toFixed(2)}</span>
      </div>

      {license.description && (
        <p className="mb-4 text-brand-contrast">{license.description}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between bg-black/20 p-3 rounded-md border border-white/10">
          <span className="text-sm text-brand-contrast">Streams</span>
          <span className="badge">{formatStreamLimit(license.streamLimit)}</span>
        </div>
        <div className="flex items-center justify-between bg-black/20 p-3 rounded-md border border-white/10">
          <span className="text-sm text-brand-contrast">Video Clips</span>
          <span className="badge">{formatVideoLimit(license.videoClipLimit)}</span>
        </div>
        <div className="flex items-center justify-between bg-black/20 p-3 rounded-md border border-white/10">
          <span className="text-sm text-brand-contrast">Publishing</span>
          <span className="badge">{license.publishingRoyalty}%</span>
        </div>
        <div className="flex items-center justify-between bg-black/20 p-3 rounded-md border border-white/10">
          <span className="text-sm text-brand-contrast">Master</span>
          <span className="badge">{license.masterRoyalty}%</span>
        </div>
      </div>

      {license.terms && (
        <div className="mt-4 text-sm text-brand-contrast">
          <span className="opacity-80">Terms:</span> {license.terms}
        </div>
      )}
    </div>
  )
}

export default LicenseDetailsMessage





