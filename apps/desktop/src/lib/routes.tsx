import { Profile } from '../pages/Profile'
import { Meetings } from '../pages/Meetings'
import { Insights } from '../pages/Insights'
import { Billing } from '../pages/Billing'

import { createHashRouter } from 'react-router-dom'

export const routes = createHashRouter([
  {
    path: '/',
    element: <Profile />,
  },
  {
    path: '/meetings',
    element: <Meetings />,
  },
  {
    path: '/insights',
    element: <Insights />,
  },
  {
    path: '/billing',
    element: <Billing />,
  },
])
