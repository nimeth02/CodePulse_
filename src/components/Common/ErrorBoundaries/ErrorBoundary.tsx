import React from "react";
import axios from "axios";
import "./ErrorBoundary.scss";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundaryTypes";

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
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

  componentDidMount() {
    window.addEventListener("error", this.handleGlobalError);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.handleGlobalError);
  }

  handleGlobalError = (event: ErrorEvent) => {
    const error = new Error(event.message);
    error.stack = event.error?.stack;
    this.handleError(error, { componentStack: "" });
  };

  handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log detailed error to console
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };
    console.error("Caught Error:", errorDetails);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="chart-error-container">
          <div className="chart-error-content">
            <div className="error-icon">⚠️</div>
            <h3>Rendering Error</h3>
            <p>We encountered an issue while rendering that.</p>
            <p className="error-details">{this.state.error?.message}</p>
            <button
              className="retry-button"
              onClick={() =>
                this.setState({ hasError: false, error: null, errorInfo: null })
              }
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
