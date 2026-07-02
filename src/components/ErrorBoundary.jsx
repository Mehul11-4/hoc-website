import { Component } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 text-center">
          <div>
            <AlertTriangle
              size={56}
              className="text-brand-red mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h1 className="font-display text-3xl text-brand-brown font-bold mb-3">
              Something went wrong
            </h1>
            <p className="font-body text-brown-light mb-8">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <a
              href="/"
              className="bg-brand-red text-white font-body font-semibold px-8 py-3 rounded-md hover:bg-red-hover transition-all duration-200 inline-block"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
