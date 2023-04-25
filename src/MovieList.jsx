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

  return <>
    <div>
      <label><span>Sort by: </span>
        <select className="sortOption" onChange={handleSortingOption}>
          <option value="dateAscending">Date (Ascending)</option>
          <option value="dateDescending">Date (Descending)</option>
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

    {sortedScreenings.map(({ id, time, movieId }) => {
      const movie = s.movies.find(({ id }) => id === movieId)
      return (
        <div className="screening" key={id}>
          <h3>{new Intl.DateTimeFormat('sv-SE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }).format(new Date(time))}</h3>
          {movie && (
            <div className="movie">
              <h4>{movie.title}</h4>
              <img src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`} />
            </div>
          )}
        </div>
      )
    })}
  </>
}

