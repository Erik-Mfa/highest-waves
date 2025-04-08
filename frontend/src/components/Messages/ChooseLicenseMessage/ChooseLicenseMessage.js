import React, { useEffect, useState } from "react";
import { FaGem, FaCrown, FaStar, FaExclamationCircle } from "react-icons/fa";
import { getBeatById } from "../../../services/api/beats";

// eslint-disable-next-line react/prop-types
const ChooseLicenseMessage = ({ onCancel, onConfirm, id }) => {
  const [beat, setBeats] = useState(null);
  const [selectedLicense, setSelectedLicense] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beatResponse = await getBeatById(id);
        console.log('Fetched beat data:', beatResponse);
        setBeats(beatResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleLicenseSelect = (license) => {
    console.log('Selected license:', license);
    setSelectedLicense(license);
  };

  const handleConfirm = () => {
    console.log('Confirming purchase with license:', selectedLicense);
    onConfirm(selectedLicense);
  };

  // Map icons and colors dynamically based on license type
  const licenseStyles = {
    gold: {
      icon: <FaCrown className="size-8" />,
      color: "text-yellow-400",
      bgHover: "hover:bg-yellow-600/20",
      bgSelected: "bg-yellow-600/30",
      iconBg: "bg-yellow-400/10",
      border: "border-yellow-400/30"
    },
    platinum: {
      icon: <FaStar className="size-8" />,
      color: "text-purple-400",
      bgHover: "hover:bg-purple-600/20",
      bgSelected: "bg-purple-600/30",
      iconBg: "bg-purple-400/10",
      border: "border-purple-400/30"
    },
    diamond: {
      icon: <FaGem className="size-8" />,
      color: "text-teal-400",
      bgHover: "hover:bg-teal-600/20",
      bgSelected: "bg-teal-600/30",
      iconBg: "bg-teal-400/10",
      border: "border-teal-400/30"
    },
    exclusive: {
      icon: <FaExclamationCircle className="size-8" />,
      color: "text-red-400",
      bgHover: "hover:bg-red-600/20",
      bgSelected: "bg-red-600/30",
      iconBg: "bg-red-400/10",
      border: "border-red-400/30"
    }
  };

  const formatStreamLimit = (limit) => {
    if (limit === -1) return 'Unlimited';
    return limit.toLocaleString();
  };

  const formatVideoLimit = (limit) => {
    if (limit === -1) return 'Unlimited';
    return limit;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-lg rounded-xl bg-gray-900/95 p-4 shadow-2xl">
        <h2 className="mb-3 text-xl font-bold text-white">Choose Your License</h2>
        <div className="space-y-2">
          {beat?.licenses?.length > 0 ? (
            beat.licenses.map((license) => {
              const style = licenseStyles[license.icon];
              return (
                <div
                  key={license.id}
                  className={`cursor-pointer rounded-lg border p-3 transition-all duration-300 ${
                    selectedLicense?.id === license.id 
                      ? `${style.bgSelected} border-${style.color}`
                      : `bg-gray-800/50 border-gray-700/50 ${style.bgHover}`
                  }`}
                  onClick={() => handleLicenseSelect(license)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`shrink-0 rounded-lg ${style.iconBg} p-2`}>
                        <span className={style.color}>
                          {style.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-lg font-bold ${style.color} truncate`}>
                            {license.name}
                          </span>
                          <span className={`text-xl font-bold ${style.color} ml-2 shrink-0`}>
                            ${license.basePrice}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-400">
                            Stream Limit: {formatStreamLimit(license.streamLimit)}
                          </p>
                          <p className="text-xs text-gray-400">
                            Video Clips: {formatVideoLimit(license.videoClipLimit)}
                          </p>
                          {!license.isExclusive && (
                            <>
                              <p className="text-xs text-gray-400">
                                Publishing Royalty: {license.publishingRoyalty}%
                              </p>
                              <p className="text-xs text-gray-400">
                                Master Royalty: {license.masterRoyalty}%
                              </p>
                            </>
                          )}
                          {license.isExclusive && (
                            <p className="text-xs text-red-400 font-bold">
                              Exclusive Rights - Beat will be removed from catalog
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">No licenses available</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4">
          <button
            onClick={onCancel}
            className="rounded-lg bg-gray-700 px-5 py-2 font-medium text-white transition-all hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`rounded-lg px-5 py-2 font-medium transition-all ${
              selectedLicense
                ? "bg-teal-600 text-white hover:bg-teal-500"
                : "cursor-not-allowed bg-gray-600 text-gray-400"
            }`}
            disabled={!selectedLicense}
          >
            {selectedLicense ? `Purchase for $${selectedLicense.basePrice}` : 'Select a License'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseLicenseMessage;
