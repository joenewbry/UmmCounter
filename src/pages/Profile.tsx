import { collection, getDocs } from "firebase/firestore/lite";
import { app, db } from "../firebase";
import { useEffect, useState } from "react";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);
// todo: this needs to include the full file name and extension

async function getTranscripts(db: any) {
  const transcriptsCollection = collection(db, "transcripts");
  const transcriptsSnapshot = await getDocs(transcriptsCollection);
  const transcriptionList = transcriptsSnapshot.docs.map((doc) => doc.data());
  return transcriptionList;
}

const Profile = () => {
  useEffect(() => {
    getTranscripts(db).then((data) => console.log(data));
  }, []);

  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      Profile
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button
        disabled={!file}
        onClick={async () => {
          if (file && file.name) {
            // duplicate file names will be overwritten
            const storageRef = ref(storage, `transcripts/evan/${file.name}`);
            const buffer = await file.arrayBuffer();
            const snapshot = await uploadBytes(storageRef, buffer);
            console.log("Uploaded a blob or file!", snapshot);
          }
        }}
      >
        Upload
      </button>
    </div>
  );
};
export default Profile;
