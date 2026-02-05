import type { ReactNode } from "react";

export function AppErrorLayout({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{title}</h1>
      {children && <div style={{ marginTop: "1rem" }}>{children}</div>}
    </div>
  );
}
