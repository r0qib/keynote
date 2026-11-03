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
    // Automatically recover when user navigates to another slide or step
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
        <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-[#FAFAFB] text-[#111113] select-none text-center">
          <div className="max-w-md p-6 bg-white border-2 border-[#E5484D] rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center text-[#E5484D]">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[#E5484D]">
                Slide Render Issue
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1">
                {this.props.slideId ? `Slide: ${this.props.slideId}` : 'Slide Component'}
              </p>
            </div>

            <p className="text-xs font-mono bg-neutral-100 p-2.5 rounded-lg border border-neutral-200 text-neutral-800 break-words w-full max-h-24 overflow-y-auto">
              {this.state.error?.message || 'An unexpected error occurred while rendering this slide.'}
            </p>

            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 text-white font-mono text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              <span className="text-[11px] font-mono text-neutral-400">
                (Press Arrow keys to navigate)
              </span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
