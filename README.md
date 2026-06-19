# Premium Netflix Clone

A fully responsive, visually accurate Netflix clone built with React, Vite, HTML, CSS, and JavaScript. This application fetches real-time movie and TV show data using the TMDB API.

## Features
- **Accurate UI**: 95-99% visual similarity to the actual Netflix interface.
- **Dynamic Hero Banner**: Displays trending movies with a dark gradient overlay.
- **Movie Rows**: Multiple categories (Trending, Top Rated, Action, Comedy, etc.) with horizontal scrolling and hover effects.
- **Hover Animations**: Netflix-style card scaling and popup details on hover.
- **Search Functionality**: Live search with a debounced dropdown for movies and TV shows.
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices.

## Requirements & Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: You need Node.js installed (v16.0.0 or higher is recommended).
- **npm**: Node package manager (comes with Node.js).
- **TMDB API Key**: You need an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mariselvam110722/netflix-clone.git
   cd netflix-clone
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root of the project and add your TMDB API Key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

## Running the Application

To start the development server, run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Technologies Used
- React (with Hooks)
- Vite
- Vanilla CSS
- Axios (for API requests)
- TMDB API
