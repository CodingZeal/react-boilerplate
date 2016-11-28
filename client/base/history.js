import { useRouterHistory } from 'react-router'
import useNamedRoutes from 'use-named-routes'
import createHistory from 'history/lib/createBrowserHistory'

import { appRoutes as routes } from 'modules/app'

const history = useNamedRoutes(
  useRouterHistory(createHistory)
)({ routes })

export default history
