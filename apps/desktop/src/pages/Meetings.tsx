import { AppShell } from '@/components/shell/AppShell'
import { PageTitle } from '@/components/shell/PageTitle'
import { storage } from '@/lib/firebase'
import { collections } from '@/lib/firebase/collections'
import { Box, Card, Group, Stack, Text, Title } from '@mantine/core'
import { DocumentData, getDocs } from 'firebase/firestore/lite'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

const getTranscripts = async () => {
  const transcriptsSnapshot = await getDocs(collections.transcripts)
  return transcriptsSnapshot.docs.map((doc) => doc.data())
}

const wordCounts = [
  { key: 'the', label: 'the' },
  { key: 'um', label: 'um' },
  { key: 'like', label: 'like' },
  { key: 'basically', label: 'basically' },
  { key: 'literally', label: 'literally' },
  { key: 'youKnow', label: 'you know' },
]

const MeetingCard = ({ record }: any) => {
  const [transcriptUrl, setTranscriptUrl] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  useEffect(() => {
    const fetchUrls = async () => {
      const audio = await getDownloadURL(ref(storage, record.audioPath))
      const transcript = await getDownloadURL(ref(storage, record.transcriptPath))
      setAudioUrl(audio)
      setTranscriptUrl(transcript)
    }
    fetchUrls()
  }, [])

  return (
    <Card key={record.timestamp} p='xl'>
      {/* top, right, left margins are negative – -1 * theme.spacing.xl */}
      <Stack>
        <Card.Section>
          <Title order={4}>
            {new Date(record.timestamp).toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Title>
        </Card.Section>

        <Card.Section>
          <Group spacing='xl'>
            {wordCounts.map((word) => (
              <Box key={word.key}>
                <Text c='dimmed'>{word.label}</Text>
                <Text>{record.wordCounts[word.key]}</Text>
              </Box>
            ))}
          </Group>
        </Card.Section>

        <Card.Section>
          <Text c='dimmed'>Transcript</Text>
          <Text fz='sm'>{record.transcript}</Text>
        </Card.Section>

        <Card.Section>
          <Group spacing='xl'>
            <Box>
              <Text c='dimmed'>Audio URL</Text>
              <Text fz='xs'>{audioUrl}</Text>
            </Box>
            <Box>
              <Text c='dimmed'>Transcript JSON URL</Text>
              <Text fz='xs'>{transcriptUrl}</Text>
            </Box>
          </Group>
        </Card.Section>
      </Stack>
    </Card>
  )
}

export const Meetings = () => {
  const [transcripts, setTranscripts] = useState<DocumentData[]>([])

  useEffect(() => {
    const fetchTranscripts = async () => {
      const data = await getTranscripts()
      setTranscripts(data)
    }
    fetchTranscripts()
  }, [setTranscripts])

  const records = transcripts.map((record) => (
    <MeetingCard record={record} key={record.timestamp} />
  ))

  return (
    <AppShell>
      <PageTitle content='Meetings' />
      {records}
    </AppShell>
  )
}
