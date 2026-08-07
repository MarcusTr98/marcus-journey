import Link from "next/link";
export default function AdminPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#07141b",
        color: "white",
      }}
    >
      <div>
        <p style={{ color: "#F46300", letterSpacing: 3, fontSize: 11 }}>MARCUS JOURNEY ADMIN</p>
        <h1>Content studio is coming next.</h1>
        <p>
          Firebase Authentication and content management will be enabled after credentials are
          connected.
        </p>
        <Link href="/" style={{ color: "#00A859" }}>
          ← Back to journey
        </Link>
      </div>
    </main>
  );
}
