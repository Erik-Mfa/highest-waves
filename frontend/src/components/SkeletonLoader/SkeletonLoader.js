const SkeletonLoader = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render multiple skeleton items to simulate beats */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 border border-gray-600 rounded-lg flex flex-col items-center animate-pulse"
          >
            {/* Placeholder for the image */}
            <div className="w-32 h-32 bg-gray-700 rounded-md mb-4"></div>
            {/* Placeholder for the title */}
            <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
            {/* Placeholder for the price */}
            <div className="w-16 h-4 bg-gray-700 rounded mb-2"></div>
            {/* Placeholder for the BPM */}
            <div className="w-20 h-4 bg-gray-700 rounded mb-2"></div>
            {/* Placeholder for the tone */}
            <div className="w-20 h-4 bg-gray-700 rounded mb-4"></div>
            {/* Placeholder for the delete button */}
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;
  