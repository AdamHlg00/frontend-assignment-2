import { useStates } from './utilities/states'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

// Displays a list of all the screenings
export default function MovieList() {
  // Uses the same useState as in App
  const s = useStates('main')

  // When a sort option is selected it is added to the useState
  const handleSortingOption = (event) => {
    s.sorting = event.target.value
  }

  // Sorts the screenings bases on the selected sort option
  const sortedScreenings = [...s.screenings].sort((a, b) => {
    const aTime = new Date(a.time)
    const bTime = new Date(b.time)

    if (s.sorting === 'dateAscending') {
      return aTime - bTime
    } else if (s.sorting === 'dateDescending') {
      return bTime - aTime
    }

    return 0
  })

  // When a filter category is selected it is added to the useState
  const handleFilterCategory = (event) => {
    s.filterCategory = event.target.value
  }

  // Filters the screenings based on the selected filter category
  let filteredScreenings
  if (s.filterCategory === 'All') {
    filteredScreenings = sortedScreenings
  } else {
    const filteredMovies = s.movies.filter(movie => movie.description.categories.includes(s.filterCategory))
    const filteredMovieIds = filteredMovies.map(movie => movie.id)
    filteredScreenings = sortedScreenings.filter(screening => filteredMovieIds.includes(screening.movieId))
  }

  // Displays the selections for sorting, filtering, and the screenings to be displayed
  return <>
    <div>
      <label><span>Sort by: </span>
        <select className='sortOption' onChange={handleSortingOption}>
          <option value='dateAscending'>Date (Ascending)</option>
          <option value='dateDescending'>Date (Descending)</option>
        </select>
      </label>
      <label><span>Filter by category: </span>
        <select className='filterCategory' onChange={handleFilterCategory}>
          <option value='All'>All</option>
          {s.categories.map((category) => (
            <option key={category.value} value={category.value}>{category.title}</option>
          ))}
        </select>
      </label>
    </div>

    {/* Uses react bootstrap grid system to have a responsive layout */}
    <Container>
      <Row>
        {filteredScreenings.map(({ id, time, movieId }) => {
          const movie = s.movies.find(({ id }) => id === movieId)
          return (
            <Col className='screening' xs={12} md={6} lg={4}>
              <Link to={'/book-seats/' + id}>
                <div key={id}>
                  <h1>{new Intl.DateTimeFormat('en-EN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  }).format(new Date(time))}</h1>
                  {movie && (
                    <div className='movie'>
                      <h2>{movie.title}</h2>
                      <h3>{Math.floor(movie.description.length / 60)} hours {movie.description.length % 60} minutes</h3>

                      <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} />
                    </div>
                  )}
                </div>
              </Link>
            </Col>
          )
        })}
      </Row>
    </Container>
  </>
}

