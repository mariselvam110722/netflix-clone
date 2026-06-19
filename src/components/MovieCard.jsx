import React, { useState } from 'react';
import { getBackdropUrl, getPosterUrl } from '../api/tmdb';

const GENRE_NAMES = {
  28: 'Action',
  35: 'Comedy',
  27: 'Horror',
  10749: 'Romance',
  16: 'Animation',
  99: 'Documentary',
  53: 'Thriller',
  878: 'Sci-Fi',
  18: 'Drama',
  12: 'Adventure',
  10751: 'Family',
};

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ThumbUpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MovieCard = ({ movie, onMoreInfo }) => {
  const [imgError, setImgError] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);

  const backdropUrl = !imgError
    ? getBackdropUrl(movie.backdrop_path) || getPosterUrl(movie.poster_path)
    : getPosterUrl(movie.poster_path);

  const title = movie.title || movie.name || 'Unknown';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '?';
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const matchScore = Math.round((movie.vote_average || 5) * 10);

  const genres = (movie.genre_ids || [])
    .slice(0, 3)
    .map((id) => GENRE_NAMES[id])
    .filter(Boolean);

  return (
    <div className="movie-card" id={`movie-card-${movie.id}`}>
      {/* Main card image */}
      <div className="movie-card-inner">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '113px',
              background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
            </svg>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="movie-card-overlay">
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>{title}</span>
        </div>
      </div>

      {/* Card title */}
      <div className="movie-card-title">{title}</div>

      {/* Hover popup card */}
      <div className="movie-card-hover">
        {/* Hover image */}
        <div className="hover-card-image">
          {backdropUrl ? (
            <img src={backdropUrl} alt={title} loading="lazy" />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }} />
          )}
        </div>

        {/* Hover body */}
        <div className="hover-card-body">
          {/* Action buttons */}
          <div className="hover-card-actions">
            <button
              className="hover-btn play-btn"
              aria-label="Play"
              title="Play"
            >
              <PlayIcon />
            </button>
            <button
              className="hover-btn"
              aria-label="Add to my list"
              title="Add to My List"
              onClick={() => setIsInMyList(!isInMyList)}
              style={isInMyList ? { borderColor: '#fff', background: 'rgba(255,255,255,0.15)' } : {}}
            >
              <PlusIcon />
            </button>
            <button className="hover-btn" aria-label="Like" title="Like">
              <ThumbUpIcon />
            </button>
            <span className="hover-btn-spacer" />
            <button
              className="hover-btn"
              aria-label="More info"
              title="More Info"
              onClick={() => onMoreInfo && onMoreInfo(movie)}
            >
              <ChevronDownIcon />
            </button>
          </div>

          {/* Meta info */}
          <div className="hover-card-meta">
            <span className="match-score">{matchScore}% Match</span>
            <span className="hover-rating">
              {parseFloat(rating) >= 7 ? 'PG-13' : parseFloat(rating) >= 5 ? 'TV-14' : 'TV-MA'}
            </span>
            {year && <span className="hover-year">{year}</span>}
          </div>

          {/* Title */}
          <div className="hover-title">{title}</div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="hover-genres">
              {genres.map((g) => (
                <span key={g} className="hover-genre-tag">{g}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
