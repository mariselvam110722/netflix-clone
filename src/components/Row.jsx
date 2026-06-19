import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from './MovieCard';

const SkeletonCard = () => (
  <div className="skeleton-card skeleton" style={{ flexShrink: 0 }} />
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Row = ({ title, fetchFn, onMoreInfo }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchFn();
        if (!cancelled) {
          setMovies(data.results || []);
        }
      } catch (err) {
        console.error(`Error loading row "${title}":`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [fetchFn, title]);

  // Scroll buttons
  const scrollBy = (direction) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  // Mouse drag to scroll
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.classList.add('grabbing');
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    sliderRef.current?.classList.remove('grabbing');
  };

  // Mouse wheel support
  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += e.deltaY * 3;
    }
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  if (!loading && movies.length === 0) return null;

  return (
    <section className="movie-row" id={`row-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="row-header">
        <h2 className="row-title">
          {title}
          <span className="explore-more">
            Explore All
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </h2>
      </div>

      <div className="row-slider-wrapper">
        {/* Left scroll button */}
        <button
          className="scroll-btn left"
          onClick={() => scrollBy('left')}
          aria-label="Scroll left"
          id={`scroll-left-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <ChevronLeftIcon />
        </button>

        {/* Cards slider */}
        <div
          className="row-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMoreInfo={onMoreInfo}
                />
              ))}
        </div>

        {/* Right scroll button */}
        <button
          className="scroll-btn right"
          onClick={() => scrollBy('right')}
          aria-label="Scroll right"
          id={`scroll-right-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
};

export default Row;
