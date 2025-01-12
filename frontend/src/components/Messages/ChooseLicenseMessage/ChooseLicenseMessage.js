import React, { useEffect, useState } from "react";
import { FaGem, FaCrown, FaStar } from "react-icons/fa"; // Importing icons from react-icons
import { getBeatById } from "../../../services/api/beats";

// eslint-disable-next-line react/prop-types
const ChooseLicenseMessage = ({ onCancel, onConfirm, id }) => {
  const [beat, setBeats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beatResponse = await getBeatById(id);
        setBeats(beatResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(beat);

  // Map icons dynamically based on license type
  const iconMapper = {
    diamond: <FaGem className="text-teal-400 text-2xl" />,
    gold: <FaCrown className="text-yellow-400 text-2xl" />,
    premium: <FaStar className="text-purple-400 text-2xl" />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        <div>
          <p className="text-lg font-semibold text-gray-300">Available Licenses:</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beat?.licenses?.length > 0 ? (
              beat.licenses.map((license, index) => (
                <div
                  key={license._id || index}
                  className="flex flex-col items-center space-y-2 rounded-md bg-gray-700 p-4 shadow-md transition duration-200 hover:bg-gray-600"
                >
                  <div>{iconMapper[license.icon] || null}</div> {/* Render mapped icon or null */}
                  <span className="text-lg font-semibold text-teal-400">{license.name}</span>
                  <p className="text-sm text-gray-300 text-center">{license.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No licenses available</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={onCancel}
              className="rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-red-600 px-4 py-2 text-white transition duration-200 hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLicenseMessage;
