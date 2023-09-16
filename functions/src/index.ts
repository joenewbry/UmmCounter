import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


// From these docs: https://firebase.google.com/docs/functions/gcp-storage-events?gen=2nd

 // const {onObjectFinalized} = require("firebase-functions/v2/storage");
// const logger = require("firebase-functions/logger");
// const {onObjectFinalized} = require("firebase-functions/v2/storage");

// export archivedopts = onObjectArchived({ bucket: "myBucket" }, (event) => {
//   //…
// });

// export const triggerOnAudioSave = onObjectFinalized({cpu: 2}, async (event) => {
// // ...

//   return logger.log("Called when audio file is saved!");

  // const fileBucket = event.data.bucket; // Storage bucket containing the file.
  // const filePath = event.data.name; // File path in the bucket.
  // const contentType = event.data.contentType; // File content type.

  // // Exit if this is triggered on a file that is not an image.
  // if (!contentType.startsWith("image/")) {
  //   return logger.log("This is not an image.");
  // }
  // // Exit if the image is already a thumbnail.
  // const fileName = path.basename(filePath);
  // if (fileName.startsWith("thumb_")) {
  //   return logger.log("Already a Thumbnail.");
  // }


// });
