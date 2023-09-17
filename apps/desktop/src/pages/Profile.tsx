import { collection, getDocs } from "firebase/firestore/lite";
import { db, storage } from "../firebase";
import { useEffect, useState } from "react";

import { ref, uploadBytes } from "firebase/storage";

async function getTranscripts(db: any) {
  const transcriptsCollection = collection(db, "transcripts");
  const transcriptsSnapshot = await getDocs(transcriptsCollection);
  const transcriptionList = transcriptsSnapshot.docs.map((doc) => doc.data());
  return transcriptionList;
}

import { AppShell } from "@/components/shell/AppShell";
import { PageTitle } from "@/components/shell/PageTitle";

export const Profile = () => {
  useEffect(() => {
    getTranscripts(db).then((data) => console.log(data));
  }, []);

  const [file, setFile] = useState<File | null>(null);
  return (
    <AppShell>
      <PageTitle content="Profile" />
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
    </AppShell>
  );
};
