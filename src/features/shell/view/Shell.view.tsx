import { LogOut, Search, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonView } from '../../../shared/ui'
import { MENU_GROUPS } from '../../../shared/config/navigation'
import { useTabs } from '../context/TabProvider'
import styles from './Shell.module.css'
import { TabBarView } from './TabBar.view'
import { TopNavView } from './TopNav.view'

export interface ShellViewProps {
  username: string | null
  search: string
  openGroupId: string | null
  onSearchChange: (value: string) => void
  onLogout: () => void
  onToggleGroup: (groupId: string) => void
  onCloseMenu: () => void
  onOpenMenuItem: (path: string, label: string) => void
  tabs: ReturnType<typeof useTabs>['tabs']
  activePath: string
  onActivateTab: (path: string) => void
  onCloseTab: (path: string) => void
  onCloseAllTabs: () => void
  children: React.ReactNode
}

export function ShellView(props: ShellViewProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.top}>
        <div className={styles.topLeft}>
          <Link to="/clients" className={styles.brand}>psych-bot</Link>
          <TopNavView
            groups={MENU_GROUPS}
            openGroupId={props.openGroupId}
            onToggleGroup={props.onToggleGroup}
            onCloseMenu={props.onCloseMenu}
            onOpenMenuItem={props.onOpenMenuItem}
          />
        </div>
        <div className={styles.topRight}>
          <div className={styles.search}>
            <Search size={15} strokeWidth={2} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search clients..."
              value={props.search}
              onChange={(e) => props.onSearchChange(e.target.value)}
              disabled
            />
          </div>
          <div className={styles.user}>
            <User size={15} strokeWidth={2} aria-hidden="true" />
            <span>{props.username}</span>
            <ButtonView variant="ghost" size="sm" onClick={props.onLogout}>
              <LogOut size={14} strokeWidth={2} aria-hidden="true" />
              Logout
            </ButtonView>
          </div>
        </div>
      </header>

      <TabBarView
        tabs={props.tabs}
        activePath={props.activePath}
        onActivateTab={props.onActivateTab}
        onCloseTab={props.onCloseTab}
        onCloseAllTabs={props.onCloseAllTabs}
      />

      <main className={styles.content}>{props.children}</main>
    </div>
  )
}
