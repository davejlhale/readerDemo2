import type { ReactNode } from "react";
import "../../styles/AppErrorLayout.css";
export function AppErrorLayout({
  title,
  children,
  actions,
}: {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="error-page-wrapper">
      <div className="error-page-content">
        <h1 className="error-page-title">{title}</h1>
        <div className="error-page-message-block-wrapper">
          <div className="error-page-children-wrapper">
            {children && <div className="error-page-children">{children}</div>}
          </div>
          <div className="error-page-actions-wrapper">
            {actions && <div className="error-page-links">{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
