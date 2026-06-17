import type { ClientBean } from '../../../shared/api/types'

export function getClientDisplayName(client: ClientBean): string {
  const firstName = client.firstName ?? ''
  const lastName = client.lastName ?? ''
  const fullName = `${firstName} ${lastName}`.trim()
  if (fullName) return fullName
  if (client.username) return `@${client.username}`
  return `Client #${client.id}`
}

export function getClientInitials(client: ClientBean): string {
  const firstName = client.firstName ?? ''
  const lastName = client.lastName ?? ''
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase()
  if (firstName) return firstName.slice(0, 2).toUpperCase()
  if (client.username) return client.username.slice(0, 2).toUpperCase()
  return 'CL'
}

export function formatClientMeta(client: ClientBean): string {
  const parts: string[] = []
  if (client.username) parts.push(`@${client.username}`)
  if (client.telegramId) parts.push(`Telegram ${client.telegramId}`)
  return parts.join(' · ')
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('ru-RU')
}
