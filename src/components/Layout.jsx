import React from "react";
import Header from "./Header";
import PromptPreview from "./PromptPreview";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        paddingBottom: "100px",
      }}
    >
      <Header />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Prompt is now at the top for better visibility */}
        <div style={{ marginBottom: "2rem" }}>
          <PromptPreview />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
