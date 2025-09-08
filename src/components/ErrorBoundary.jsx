/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console and potentially to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you might want to log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-2">
              Something went wrong
            </h2>
            
            <p className="text-white/70 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Reload Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-white/70 cursor-pointer mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-black/20 p-3 rounded text-xs text-red-300 overflow-auto max-h-32">
                  <div className="font-semibold mb-1">Error:</div>
                  <div className="mb-2">{this.state.error.toString()}</div>
                  <div className="font-semibold mb-1">Stack Trace:</div>
                  <pre className="whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
