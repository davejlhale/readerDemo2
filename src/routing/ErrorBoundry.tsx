import { Component } from "react";
import type { ReactNode } from "react";
import { AppError } from "../utility/errors/AppError";
import { errorViewMap } from "../utility/errors/errorViewMap";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    if (error instanceof AppError) {
      const View = errorViewMap[error?.code];

      if (View) {
        return <View {...error.meta} />;
      }
    }

    // Unknown crash fallback
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Unexpected Error</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
}
