import Link from "next/link";
import "../styles/welcome.css";

export default function Welcome() {
  return (
    <main id="welcome-container">
      <div id="welcome-content">
        <h1>Welcome to Todo</h1>
        <p id="welcome-para">
          Please login to your account or create new account to continue
        </p>
      </div>

      {/* Links for authentication purposes */}
      <div id="auth-links" role="navigation">
        <Link href="/" className="link link--background">
          Login
        </Link>
        <Link href="/" className="link link--border">
          Create Account
        </Link>
      </div>
    </main>
  );
}
