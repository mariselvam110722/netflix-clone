import React, { useState, useEffect, useCallback } from 'react';
import { fetchTrending, getBackdropUrl, getPosterUrl } from '../api/tmdb';

const NetflixBadgeLogo = () => (
  <span
    aria-hidden="true"
    style={{
      fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
      fontWeight: 400,
      fontSize: '22px',
      color: '#E50914',
      lineHeight: 1,
      letterSpacing: '1px',
    }}
  >
    N
  </span>
);

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const HeroSkeleton = () => (
  <div className="hero skeleton-hero skeleton" />
);

const Banner = ({ onMoreInfo }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const intervalRef = React.useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrending('movie', 'week');
        const withBackdrops = data.results.filter((m) => m.backdrop_path);
        setMovies(withBackdrops.slice(0, 8));
      } catch (err) {
        console.error('Banner fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const changeMovie = useCallback((index) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeIn(true);
    }, 400);
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    intervalRef.current = setInterval(() => {
      changeMovie((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, [movies, changeMovie]);

  if (loading) return <HeroSkeleton />;

  const movie = movies[currentIndex];
  if (!movie) return null;

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const title = movie.title || movie.name || 'Unknown Title';
  const overview = movie.overview || '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

  return (
    <section className="hero" id="hero-banner">
      {/* Backdrop */}
      {backdropUrl && (
        <img
          key={movie.id}
          src={backdropUrl}
          alt={title}
          className="hero-backdrop"
          style={{
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

      {/* Overlays */}
      <div className="hero-gradient-overlay" />
      <div className="hero-gradient-bottom" />

      {/* Content */}
      <div
        className="hero-content"
        style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* N SERIES badge */}
        <div className="hero-badge">
          <NetflixBadgeLogo />
          <span>SERIES</span>
        </div>

        {/* Title */}
        <h1 className="hero-title">{title}</h1>

        {/* Description */}
        {overview && (
          <p className="hero-description">{overview}</p>
        )}

        {/* Buttons */}
        <div className="hero-actions">
          <button className="btn-play" id="hero-play-btn">
            <PlayIcon />
            Play
          </button>
          <button
            className="btn-more-info"
            id="hero-more-info-btn"
            onClick={() => onMoreInfo && onMoreInfo(movie)}
          >
            <InfoIcon />
            More Info
          </button>
        </div>
      </div>

      {/* Age rating */}
      <div className="hero-rating-badge">
        <span>16+</span>
      </div>

      {/* Dot indicators */}
      {movies.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '60px',
            display: 'flex',
            gap: '6px',
            zIndex: 2,
          }}
        >
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => changeMovie(i)}
              style={{
                width: i === currentIndex ? '20px' : '8px',
                height: '3px',
                background: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Banner;
