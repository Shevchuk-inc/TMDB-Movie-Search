import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #d32f2f;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
  color: #333;
`;

const ErrorDetails = styled.details`
  margin-top: 1.5rem;
  text-align: left;
  
  summary {
    cursor: pointer;
    color: #764ba2;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  pre {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 0.9rem;
    color: #333;
  }
`;

const ReloadButton = styled.button`
  background: #764ba2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #5a3a7a;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but an error occurred while rendering this component.
          </ErrorMessage>
          <ReloadButton onClick={this.handleReload}>
            Reload Application
          </ReloadButton>
          
          {this.state.error && this.state.errorInfo && (
            <ErrorDetails>
              <summary>View technical details</summary>
              <p><strong>Error:</strong> {this.state.error.toString()}</p>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
