import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { resolveTabTitle } from '../../../shared/config/navigation'

export interface WorkspaceTab {
  id: string
  path: string
  title: string
}

interface TabContextValue {
  tabs: WorkspaceTab[]
  activePath: string
  openTab: (path: string, title?: string) => void
  closeTab: (path: string) => void
  closeAllTabs: () => void
  activateTab: (path: string) => void
}

const TabContext = createContext<TabContextValue | null>(null)
const HOME_PATH = '/clients'

export function TabProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [tabs, setTabs] = useState<WorkspaceTab[]>([])

  const openTab = useCallback((path: string, title?: string) => {
    const tabTitle = title ?? resolveTabTitle(path)
    setTabs((prev) => (prev.some((t) => t.path === path) ? prev : [...prev, { id: path, path, title: tabTitle }]))
    navigate(path)
  }, [navigate])

  useEffect(() => {
    const path = location.pathname
    if (path === '/login') return
    const tabTitle = resolveTabTitle(path)
    setTabs((prev) => {
      const existing = prev.find((t) => t.path === path)
      if (existing) {
        return existing.title === tabTitle ? prev : prev.map((t) => (t.path === path ? { ...t, title: tabTitle } : t))
      }
      return [...prev, { id: path, path, title: tabTitle }]
    })
  }, [location.pathname])

  const activateTab = useCallback((path: string) => navigate(path), [navigate])

  const closeTab = useCallback((path: string) => {
    setTabs((prev) => {
      const index = prev.findIndex((t) => t.path === path)
      if (index === -1) return prev
      const nextTabs = prev.filter((t) => t.path !== path)
      if (location.pathname === path) {
        navigate(nextTabs[index - 1]?.path ?? nextTabs[index]?.path ?? HOME_PATH)
      }
      return nextTabs
    })
  }, [location.pathname, navigate])

  const closeAllTabs = useCallback(() => {
    setTabs([])
    navigate(HOME_PATH)
  }, [navigate])

  const value = useMemo(
    () => ({ tabs, activePath: location.pathname, openTab, closeTab, closeAllTabs, activateTab }),
    [tabs, location.pathname, openTab, closeTab, closeAllTabs, activateTab],
  )

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}

export function useTabs() {
  const context = useContext(TabContext)
  if (!context) throw new Error('useTabs must be used within TabProvider')
  return context
}
