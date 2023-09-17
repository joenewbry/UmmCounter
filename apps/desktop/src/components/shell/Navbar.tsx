import { Navbar as MantineNavbar } from '@mantine/core'
import { IconUserCircle, IconBrandZoom, IconBulb, IconReceipt } from '@tabler/icons-react'
import { MainLink } from './MainLink'

export const Navbar = () => {
  return (
    <MantineNavbar width={{ base: 200 }} p='xs'>
      <MantineNavbar.Section grow>
        <MainLink
          icon={<IconBrandZoom size='1rem' />}
          color='teal'
          label='Meetings'
          route='/meetings'
        />
        <MainLink
          icon={<IconBulb size='1rem' />}
          color='violet'
          label='Insights'
          route='/insights'
        />
        <MainLink
          icon={<IconReceipt size='1rem' />}
          color='grape'
          label='Billing'
          route='/billing'
        />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <MainLink icon={<IconUserCircle size='1rem' />} color='blue' label='Profile' route='/' />
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
