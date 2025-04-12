import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import "./Navbar.css"; // 👈 Import custom CSS

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Support", "Benefits", "Chart", "Telegram", "X"];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <Image  src="/logo.png" width = { 150 } height = { 150 } alt ="unidex-logo" />
        </div>

        <nav className="navbar-links">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>

        {/* Hamburger icon for mobile only */}
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
