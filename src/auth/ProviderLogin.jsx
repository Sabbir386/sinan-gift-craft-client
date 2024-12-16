import React from 'react';

const ProviderLogin = () => {
    return (
        <button
        onClick={handleGoogleSignIn}
        className="bg-cardBackground text-white border w-full h-12 rounded-md mt-6 grid place-items-center text-xs shadow-sm"
      >
        <div className="flex gap-3 justify-center items-center">
          <FaGoogle />
          <span>Continue with Google</span>
        </div>
      </button>
    );
};

export default ProviderLogin;