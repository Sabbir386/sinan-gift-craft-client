import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section class="bg-secondaryColor flex items-center justify-center h-screen">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-red-400">404</h1>
          <p class="text-2xl mt-4 text-white">Page Not Found</p>
          <p class="mt-2 text-grayColor">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            href="/"
            class="mt-6 inline-block bg-buttonBackground text-white py-2 px-4 rounded hover:bg-green-500"
          >
            Go to Homepage
          </Link>
        </div>
      </section>
    );
};

export default NotFound;