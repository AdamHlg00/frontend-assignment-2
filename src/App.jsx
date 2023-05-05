import { useEffect } from 'react'
import { useStates } from './utilities/states'
import MovieList from './MovieList'
import DisplaySeats from './DisplaySeats'
import { Routes, Route, useParams } from 'react-router-dom'
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
      // Gets movies from the API
      let movies = await (await fetch('/api/movies')).json()
      s.movies = movies

      // Gets screenings from the API
      let screenings = await (await fetch('/api/screenings')).json()
      s.screenings = screenings

      // Gets categories from the API
      let categories = await (await fetch('/api/categories')).json()
      s.categories = categories
    })()
  }, [])

  // Displays the DisplaySeats module after a user clicks a screening
  function BookSeats() {
    const { id } = useParams()

    return <DisplaySeats screeningId={id} />
  }

  // Displays the DisplayReceipt module after a user has selected seats
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