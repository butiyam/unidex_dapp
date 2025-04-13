import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import "./Navbar.css"; // 👈 Import custom CSS

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  //const navItems = ["Supporters","Benefits", "Donate",  "FAQ", "Telegram", "X"];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <Image  src="/logo.png" width = { 150 } height = { 150 } alt ="unidex-logo" />
        </div>

        <nav className="navbar-links">
        <a key="Supporters" href="#supporters">
              Supporters
            </a>
            <a key="Benefits" href="#benefits">
              Benefits
            </a>
            <a key="Donate" href="#donate">
              Donate
            </a>
            <a key="FAQ" href="#faq">
              FAQ
            </a>
            <a  href="https://t.me/unidexcommunity" target="_blank" >
              Telegram
            </a>
            <a  href="https://x.com/unidex_" target="_blank">
              X
            </a>
        </nav>

        {/* Hamburger icon for mobile only */}
        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
               <a key="Supporters" href="#supporters" onClick={() => setMenuOpen(false)} >
              Supporters
            </a>
            <a key="Benefits" href="#benefits" onClick={() => setMenuOpen(false)} >
              Benefits
            </a>
            <a key="Donate" href="#donate" onClick={() => setMenuOpen(false)}>
              Donate
            </a>
            <a key="FAQ" href="#faq"  onClick={() => setMenuOpen(false)} >
              FAQ
            </a>
            <a  href="https://t.me/unidexcommunity"  onClick={() => setMenuOpen(false)} target="_blank" >
              Telegram
            </a>
            <a  href="https://x.com/unidex_"  onClick={() => setMenuOpen(false)} target="_blank">
              X
            </a>
        </div>
      )}
    </header>
  );
}
