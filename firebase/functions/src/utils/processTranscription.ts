export type Transcript = {
  results: {
    alternatives: [
      {
        confidence: number
        transcript: string
      },
    ]
    languageCode: string
    resultEndTime: string
  }[]
}

export const concatTranscript = ({ results }: Transcript) => {
  return results.reduce((acc, curr) => (acc += curr.alternatives[0].transcript), '')
}

export const countWord = (transcript: string, word: string) => {
  const regex = new RegExp(`\\b${word}\\b`, 'gi')
  const matches = transcript.match(regex)
  return matches ? matches.length : 0
}
