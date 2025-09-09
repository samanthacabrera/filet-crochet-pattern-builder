import { useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-2xl"
      >
        ☰
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-8 left-0">
          <a href="#home" className="block px-4 py-2 hover:bg-gray-100">
            Home
          </a>
          <a href="#patterns" className="block px-4 py-2 hover:bg-gray-100">
            Patterns
          </a>
        </div>
      )}
    </div>
  );
}

export default Menu;
