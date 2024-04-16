import React, { useState, useEffect, useCallback } from "react";
import firebase from "./middleware/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ImageUpload() {
  const [state, setState] = useState();

  const onSubmit = useCallback(() => {
    const storage = getStorage(firebase);
    const storageRef = ref(storage, `profilePictures/test-img`);
    uploadBytes(storageRef, state).then(() => {
      console.log("Profile picture uploaded successfully");
      // You can also save the URL to your database for later retrieval
      getDownloadURL(storageRef).then((url) => {
        console.log("Profile picture URL:", url);
        console.log(url);
      });
    });
  }, [state]);

  return (
    <>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => setState(e.target.files[0])}
        className={`peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`}
      />
      <button
        className="m-2 relative select-none rounded-lg bg-green-500 py-3.5 px-14 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="submit"
        onClick={onSubmit}
      >
        Submit
      </button>
    </>
  );
}
