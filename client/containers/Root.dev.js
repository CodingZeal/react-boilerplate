import React from 'react'
import AppRouter from 'routes/AppRouter'
import DevTools from 'containers/DevTools'

export default function Root() {
  return (
    <div>
      <AppRouter />
      <DevTools />
    </div>
  )
}
