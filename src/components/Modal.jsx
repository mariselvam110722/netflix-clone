import React, { useEffect } from 'react';
import { getBackdropUrl, getPosterUrl } from '../api/tmdb';

const Modal = ({ movie, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!movie) return null;

  const imageUrl = getBackdropUrl(movie.backdrop_path) || getPosterUrl(movie.poster_path);
  const title = movie.title || movie.name || 'Unknown';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const matchScore = Math.round((movie.vote_average || 5) * 10);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} id="movie-modal">
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close" id="modal-close-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="modal-hero">
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }} />
          )}
          <div className="modal-hero-gradient" />

          <div className="modal-hero-content">
            <h2 className="modal-title">{title}</h2>
            <div className="modal-actions">
              <button className="btn-play" style={{ padding: '10px 28px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button className="btn-more-info">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                My List
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div>
            <div className="modal-rating">
              <span style={{ color: '#46d369', marginRight: '8px' }}>{matchScore}% Match</span>
              {year && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', fontWeight: 400 }}>{year}</span>}
            </div>
            <p className="modal-description">{movie.overview || 'No description available.'}</p>
          </div>
          <div>
            <p className="modal-meta">
              <strong>Rating: </strong>⭐ {rating} / 10
            </p>
            <p className="modal-meta" style={{ marginTop: '8px' }}>
              <strong>Language: </strong>{(movie.original_language || 'en').toUpperCase()}
            </p>
            {movie.popularity && (
              <p className="modal-meta" style={{ marginTop: '8px' }}>
                <strong>Popularity: </strong>{Math.round(movie.popularity).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
