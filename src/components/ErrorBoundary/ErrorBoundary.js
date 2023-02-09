import { Component } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    return this.state.error ? <ErrorMessage /> : this.props.children;
  }
}
