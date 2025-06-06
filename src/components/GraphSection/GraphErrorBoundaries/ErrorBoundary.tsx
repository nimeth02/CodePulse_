// ErrorBoundary.tsx
import React from 'react';
import axios from 'axios';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log and send error from render phase
    this.handleError(error, errorInfo);
  }

  // Handle global uncaught errors as a fallback
  componentDidMount() {
    window.addEventListener('error', this.handleGlobalError);
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleGlobalError);
  }

  handleGlobalError = (event: ErrorEvent) => {
    const error = new Error(event.message);
    error.stack = event.error?.stack;
    this.handleError(error, { componentStack: '' });
  };

  handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log detailed error to console
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(), // 2025-05-30T11:30:00+05:30
      url: window.location.href,
    };
    console.error('Caught Error:', errorDetails);

    // Send error to backend
    this.sendErrorToBackend(errorDetails);
  };

  async sendErrorToBackend(errorDetails: any) {
    try {
      await axios.post('https://your-backend-api.com/errors', {
        error: errorDetails,
      });
      console.log('Error sent to backend successfully');
    } catch (err) {
      console.error('Failed to send error to backend:', err);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="chart-error-container">
          <div className="chart-error-content">
            <div className="error-icon">⚠️</div>
            <h3>Chart Rendering Error</h3>
            <p>We encountered an issue while rendering the chart.</p>
            <p className="error-details">{this.state.error?.message}</p>
            <button
              className="retry-button"
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;