import styles from './Skeleton.module.css'

export interface SkeletonViewProps {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'title' | 'avatar' | 'block'
  className?: string
}

export function SkeletonView({
  width = '100%',
  height,
  variant = 'text',
  className,
}: SkeletonViewProps) {
  const defaultHeights: Record<string, string> = {
    text: '0.85rem',
    title: '1.25rem',
    avatar: '3rem',
    block: '1rem',
  }

  const classes = [
    styles.block,
    variant === 'avatar' ? styles.avatar : '',
    variant === 'text' ? styles.text : '',
    variant === 'title' ? styles.title : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: height ?? defaultHeights[variant],
      }}
      aria-hidden="true"
    />
  )
}
