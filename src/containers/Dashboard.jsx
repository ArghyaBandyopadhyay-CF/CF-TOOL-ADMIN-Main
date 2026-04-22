import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import classNames from 'classnames'

import { MobileBreakpoint } from '../styleVariables'
import routes from '../routes'
import { useAppState } from '../components/AppProvider/AppProvider'
import useMountEffect from '../mountEffect'
import ProtectedRoute from '../pages/Authentication/ProtectedRoute'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import Workspace from '../components/Workspace/Workspace'
import useActivityLogger from '../hooks/useActivityLogger'

// --- FIX STARTS HERE ---
const Panel = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,

  // Reset all top spacing to 0 to remove the gap
  marginTop: 0,
  paddingTop: 0,

  // Adjust height to fit remaining screen space
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    marginTop: 50,
    minHeight: 'calc(100vh - 64px)',
  },
  [theme.breakpoints.down('xs')]: {
    height: 'auto',
    marginTop: 50,
    minHeight: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100vh - 64px)',
  },
}));
// --- FIX ENDS HERE ---

  const Dashboard = () => {
    const [state, dispatch] = useAppState()
    const [opened, setOpened] = useState(false)
    const location = useLocation()
  
    // ─── Activity logging ───────────────────────────────────────────────────
    // Automatically sends a PAGE_LOAD log (item: null) on every route change.
    // Also exposes logCreate / logDelete / etc. for child components if needed.
    useActivityLogger()
  
    const mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`)
  
    const handleDrawerToggle = () => {
      setOpened(!opened)
    }
  
    const getRoutes = (
      <Routes>
        {routes.items.map((item, index) =>
          item.type === 'external' ? null : item.type === 'submenu' ? (
            item.children.map((subItem, subIndex) => (
              <Route
                key={`${index}-${subIndex}`}
                path={`${item.path}${subItem.path}`}
                element={<ProtectedRoute component={subItem.component} />}
              />
            ))
          ) : (
            <Route
              key={index}
              path={item.path}
              element={<ProtectedRoute component={item.component} />}
            />
          )
        )}
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    )
  
    useMountEffect(() => {
      if (mediaMatcher.matches) setOpened(false)
      mediaMatcher.addListener(match => {
        if (match.matches) setOpened(false)
        else setOpened(false)
      })
    })
  
    // Close drawer on mobile when route changes
    React.useEffect(() => {
      if (mediaMatcher.matches) setOpened(false)
    }, [location.pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 1. Header sits at the top (Natural Flow) */}
      <Header
        logoAltText='win Admin'
        logo={`/static/images/logo.png`}
        toggleDrawer={handleDrawerToggle}
      />

      {/* 2. Panel fills the rest of the height */}
      <Panel className='theme-dark'>
        <Sidebar
          routes={routes.items}
          opened={opened}
          toggleDrawer={handleDrawerToggle}
        />

        <Workspace opened={opened}>
          {getRoutes}
        </Workspace>
      </Panel>
    </div>
  )
}

export default Dashboard