import { BadgeView } from '../../../shared/ui'
import { SkeletonView } from '../../../shared/ui/Skeleton/Skeleton.view'
import type { ClientBean } from '../../../shared/api/types'
import {
  formatClientMeta,
  formatDateTime,
  getClientDisplayName,
  getClientInitials,
} from '../utils/clientDisplay'
import styles from './ClientCard.module.css'

const FIELDS: { key: keyof ClientBean; label: string; format?: (value: string | null) => string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'telegramId', label: 'Telegram ID' },
  { key: 'username', label: 'Username' },
  { key: 'languageCode', label: 'Language' },
  { key: 'createdAt', label: 'Registered', format: formatDateTime },
]

export interface ClientCardViewProps {
  client: ClientBean
}

export function ClientCardView({ client }: ClientCardViewProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {getClientInitials(client)}
        </div>
        <div className={styles.identity}>
          <h2 className={styles.name}>{getClientDisplayName(client)}</h2>
          <p className={styles.meta}>{formatClientMeta(client) || `ID ${client.id}`}</p>
          <div className={styles.badges}>
            <BadgeView variant={client.consentGiven ? 'success' : 'warning'}>
              {client.consentGiven ? 'Consent given' : 'No consent'}
            </BadgeView>
            <BadgeView variant={client.blocked ? 'danger' : 'neutral'}>
              {client.blocked ? 'Blocked' : 'Active'}
            </BadgeView>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {FIELDS.map(({ key, label, format }) => {
          const raw = client[key]
          const value =
            typeof raw === 'string' || raw === null
              ? format
                ? format(raw)
                : (raw ?? '—')
              : String(raw ?? '—')

          return (
            <div key={key} className={styles.field}>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function ClientCardSkeletonView() {
  return (
    <section className={styles.card} aria-busy="true" aria-label="Загрузка карточки клиента">
      <div className={styles.skeletonHeader}>
        <SkeletonView variant="avatar" width={56} height={56} />
        <div style={{ flex: 1 }}>
          <SkeletonView variant="title" width="45%" />
          <div style={{ height: '0.5rem' }} />
          <SkeletonView width="60%" />
          <div style={{ height: '0.75rem' }} />
          <SkeletonView width="30%" />
        </div>
      </div>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className={styles.skeletonField}>
            <SkeletonView width="50%" />
            <SkeletonView width="70%" />
          </div>
        ))}
      </div>
    </section>
  )
}
