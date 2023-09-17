import { AppShell as MantineAppShell, Header, Title } from '@mantine/core'
import { Navbar } from './Navbar'
import { PropsWithChildren } from 'react'

export const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <MantineAppShell
      padding='md'
      navbar={<Navbar />}
      header={
        <Header height={60}>
          <Title order={3} px='lg' py='md'>
            Umm Counter
          </Title>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </MantineAppShell>
  )
}
