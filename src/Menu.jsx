import { useState } from "react";

function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">

      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-2xl px-2 py-1 rounded-lg bg-gray-50 border border-gray-200 shadow-sm hover:bg-gray-100 transition"
      >
        ☰
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-10 left-0 w-40 rounded-xl border border-gray-200 bg-white shadow-lg">
          <a
            href="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"
          >
            Home
          </a>
          <a
            href="#patterns"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-xl"
          >
            Patterns
          </a>
        </div>
      )}
    </div>
  );
}

export default Menu;
