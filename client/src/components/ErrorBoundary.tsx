import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink p-8 text-paper">
          <div className="flex w-full max-w-xl flex-col items-center p-8">
            <AlertTriangle size={48} className="mb-6 shrink-0 text-copper" />
            <h2 className="mb-4 text-xl font-semibold">Произошла непредвиденная ошибка</h2>
            <p className="mb-6 text-sm text-paper/60">
              Попробуйте перезагрузить страницу. Если ошибка повторяется,
              свяжитесь с нами по телефону.
            </p>
            {this.state.error && (
              <div className="mb-6 w-full overflow-auto rounded border border-white/15 bg-white/5 p-4">
                <pre className="whitespace-break-spaces text-xs text-paper/50">
                  {this.state.error.message}
                </pre>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="button-copper inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
            >
              <RotateCcw size={16} /> Перезагрузить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
