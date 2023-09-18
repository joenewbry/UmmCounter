import { collection } from 'firebase/firestore/lite'
import { db } from '.'

export const collections = {
  transcripts: collection(db, 'transcripts'),
}
