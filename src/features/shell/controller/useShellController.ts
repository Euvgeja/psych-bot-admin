import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../auth/context/AuthProvider'
import { useTabs } from '../context/TabProvider'

export function useShellController() {
  const { username, logout } = useAuth()
  const tabsApi = useTabs()
  const [search, setSearch] = useState('')
  const [openGroupId, setOpenGroupId] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroupId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return {
    navRef,
    viewModel: {
      username,
      search,
      openGroupId,
      onSearchChange: setSearch,
      onLogout: logout,
      onToggleGroup: (id: string) => setOpenGroupId((prev) => (prev === id ? null : id)),
      onCloseMenu: () => setOpenGroupId(null),
      onOpenMenuItem: tabsApi.openTab,
      tabs: tabsApi.tabs,
      activePath: tabsApi.activePath,
      onActivateTab: tabsApi.activateTab,
      onCloseTab: tabsApi.closeTab,
      onCloseAllTabs: tabsApi.closeAllTabs,
    },
  }
}
