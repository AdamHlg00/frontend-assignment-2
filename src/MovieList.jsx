import { useStates } from './utilities/states'
import { Link } from 'react-router-dom'

export default function MovieList() {
  const s = useStates('main')

  const handleSortingOption = (event) => {
    s.sorting = event.target.value
  }

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

  const handleFilterCategory = (event) => {
    s.filterCategory = event.target.value
  }

  let filteredScreenings
  if (s.filterCategory === 'All') {
    filteredScreenings = sortedScreenings
  } else {
    const filteredMovies = s.movies.filter(movie => movie.description.categories.includes(s.filterCategory))
    const filteredMovieIds = filteredMovies.map(movie => movie.id)
    filteredScreenings = sortedScreenings.filter(screening => filteredMovieIds.includes(screening.movieId))
  }

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

    {/*s.movies.map(({ slug, title, description }) => <Link
      to={'/movie-detail/' + slug}>
      <div className="movie">
        <h3>{title}</h3>
        <img src={'https://cinema-rest.nodehill.se' + description.posterImage} />
      </div>
    </Link>
)*/}

    {filteredScreenings.map(({ id, time, movieId }) => {
      const movie = s.movies.find(({ id }) => id === movieId)
      return (
        <div className='screening' key={id}>
          <h1>{new Intl.DateTimeFormat('sv-SE', {
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
      )
    })}
  </>
}

