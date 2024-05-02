const { config } = require('dotenv');
const { initializeApp } = require('firebase/app');
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require('firebase/storage');
const multer = require('multer');
const { firebaseConfig } = require('./firabaseConfig');

const firebasaeApp = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebasaeApp);

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() }).single('image');
const uploadMiddleware = (req, res) => {
  upload(req, res, async (err) => {
    try {
      const dateTime = giveCurrentDateTime();

      if (req.body.existingImageUrl) {
        const existingImageRef = ref(storage, req.body.existingImageUrl);
        await deleteObject(existingImageRef);
        console.log('Existing image deleted successfully.');
      }

      const storageRef = ref(
        storage,
        `products/${req.file.originalname}_${dateTime}.${req.file.mimetype}`
      );

      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);
      req.imageUrl = downloadURL;
      console.log('File successfully uploaded.');
      const response = {
        message: 'File uploaded to Firebase Storage',
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL,
      };
      console.log('Response:', response); // Log the response
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  const giveCurrentDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
  };
};

module.exports = uploadMiddleware;
