import * as React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error);
    console.info("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Une erreur est survenue</h2>
          <p>{this.state.errorMessage}</p>
          {this.props.fallback || <p>Quelque chose s'est mal passé.</p>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
