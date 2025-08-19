import React, { useEffect, useState } from "react";
import { FaGem, FaCrown, FaStar, FaMedal } from "react-icons/fa";
import { getBeatById } from "../../../services/api/beats";

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

  // Map icons and colors dynamically based on license type - matching BeatDetails
  const licenseStyles = {
    gold: {
      icon: <FaMedal className="text-2xl text-yellow-400" />,
      color: "text-yellow-400",
      bg: "bg-yellow-600/20",
      border: "border-yellow-400/30",
      gradient: "from-yellow-600/10 to-yellow-800/10",
      bgSelected: "bg-yellow-600/40",
      borderSelected: "border-yellow-400/60"
    },
    platinum: {
      icon: <FaStar className="text-2xl text-slate-400" />,
      color: "text-slate-400",
      bg: "bg-slate-600/20",
      border: "border-slate-400/30",
      gradient: "from-slate-600/10 to-slate-800/10",
      bgSelected: "bg-slate-600/40",
      borderSelected: "border-slate-400/60"
    },
    diamond: {
      icon: <FaGem className="text-2xl text-brand-blue" />,
      color: "text-brand-blue",
      bg: "bg-brand-blue/20",
      border: "border-brand-blue/30",
      gradient: "from-brand-blue/10 to-brand-blue-dark/10",
      bgSelected: "bg-brand-blue/40",
      borderSelected: "border-brand-blue/60"
    },
    exclusive: {
      icon: <FaCrown className="text-2xl text-purple-400" />,
      color: "text-purple-400",
      bg: "bg-purple-600/20",
      border: "border-purple-400/30",
      gradient: "from-purple-600/10 to-purple-800/10",
      bgSelected: "bg-purple-600/40",
      borderSelected: "border-purple-400/60"
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
      <div className="mx-auto w-full max-w-4xl rounded-xl bg-gray-900/95 p-8 shadow-2xl">
        <h2 className="mb-8 text-2xl font-bold text-white">Choose Your License</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {beat?.licenses?.length > 0 ? (
            beat.licenses.map((license) => {
              const style = licenseStyles[license.icon];
              const isSelected = selectedLicense?.id === license.id;
              
              return (
                <div
                  key={license.id}
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${style.gradient} backdrop-blur-sm border p-6 transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? `${style.bgSelected} ${style.borderSelected} scale-105 shadow-lg`
                      : `${style.border} hover:scale-105 hover:shadow-lg`
                  }`}
                  onClick={() => handleLicenseSelect(license)}
                >
                  <div className="flex items-center justify-between mb-4">
                    {style.icon}
                    <span className={`text-lg font-bold ${style.color}`}>
                      ${license.basePrice}
                    </span>
                  </div>
                  
                  <h3 className={`text-lg font-bold ${style.color} mb-3`}>
                    {license.name}
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-300 custom-font">
                      <span>Streams:</span>
                      <span className="font-medium">{formatStreamLimit(license.streamLimit)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 custom-font">
                      <span>Video Clips:</span>
                      <span className="font-medium">{formatVideoLimit(license.videoClipLimit)}</span>
                    </div>
                    {!license.isExclusive && (
                      <>
                        <div className="flex justify-between text-gray-300 custom-font">
                          <span>Publishing:</span>
                          <span className="font-medium">{license.publishingRoyalty}%</span>
                        </div>
                        <div className="flex justify-between text-gray-300 custom-font">
                          <span>Master:</span>
                          <span className="font-medium">{license.masterRoyalty}%</span>
                        </div>
                      </>
                    )}
                    {license.isExclusive && (
                      <div className={`text-center ${style.color} font-bold text-xs mt-3 p-2 rounded custom-font`}>
                        🚀 Exclusive Rights
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 col-span-full">No licenses available</p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-700 pt-6">
          <button
            onClick={onCancel}
            className="rounded-lg bg-gray-700 px-6 py-3 font-medium text-white transition-all hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`rounded-lg px-6 py-3 font-medium transition-all ${
              selectedLicense
                ? "bg-brand-blue text-white hover:bg-brand-blue-dark"
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
