import React from "react";
import { Button } from "@material-tailwind/react";

function CreateLoadingScreen(loading) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-custom-color animate-bounce">
        <div className="justify-center md-auto">
          <img
            src="/logo/loading.png"
            alt="Description of the image"
            style={{ width: "100px", height: "100px" }}
          />
        </div>

        <div className="flex flex-col width-auto px-10">
          <div className="flex flex-row">
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-amber-800 animate-bounce">
              H
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-blue-gray-100 animate-pulse">
              E
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-amber-800 animate-bounce">
              R
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-blue-gray-100 animate-pulse">
              B
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-amber-800 animate-bounce">
              A
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-blue-gray-100 animate-pulse">
              L
            </div>
          </div>
          <div className="pt-5 flex flex-row px-20">
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-amber-800 animate-bounce">
              H
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-blue-gray-100 animate-pulse">
              E
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-amber-800 animate-bounce">
              A
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-blue-gray-100 animate-pulse">
              V
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-amber-800 animate-bounce">
              E
            </div>
            <div class="w-10 h-10 pt-2 px-3 text-3xl font-sans font-bold text-blue-gray-100 animate-pulse">
              N
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null; // Render nothing if loading is false
}

export default CreateLoadingScreen;
