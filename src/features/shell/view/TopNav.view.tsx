import type { MenuGroup } from '../../../shared/config/navigation'
import styles from './Shell.module.css'

export interface TopNavViewProps {
  groups: MenuGroup[]
  openGroupId: string | null
  onToggleGroup: (groupId: string) => void
  onCloseMenu: () => void
  onOpenMenuItem: (path: string, label: string) => void
}

export function TopNavView({ groups, openGroupId, onToggleGroup, onCloseMenu, onOpenMenuItem }: TopNavViewProps) {
  return (
    <nav className={styles.nav}>
      {groups.map((group) => (
        <div key={group.id} className={styles.navGroup}>
          <button
            type="button"
            className={openGroupId === group.id ? styles.navBtnActive : styles.navBtn}
            onClick={() => onToggleGroup(group.id)}
          >
            {group.label}
          </button>
          {openGroupId === group.id && (
            <div className={styles.dropdown}>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.dropdownItem}
                  onClick={() => {
                    onOpenMenuItem(item.path, item.label)
                    onCloseMenu()
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
