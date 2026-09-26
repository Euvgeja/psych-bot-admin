import type { BaseBean } from './base'

export interface ClientBean extends BaseBean {
  telegramId: number | null
  username: string | null
  firstName: string | null
  lastName: string | null
  languageCode: string | null
  consentGiven: boolean
  blocked: boolean
}

export interface UserBean extends BaseBean {
  telegramId: number | null
  username: string | null
  firstName: string | null
  role: string | null
  active: boolean
}

export interface SubscriptionBean extends BaseBean {
  clientId: number | null
  paymentId: number | null
  type: string | null
  status: string | null
  startsAt: string | null
  expiresAt: string | null
}

export interface PaymentBean extends BaseBean {
  clientId: number | null
  amount: number | null
  currency: string | null
  channel: string | null
  purpose: string | null
  externalId: string | null
  status: string | null
  metadataJson: string | null
}

export interface ChatMessageBean extends BaseBean {
  clientId: number | null
  role: string | null
  content: string | null
  tokensUsed: number | null
}

export interface ClientSessionBean extends BaseBean {
  clientId: number | null
  mode: string | null
  phase: string | null
  needsProfileJson: string | null
  returningUser: boolean
  lastActivity: string | null
  shownPracticeIds: string | null
  shownMeditationIds: string | null
  lastRecommendedPracticeIds: string | null
  lastRecommendedMeditationIds: string | null
}

export interface ClientContentRecommendationBean extends BaseBean {
  clientId: number | null
  contentType: string | null
  contentId: number | null
  recommendedCount: number
  lastRecommendedAt: string | null
}

export interface ClientContentFeedbackBean extends BaseBean {
  clientId: number | null
  contentType: string | null
  contentId: number | null
  playsCount: number
  rating: number | null
  lastPlayedAt: string | null
  ratedAt: string | null
}

export interface RecommendationBean extends BaseBean {
  clientId: number | null
  courseId: number | null
}

export interface PracticeItemBean extends BaseBean {
  contentType: string | null
  title: string | null
  shortDescription: string | null
  fullDescription: string | null
  description: string | null
  searchProfile: string | null
  category: string | null
  subcategory: string | null
  mediaType: string | null
  durationSec: number | null
  active: boolean
  telegramFileId: string | null
  videoUrl: string | null
  packageTitles: string | null
  legacySource: string | null
  legacyId: number | null
}

export interface ContentPackageBean extends BaseBean {
  title: string | null
  slug: string | null
  description: string | null
  coverImageUrl: string | null
  comingSoon: boolean
  accessTier: string | null
  active: boolean
  itemCount: number
}

export interface CourseBean extends BaseBean {
  title: string | null
  description: string | null
  price: string | null
  url: string | null
  active: boolean
  vectorDocId: string | null
}

export interface KnowledgeEntryBean extends BaseBean {
  content: string | null
  label: string | null
  vectorDocId: string | null
}

export interface SystemConfigurationBean extends BaseBean {
  name: string | null
  data: string | null
}

export type EntityKey =
  | 'clients'
  | 'users'
  | 'subscriptions'
  | 'payments'
  | 'chat-messages'
  | 'client-sessions'
  | 'client-content-recommendations'
  | 'client-content-feedback'
  | 'recommendations'
  | 'practice-items'
  | 'content-packages'
  | 'courses'
  | 'knowledge-entries'
  | 'system-configurations'

export interface EntityBeanMap {
  clients: ClientBean
  users: UserBean
  subscriptions: SubscriptionBean
  payments: PaymentBean
  'chat-messages': ChatMessageBean
  'client-sessions': ClientSessionBean
  'client-content-recommendations': ClientContentRecommendationBean
  'client-content-feedback': ClientContentFeedbackBean
  recommendations: RecommendationBean
  'practice-items': PracticeItemBean
  'content-packages': ContentPackageBean
  courses: CourseBean
  'knowledge-entries': KnowledgeEntryBean
  'system-configurations': SystemConfigurationBean
}

export type EntityBean<K extends EntityKey> = EntityBeanMap[K]
export type EntityRow = EntityBeanMap[EntityKey]
