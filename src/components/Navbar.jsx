import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'TV Shows', href: '#' },
  { label: 'Movies', href: '#' },
  { label: 'New & Popular', href: '#' },
  { label: 'My List', href: '#' },
  { label: 'Browse by Language', href: '#' },
];

const NetflixLogo = () => (
  <span
    aria-label="Netflix"
    style={{
      fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
      fontWeight: 400,
      fontSize: '32px',
      color: '#E50914',
      letterSpacing: '2px',
      lineHeight: 1,
      userSelect: 'none',
      display: 'block',
    }}
  >
    NETFLIX
  </span>
);

const ProfileAvatar = () => (
  <div className="profile-avatar">
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('.profile-wrapper')) setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [profileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
        {/* Left */}
        <div className="navbar-left">
          <div className="netflix-logo" id="netflix-logo">
            <NetflixLogo />
          </div>

          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={activeLink === label ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveLink(label);
                  }}
                  id={`nav-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger for mobile */}
          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            id="hamburger-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        {/* Right */}
        <div className="navbar-right">
          <SearchBar isOpen={searchOpen} onToggle={setSearchOpen} />

          <button className="childrens-btn" id="childrens-btn">Childrens</button>

          {/* Notification */}
          <button className="notif-btn" id="notification-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div
            className="profile-wrapper"
            onClick={() => setProfileOpen(!profileOpen)}
            id="profile-btn"
          >
            <ProfileAvatar />
            <span className="profile-caret">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>

            {profileOpen && (
              <div className="profile-dropdown">
                {[
                  { icon: '👤', label: 'Account' },
                  { icon: '❓', label: 'Help Center' },
                ].map(({ icon, label }) => (
                  <div key={label} className="dropdown-item">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
                <div className="dropdown-divider" />
                <div className="dropdown-item">
                  <span>Sign out of Netflix</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobile-nav-menu">
        {NAV_LINKS.map(({ label }) => (
          <div
            key={label}
            className="mobile-nav-item"
            onClick={() => {
              setActiveLink(label);
              setMobileMenuOpen(false);
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
