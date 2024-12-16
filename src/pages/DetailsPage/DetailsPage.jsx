{isModalOpen && selectedOffer && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-5 rounded-lg w-full max-w-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* Offer Image */}
          <img
            src={selectedOffer.image || 'https://i.ibb.co/JjrS14H/cashooz.png'}
            alt="Offer Icon"
            className="w-12 h-12 rounded-md mr-3"
          />
          <div>
            <p className="text-green-400 text-lg font-bold">$ {selectedOffer?.price || 'N/A'}</p>
            <div className="flex items-center">
              <span className="text-yellow-300 mr-2">Popularity Score:</span>
              <div className="text-yellow-400">
                {/* Star rating */}
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-white text-xl"
        >
          ×
        </button>
      </div>

      {/* Description Box with Shadow */}
      <div className="bg-gray-900 p-4 rounded-md shadow-md mb-4">
        <p className="text-white font-semibold mb-2">Description</p>
        <p className="text-gray-300 text-sm">
          {selectedOffer?.description || 'Test your vision to the max with this funny pictures and puzzles! Are you ready? Simply finish this fun quiz and score 100% at the end to earn your reward!'}
        </p>
        {/* More Info Toggle */}
        <div className="text-blue-400 mt-2 cursor-pointer flex items-center" onClick={toggleMoreInfo}>
          <span>More Info</span>
          <span className="ml-1">{isMoreInfoOpen ? '▲' : '▼'}</span>
        </div>
        {isMoreInfoOpen && (
          <div className="text-gray-300 mt-2">
            {/* Additional details content */}
            <p>Extra details about the offer can go here...</p>
          </div>
        )}
      </div>

      {/* Earn button */}
      <button
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
        onClick={handleCompleteOffer}
      >
        Earn $0.10
      </button>
    </div>
  </div>
)}


