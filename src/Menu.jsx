import { useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "fixed", top: "1rem", left: "1rem" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: 0
          }}
        >
          <a href="#home" style={{ display: "block", padding: "0.5rem" }}>
            Home
          </a>
          <a href="#patterns" style={{ display: "block", padding: "0.5rem" }}>
            Patterns
          </a>
        </div>
      )}
    </div>
  );
}

export default Menu;
