import type { ClientBean, EntityKey } from '../../../shared/api/types'
import type { EntityConfig } from '../../../shared/config/entities'
import { ButtonView } from '../../../shared/ui'
import '../../../shared/ui/ui.css'
import { ClientCardSkeletonView, ClientCardView } from './ClientCard.view'
import styles from './ClientDetail.module.css'

export interface ClientDetailViewProps {
  loading: boolean
  error: string | null
  client: ClientBean | null
  relations: EntityConfig[]
  activeRelationKey: EntityKey
  onRelationChange: (key: EntityKey) => void
  onBackToClients: () => void
  relationContent: React.ReactNode
}

export function ClientDetailView({
  loading,
  error,
  client,
  relations,
  activeRelationKey,
  onRelationChange,
  onBackToClients,
  relationContent,
}: ClientDetailViewProps) {
  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <ButtonView variant="ghost" size="sm" onClick={onBackToClients}>
          ← Clients
        </ButtonView>
      </div>

      {loading && <ClientCardSkeletonView />}
      {error && <p className="ui-error">{error}</p>}

      {client && (
        <>
          <ClientCardView client={client} />

          <nav className={styles.relations} aria-label="Client relations">
            {relations.map((relation) => (
              <button
                key={relation.key}
                type="button"
                className={relation.key === activeRelationKey ? styles.relationActive : styles.relation}
                onClick={() => onRelationChange(relation.key)}
              >
                {relation.title}
              </button>
            ))}
          </nav>

          {relationContent}
        </>
      )}
    </section>
  )
}
