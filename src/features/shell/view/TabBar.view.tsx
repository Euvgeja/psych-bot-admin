import { PanelLeftClose, X } from 'lucide-react'
import { ButtonView } from '../../../shared/ui'
import type { WorkspaceTab } from '../context/TabProvider'
import styles from './Shell.module.css'

export interface TabBarViewProps {
  tabs: WorkspaceTab[]
  activePath: string
  onActivateTab: (path: string) => void
  onCloseTab: (path: string) => void
  onCloseAllTabs: () => void
}

export function TabBarView({ tabs, activePath, onActivateTab, onCloseTab, onCloseAllTabs }: TabBarViewProps) {
  if (tabs.length === 0) return null

  return (
    <div className={styles.tabBar}>
      <ButtonView variant="ghost" size="sm" onClick={onCloseAllTabs} title="Close all tabs">
        <PanelLeftClose size={14} strokeWidth={2} aria-hidden="true" />
        Close all
      </ButtonView>
      <div className={styles.tabList}>
        {tabs.map((tab) => {
          const isActive = tab.path === activePath
          return (
            <div key={tab.id} className={isActive ? styles.tabActive : styles.tab}>
              <button type="button" className={styles.tabLabel} onClick={() => onActivateTab(tab.path)}>
                {tab.title}
              </button>
              <button
                type="button"
                className={styles.tabClose}
                onClick={() => onCloseTab(tab.path)}
                aria-label={`Close ${tab.title}`}
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
