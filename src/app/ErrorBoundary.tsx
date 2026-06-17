import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorFallbackView } from './view/ErrorFallback.view'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled application error:', error, info)
  }

  private handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackView onRetry={this.handleRetry} />
    }
    return this.props.children
  }
}
