import { Group, ThemeIcon, Text, Box } from '@mantine/core'
import { ReactNode } from 'react'
import { NavLink, To } from 'react-router-dom'

export interface MainLinkProps {
  icon: ReactNode
  color: string
  label: string
  route: To
}

export const MainLink = ({ icon, color, label, route }: MainLinkProps) => {
  return (
    <NavLink to={route} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Box
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.blue[9]
                : isActive
                ? theme.colors.blue[0]
                : 'transparent',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[1],
            },
          })}
        >
          <Group>
            <ThemeIcon color={color} variant='light'>
              {icon}
            </ThemeIcon>

            <Text sx={{ textDecoration: 'none' }} size='sm'>
              {label}
            </Text>
          </Group>
        </Box>
      )}
    </NavLink>
  )
}
