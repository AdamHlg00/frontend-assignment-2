import { useStates } from './utilities/states'
import { Link } from 'react-router-dom'

export default function MovieList() {
  const s = useStates('main')

  const handleSortingOption = (event) => {
    s.option = event.target.value
    console.log(s.option)
  }

  return <>
    <div>
      <label><span>Sort by:</span>
        <select className="sortOption" onChange={handleSortingOption}>
          <option>Date (Ascending)</option>
          <option>Date (Descending)</option>
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

    {s.screenings.map(({ id, time, movieId }) => {
      const movie = s.movies.find(({ id }) => id === movieId)
      return (
        <div className="screening" key={id}>
          <h3>{time}</h3>
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

