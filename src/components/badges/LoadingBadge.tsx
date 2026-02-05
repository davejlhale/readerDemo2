export function LoadingBadge() {
  return (
    <div
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        background: "rgba(0,0,0,0.4)",
        color: "white",
        padding: "4px 6px",
        borderRadius: "4px",
        fontSize: "0.75rem",
      }}
    >
      Loading…
    </div>
  );
}
