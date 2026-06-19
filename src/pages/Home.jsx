import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import {
  fetchTrending,
  fetchPopularMovies,
  fetchTopRated,
  fetchUpcoming,
  fetchNowPlaying,
  fetchByGenre,
  fetchTVPopular,
  fetchTVTopRated,
  GENRE_IDS,
} from '../api/tmdb';

// Define all movie rows
const ROW_CONFIGS = [
  {
    title: 'Popular on Netflix',
    fetchFn: () => fetchPopularMovies(),
  },
  {
    title: 'Trending Now',
    fetchFn: () => fetchTrending('all', 'week'),
  },
  {
    title: 'Blockbuster Movies',
    fetchFn: () => fetchTopRated(),
  },
  {
    title: 'Upcoming',
    fetchFn: () => fetchUpcoming(),
  },
  {
    title: 'Top picks for u',
    fetchFn: () => fetchNowPlaying(),
  },
  {
    title: 'Action & Adventure',
    fetchFn: () => fetchByGenre(GENRE_IDS.ACTION),
  },
  {
    title: 'Comedy Movies',
    fetchFn: () => fetchByGenre(GENRE_IDS.COMEDY),
  },
  {
    title: 'Horror Movies',
    fetchFn: () => fetchByGenre(GENRE_IDS.HORROR),
  },
  {
    title: 'Romantic Films',
    fetchFn: () => fetchByGenre(GENRE_IDS.ROMANCE),
  },
  {
    title: 'Anime Collection',
    fetchFn: () => fetchByGenre(GENRE_IDS.ANIMATION),
  },
  {
    title: 'TV Shows',
    fetchFn: () => fetchTVPopular(),
  },
  {
    title: 'Top Rated Series',
    fetchFn: () => fetchTVTopRated(),
  },
  {
    title: 'Documentaries',
    fetchFn: () => fetchByGenre(GENRE_IDS.DOCUMENTARY),
  },
];

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="home-page" id="home-page">
      {/* Hero */}
      <Banner onMoreInfo={setSelectedMovie} />

      {/* Movie rows */}
      <div className="rows-container">
        {ROW_CONFIGS.map((config) => (
          <Row
            key={config.title}
            title={config.title}
            fetchFn={config.fetchFn}
            onMoreInfo={setSelectedMovie}
          />
        ))}
      </div>

      {/* Footer */}
      <Footer />

      {/* More Info Modal */}
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      {/* Back to Top button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        id="back-to-top-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </main>
  );
};

export default Home;
