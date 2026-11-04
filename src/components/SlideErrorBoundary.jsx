import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class SlideErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Slide Error Boundary caught an error:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // Recover when navigating to another slide or build
    if (
      prevProps.slideId !== this.props.slideId ||
      prevProps.buildStep !== this.props.buildStep
    ) {
      if (this.state.hasError) {
        this.setState({ hasError: false, error: null });
      }
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="slide-error"
          className="absolute inset-0 flex items-center justify-center bg-canvas text-ink select-none"
        >
          <div className="w-[1100px] p-[56px] bg-surface border-[3px] border-[#E5484D] rounded-[32px] flex flex-col items-center gap-[32px] text-center">
            <AlertTriangle className="w-[72px] h-[72px] text-[#E5484D]" strokeWidth={2.5} />
            <h3 className="text-sub font-bold text-[#E5484D]">
              {this.props.slideId ? `${this.props.slideId} failed to render` : 'This slide failed to render'}
            </h3>
            <p className="font-mono text-label text-ink bg-[#F1F1F4] rounded-[16px] p-[24px] w-full break-words">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-[12px] px-[32px] py-[16px] rounded-[20px] bg-ink text-white text-label font-semibold cursor-pointer"
            >
              <RefreshCw className="w-[28px] h-[28px]" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
