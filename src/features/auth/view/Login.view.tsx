import { Lock } from 'lucide-react'
import type { FormEvent } from 'react'
import { ButtonView, TextFieldView } from '../../../shared/ui'
import styles from './Login.module.css'

export interface LoginViewProps {
  username: string
  password: string
  error: string | null
  onUsernameChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
}

export function LoginView({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: LoginViewProps) {
  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={onSubmit}>
        <div className={styles.logo}>
          <Lock size={22} strokeWidth={2} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>psych-bot</h1>
        <p className={styles.subtitle}>Admin panel</p>

        <TextFieldView
          label="Login"
          name="username"
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          autoComplete="username"
          required
        />

        <TextFieldView
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p className={styles.formError}>{error}</p>}

        <ButtonView type="submit" fullWidth>
          Sign in
        </ButtonView>
      </form>
    </div>
  )
}
