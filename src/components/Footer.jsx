import React from 'react';

const FOOTER_LINKS = [
  'FAQ', 'Help Center', 'Account', 'Media Center',
  'Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use',
  'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us',
  'Speed Test', 'Legal Notices', 'Only on Netflix', 'Do Not Sell or Share My Personal Information',
];

const Footer = () => (
  <footer className="footer" id="site-footer">
    {/* Social links */}
    <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
      {[
        {
          label: 'Facebook',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          ),
        },
        {
          label: 'Instagram',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          ),
        },
        {
          label: 'Twitter',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          ),
        },
        {
          label: 'YouTube',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.07 12 20.07 12 20.07s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
            </svg>
          ),
        },
      ].map(({ label, icon }) => (
        <button
          key={label}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#808080',
            cursor: 'pointer',
            transition: 'color 0.2s',
            padding: 0,
          }}
          aria-label={label}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#808080')}
        >
          {icon}
        </button>
      ))}
    </div>

    {/* Links grid */}
    <div className="footer-links">
      {FOOTER_LINKS.map((link) => (
        <span key={link} className="footer-link">
          {link}
        </span>
      ))}
    </div>

    {/* Service code */}
    <div className="footer-service-code">Service Code</div>

    {/* Copyright */}
    <p className="footer-copyright">© {new Date().getFullYear()} Netflix Clone. Not affiliated with Netflix, Inc.</p>
  </footer>
);

export default Footer;
