// BookNotFound.tsx

import { useNavigate } from "react-router-dom";

export default function BookNotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Book Not Found</h1>
      <p style={styles.text}>
        The book you’re looking for doesn’t exist or may have been removed.
      </p>

      <button style={styles.button} onClick={() => navigate("/series")}>
        Go Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fa",
    textAlign: "center" as const,
    padding: "2rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  text: {
    marginBottom: "2rem",
    color: "#555",
  },
  button: {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
