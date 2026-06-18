import type { EntityKey } from '../api/types'

export interface EntityConfig<K extends EntityKey = EntityKey> {
  key: K
  title: string
  path: string
  endpoint: string
  columns: string[]
  clientScoped?: boolean
  drillDown?: boolean
  detail?: boolean
}

export const CLIENT_RELATIONS: EntityConfig[] = [
  {
    key: 'subscriptions',
    title: 'Подписки',
    path: '/subscriptions',
    endpoint: '/api/subscriptions',
    columns: ['id', 'type', 'status', 'startsAt', 'expiresAt', 'paymentId', 'createdAt'],
    clientScoped: true,
  },
  {
    key: 'payments',
    title: 'Платежи',
    path: '/payments',
    endpoint: '/api/payments',
    columns: ['id', 'amount', 'currency', 'channel', 'purpose', 'status', 'externalId', 'createdAt'],
    clientScoped: true,
  },
  {
    key: 'chat-messages',
    title: 'Сообщения',
    path: '/chat-messages',
    endpoint: '/api/chat-messages',
    columns: ['id', 'role', 'content', 'tokensUsed', 'createdAt'],
    clientScoped: true,
  },
  {
    key: 'client-sessions',
    title: 'Сессия',
    path: '/client-sessions',
    endpoint: '/api/client-sessions',
    columns: ['id', 'mode', 'phase', 'returningUser', 'lastActivity', 'createdAt'],
    clientScoped: true,
  },
  {
    key: 'client-content-recommendations',
    title: 'Рекомендации контента',
    path: '/client-content-recommendations',
    endpoint: '/api/client-content-recommendations',
    columns: ['id', 'contentType', 'contentId', 'recommendedCount', 'lastRecommendedAt'],
    clientScoped: true,
  },
  {
    key: 'client-content-feedback',
    title: 'Отзывы',
    path: '/client-content-feedback',
    endpoint: '/api/client-content-feedback',
    columns: ['id', 'contentType', 'contentId', 'playsCount', 'rating', 'lastPlayedAt'],
    clientScoped: true,
  },
  {
    key: 'recommendations',
    title: 'Рекомендации курсов',
    path: '/recommendations',
    endpoint: '/api/recommendations',
    columns: ['id', 'courseId', 'createdAt'],
    clientScoped: true,
  },
]

export const ENTITIES: EntityConfig[] = [
  {
    key: 'clients',
    title: 'Клиенты',
    path: '/clients',
    endpoint: '/api/clients',
    columns: ['id', 'telegramId', 'username', 'firstName', 'lastName', 'consentGiven', 'blocked', 'createdAt'],
    drillDown: true,
  },
  {
    key: 'users',
    title: 'Админы',
    path: '/users',
    endpoint: '/api/users',
    columns: ['id', 'telegramId', 'username', 'firstName', 'role', 'active', 'createdAt'],
  },
  {
    key: 'subscriptions',
    title: 'Подписки',
    path: '/subscriptions',
    endpoint: '/api/subscriptions',
    columns: ['id', 'clientId', 'type', 'status', 'startsAt', 'expiresAt', 'createdAt'],
  },
  {
    key: 'payments',
    title: 'Платежи',
    path: '/payments',
    endpoint: '/api/payments',
    columns: ['id', 'clientId', 'amount', 'currency', 'channel', 'status', 'createdAt'],
  },
  {
    key: 'meditations',
    title: 'Медитации',
    path: '/meditations',
    endpoint: '/api/meditations',
    columns: ['id', 'title', 'description', 'category', 'subcategory', 'mediaType', 'durationSec', 'active'],
    detail: true,
  },
  {
    key: 'practices',
    title: 'Практики',
    path: '/practices',
    endpoint: '/api/practices',
    columns: ['id', 'title', 'description', 'category', 'subcategory', 'mediaType', 'durationSec', 'active'],
    detail: true,
  },
  {
    key: 'courses',
    title: 'Курсы',
    path: '/courses',
    endpoint: '/api/courses',
    columns: ['id', 'title', 'price', 'url', 'active', 'createdAt'],
    detail: true,
  },
  {
    key: 'knowledge-entries',
    title: 'Knowledge',
    path: '/knowledge-entries',
    endpoint: '/api/knowledge-entries',
    columns: ['id', 'label', 'content', 'createdAt'],
    detail: true,
  },
  {
    key: 'system-configurations',
    title: 'Конфигурация',
    path: '/system-configurations',
    endpoint: '/api/system-configurations',
    columns: ['id', 'name', 'data', 'createdAt'],
    detail: true,
  },
]
