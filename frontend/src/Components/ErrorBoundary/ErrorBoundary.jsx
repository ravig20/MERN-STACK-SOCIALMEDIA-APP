import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }


  render() {
    return(
      <div>
        {this.state.error? <h1> something was wrong try to reload </h1> : this.props.children}
      </div>
    )

    
  }
}
export default ErrorBoundary ;