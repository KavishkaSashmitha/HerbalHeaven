import React from 'react';
import { Button } from '@material-tailwind/react';

function CreateLoadingScreen(loading) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-custom-color ">
        <div className="justify-center md-auto">
          <h2 className="text-white text-lg">Herbal Heaven</h2>
        </div>
        <div className="flex space-x-4">
          <div class="w-10 h-10 bg-yellow-300 rounded-full animate-bounce"></div>
          <div class="w-10 h-10 bg-blue-300 rounded-full animate-pulse"></div>
          <div class="w-10 h-10 bg-pink-300 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }
  return null; // Render nothing if loading is false
}

export default CreateLoadingScreen;
