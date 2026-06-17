import type { EntityKey } from '../api/types'
import { ENTITIES, type EntityConfig } from './entities'

export interface MenuItem {
  id: string
  label: string
  path: string
  entityKey: EntityKey
}

export interface MenuGroup {
  id: string
  label: string
  items: MenuItem[]
}

export const MENU_GROUPS: MenuGroup[] = [
  {
    id: 'registers',
    label: 'Registers',
    items: [
      { id: 'clients', label: 'Clients', path: '/clients', entityKey: 'clients' },
      { id: 'payments', label: 'Payments', path: '/payments', entityKey: 'payments' },
      { id: 'subscriptions', label: 'Subscriptions', path: '/subscriptions', entityKey: 'subscriptions' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    items: [
      { id: 'meditations', label: 'Meditations', path: '/meditations', entityKey: 'meditations' },
      { id: 'practices', label: 'Practices', path: '/practices', entityKey: 'practices' },
      { id: 'courses', label: 'Courses', path: '/courses', entityKey: 'courses' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'users', label: 'Admins', path: '/users', entityKey: 'users' },
      { id: 'knowledge', label: 'Knowledge', path: '/knowledge-entries', entityKey: 'knowledge-entries' },
      {
        id: 'config',
        label: 'Configuration',
        path: '/system-configurations',
        entityKey: 'system-configurations',
      },
    ],
  },
]

const ENTITY_BY_KEY = new Map(ENTITIES.map((entity) => [entity.key, entity]))
const MENU_ITEM_BY_PATH = new Map(
  MENU_GROUPS.flatMap((group) => group.items).map((item) => [item.path, item]),
)

export function getEntityByKey(entityKey: EntityKey): EntityConfig | undefined {
  return ENTITY_BY_KEY.get(entityKey)
}

export function getEntityByPath(path: string): EntityConfig | undefined {
  const menuItem = MENU_ITEM_BY_PATH.get(path)
  if (!menuItem) {
    return undefined
  }
  return getEntityByKey(menuItem.entityKey)
}

export function resolveTabTitle(path: string): string {
  const menuItem = MENU_ITEM_BY_PATH.get(path)
  if (menuItem) {
    return menuItem.label
  }
  const clientMatch = path.match(/^\/clients\/(\d+)$/)
  if (clientMatch) {
    return `Client #${clientMatch[1]}`
  }
  return path
}
