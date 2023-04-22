import { useEffect } from 'react'
import { useStates } from './utilities/states'
import MovieList from './MovieList'
import MovieDetail from './MovieDetail'
import { Routes, Route } from 'react-router-dom'
import { kebabify } from './utilities/kebabify'

export default function App() {
  const s = useStates('main', {
    movies: []
  })

  useEffect(() => {
    (async () => {
      let movies = await (await fetch('/api/movies')).json()
      for (let movie of movies) {
        movie.slug = kebabify(movie.title)
      }
      s.movies = movies
    })()
  }, [])

  return s.movies.length === 0 ? null : <>
    <Routes>
      <Route path="/" element={<MovieList />}></Route>
      <Route path="/movie-detail/:slug" element={<MovieDetail />} />
    </Routes>
  </>
}