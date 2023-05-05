import { useEffect } from 'react'
import { useStates } from './utilities/states'
import MovieList from './MovieList'
import DisplaySeats from './DisplaySeats'
import { Routes, Route, useParams } from 'react-router-dom'
import { kebabify } from './utilities/kebabify'
import DisplayReceipt from './DisplayReceipt'

export default function App() {
  const s = useStates('main', {
    movies: [],
    screenings: [],
    sorting: 'dateAscending',
    categories: [],
    filterCategory: 'All'
  })

  useEffect(() => {
    (async () => {
      let movies = await (await fetch('/api/movies')).json()
      for (let movie of movies) {
        movie.slug = kebabify(movie.title)
      }
      s.movies = movies

      let screenings = await (await fetch('/api/screenings')).json()
      s.screenings = screenings

      let categories = await (await fetch('/api/categories')).json()
      s.categories = categories
    })()
  }, [])

  function BookSeats() {
    const { id } = useParams()

    return <DisplaySeats screeningId={id} />
  }

  function HandleReceipt() {
    const { booking } = useParams()

    return <DisplayReceipt booking={booking} />
  }

  return s.movies.length === 0 ? null : <>
    <Routes>
      <Route path='/' element={<MovieList />}></Route>
      <Route path='/book-seats/:id' element={<BookSeats />} />
      <Route path='/receipt/:booking' element={<HandleReceipt />}></Route>
    </Routes>
  </>
}