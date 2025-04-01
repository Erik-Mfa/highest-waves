import React, { useEffect, useState } from "react";
import { FaGem, FaCrown, FaStar } from "react-icons/fa"; // Importing icons from react-icons
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

  // Map icons dynamically based on license type
  const iconMapper = {
    diamond: <FaGem className="text-teal-400 text-2xl" />,
    gold: <FaCrown className="text-yellow-400 text-2xl" />,
    premium: <FaStar className="text-purple-400 text-2xl" />,
  };

  const calculatePrice = (license) => {
    if (!beat || !license) return 0;
    const price = beat.price * (license.priceMultiplier || 1);
    console.log('Calculated price:', { 
      basePrice: beat.price, 
      multiplier: license.priceMultiplier, 
      finalPrice: price 
    });
    return price.toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        <div>
          <p className="text-lg font-semibold text-gray-300">Available Licenses:</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beat?.licenses?.length > 0 ? (
              beat.licenses.map((license) => (
                <div
                  key={license._id}
                  className={`flex cursor-pointer flex-col items-center space-y-2 rounded-md p-4 shadow-md transition duration-200 hover:bg-gray-600 ${
                    selectedLicense?._id === license._id ? "bg-teal-700" : "bg-gray-700"
                  }`} 
                  onClick={() => handleLicenseSelect(license)}
                >
                  <div>{iconMapper[license.icon] || null}</div>
                  <span className={`text-lg font-semibold ${
                    selectedLicense?._id === license._id ? "text-white" : "text-teal-400"
                  }`}>
                    {license.name}
                  </span>
                  <p className={`text-sm text-center ${
                    selectedLicense?._id === license._id ? "text-gray-200" : "text-gray-300"
                  }`}>
                    {license.description}
                  </p>
                  <p className="mt-2 text-xl font-bold text-teal-400">
                    ${calculatePrice(license)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No licenses available</p>
            )}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={onCancel}
              className="rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`rounded-md px-4 py-2 text-white transition duration-200 ${
                selectedLicense
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedLicense}
            >
              Confirm (${calculatePrice(selectedLicense)})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLicenseMessage;
