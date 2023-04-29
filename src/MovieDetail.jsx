import { useParams } from 'react-router-dom'
import { useStates } from './utilities/states'

export default function () {
  const { id } = useParams()

  const s = useStates('main')

  console.log('proxy', s.movies.title)
  const { time, movieId, auditoriumId } = s.screenings.find(screening => screening.id == id)
  //const { length, categories, posterImage } = description

  return <div className="movie-detail">
    <h3>{time}</h3>
    <h4>Movie: {movieId}</h4>
    <h4>Auditorium: {auditoriumId}</h4>
  </div>
}