import React from "react";
import "../styles/globals.css";
export const metadata = {
  title: "Todo App",
  description:
    "Enhance your task management with our Next.js frontend and seamlessly integrating Google SSO for a user-friendly, responsive experience. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.StrictMode>
      <html lang="en">
        <body className="body">{children}</body>
      </html>
    </React.StrictMode>
  );
}
