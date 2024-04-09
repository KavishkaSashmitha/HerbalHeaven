import React from 'react';
import { Button } from "@material-tailwind/react";

function CreateLoadingScreen(loading) {
  if (loading) {
    return (
      <div className="bg-gray-700 h-screen flex justify-center items-center">
        <Button
          className="h-10 w-40"
          loading={true}
          style={{ backgroundColor: "red" }}
        >
          Loading
        </Button>
      </div>
    );
  }
  return null; // Render nothing if loading is false
}

export default CreateLoadingScreen;
