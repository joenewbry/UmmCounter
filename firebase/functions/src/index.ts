/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { storage } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as logger from 'firebase-functions/logger'
import { onRequest } from 'firebase-functions/v2/https'
import { onObjectFinalized } from 'firebase-functions/v2/storage'
import { Transcript, concatTranscript, countWord } from './utils/processTranscription'

initializeApp()
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

export const processTranscription = onObjectFinalized(
  { bucket: 'ummcounter.appspot.com' },
  async (event) => {
    const { name, contentType } = event.data

    if (!name.startsWith('transcripts/audio/')) {
      return logger.log('Object not a transcription. Ignoring.')
    }

    if (!contentType) {
      return logger.log('Object does not have contentType. Ignoring.')
    }

    if (contentType !== 'application/json') {
      return logger.log('Object is not json type. Ignoring.')
    }

    const audioPath = event.data.name
      .replace('transcripts/', '')
      .replace('.wav_transcription.txt', '')

    const file = storage().bucket().file(event.data.name)

    const downloadResponse = await file.download()

    const fileBuffer = downloadResponse[0]
    const decoder = new TextDecoder('utf8')
    const data = decoder.decode(fileBuffer)
    const parsed = JSON.parse(data) as Transcript
    const transcript = concatTranscript(parsed)

    const the = countWord(transcript, 'the')
    const um = countWord(transcript, 'um')
    const like = countWord(transcript, 'like')
    const basically = countWord(transcript, 'basically')
    const literally = countWord(transcript, 'literally')
    const youKnow = countWord(transcript, 'you know')

    const logObject = {
      audioPath,
      transcript,
      transcriptPath: event.data.name,
      wordCounts: { the, um, like, basically, literally, youKnow },
      timestamp: new Date().toISOString(),
    }
    await getFirestore().collection('transcripts').add(logObject)
  },
)
