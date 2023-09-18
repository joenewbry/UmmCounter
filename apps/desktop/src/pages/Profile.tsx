import { AppShell } from '@/components/shell/AppShell'
import { PageTitle } from '@/components/shell/PageTitle'
import { storage } from '@/lib/firebase'
import { collections } from '@/lib/firebase/collections'
import { getDocs } from 'firebase/firestore/lite'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'

const getTranscripts = async () => {
  const transcriptsSnapshot = await getDocs(collections.transcripts)
  const transcriptionList = transcriptsSnapshot.docs.map((doc) => doc.data())
  return transcriptionList
}

export const Profile = () => {
  useEffect(() => {
    getTranscripts().then((data) => console.log(data))
  }, [])

  const downloadFile = async () => {
    const pathReference = ref(
      storage,
      'transcripts/audio/my-user/place_your_bet.wav.wav_transcription.txt',
    )
    const url = await getDownloadURL(pathReference)
    console.log(url)
  }

  const [file, setFile] = useState<File | null>(null)
  return (
    <AppShell>
      <PageTitle content='Profile' />
      <input
        type='file'
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0])
          }
        }}
      />
      <button
        disabled={!file}
        onClick={async () => {
          if (file && file.name) {
            // duplicate file names will be overwritten
            const storageRef = ref(storage, `audio/my-user/${file.name}`)

            const metadata = {
              contentType: file.type,
            }

            const buffer = await file.arrayBuffer()
            const snapshot = await uploadBytes(storageRef, buffer, metadata)
            console.log('Uploaded a blob or file!', snapshot)
          }
        }}
      >
        Upload
      </button>
      <button onClick={downloadFile}>Download test file</button>
    </AppShell>
  )
}
