import { useParams } from 'react-router-dom'
import { useStates } from './utilities/states'

export default function () {
  const { slug } = useParams()

  const s = useStates('main')

  const { title, description } = s.movies.find(movie => movie.slug == slug)
  const { length, categories, posterImage } = description

  return <div className="movie-detail">
    <h3>{title}</h3>
    <h4>Length: {length} minutes</h4>
    <h4>Categories: {categories.join(', ')}</h4>
    <img src={'https://cinema-rest.nodehill.se' + posterImage} />
  </div>
}