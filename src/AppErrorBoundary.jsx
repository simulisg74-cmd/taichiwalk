import { Component } from 'react';

/**
 * Jei vaikas meta klaidą render metu, vietoj tuščio ekrano rodome pranešimą.
 */
export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      const isDev = import.meta.env.DEV;
      return (
        <div
          className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-white px-6 py-12 text-center text-gray-900"
          role="alert"
        >
          <h1 className="text-lg font-semibold">Įvyko klaida</h1>
          <p className="max-w-md text-sm text-gray-600">
            Pabandykite atnaujinti puslapį. Jei kartojasi, patikrinkite naršyklės konsolę.
          </p>
          {isDev ? (
            <pre className="max-h-48 max-w-full overflow-auto rounded bg-gray-100 p-3 text-left text-xs text-red-800">
              {error?.message}
              {error?.stack ? `\n\n${error.stack}` : ''}
            </pre>
          ) : null}
        </div>
      );
    }
    return this.props.children;
  }
}
