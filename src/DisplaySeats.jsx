import { useEffect } from "react"
import { useStates } from './utilities/states'
import Button from 'react-bootstrap/Button'
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { checkAdjacentSeats } from './utilities/check-adjacent-seats'
import { Link } from 'react-router-dom'
import { generateBookingNumber } from './utilities/generate-booking-number'

// Lets a user select seats to book through a visual booking system
export default function DisplaySeats({ screeningId }) {
  // Uses a new useState
  const s = useStates('bookingUseState', {
    screening: null,
    movie: null,
    seats: [],
    booking: [],
    numberWarning: 'Minimum 0 and maximum 12 seats!',
    typeOfBooking: 'adult'
  })

  useEffect(() => {
    (async () => {
      let screening = (await (await fetch(`/api/occupied_seats?screeningId=${screeningId}`)).json())[0]

      // Convert the string of occupied seats into an array of numbers
      screening.occupiedSeats = screening.occupiedSeats.split(', ').map(x => +x)

      // Set the state variable
      s.screening = screening

      // Get the movie (with poster image, length of movie etc)
      s.movie = (await (await fetch(`/api/movies?title=${screening.movie}`)).json())[0]

      // Get the auditorium id from the auditorium name
      let auditoriumId = ['Stora Salongen', 'Lilla Salongen']
        .indexOf(s.screening.auditorium) + 1

      // Get the seats
      let seats = await (await fetch(
        `/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`
      )).json()

      // Convert the data structure from an array of objects
      // to an array (rows) of arrays (seats in rows) of objects
      let rows = []
      let row
      let latestRow
      for (let seat of seats) {

        // Add a new property, is the seat occupied?
        seat.occupied = screening.occupiedSeats.includes(seat.seatNumber)

        // Arrange seats into rows
        if (latestRow !== seat.rowNumber) {
          row = []
          rows.push(row)
        }
        row.push(seat)
        latestRow = seat.rowNumber
      }

      // Set the state variable
      s.seats = rows
    })()
  }, [])

  function toggleSeatSelection(seat) {
    // Do nothing if occupied
    if (seat.occupied) { return }

    // Uses the checkAdjacentSeats module to see if the selection is bookable
    const bookableObject = checkAdjacentSeats(s.seats, s.numberOfSeats, seat)

    // If the selection is bookable, each seat is added to an array
    if (bookableObject.bookable) {
      bookableObject.selectedSeats.forEach(seat => {
        // select if not selected, deselect if selected
        seat.selected = !seat.selected
        if (seat.selected) {
          s.booking.push({ seat: seat, type: s.typeOfBooking })
        } else {
          // If the seats where already selected and are being deselected they're removed from the array
          let indexToRemove = s.booking.findIndex(booking => booking.seat.id === seat.id)
          s.booking.splice(indexToRemove, 1)
        }
      })
    }
  }

  // Uses the generateBookingNumber module to generate a booking number and adds it to the useState
  function bookingFunction() {
    s.booking.number = generateBookingNumber()
  }

  // Adds the type of booking a seat is (child, senior, or adult) to the useState
  function handleBookingOption(event) {
    s.typeOfBooking = event.target.value
  }

  // Takes the number of seats the user wants to book and checks if it is a viable number
  function seatsToBookFunction(event) {
    const number = event.target.value

    if (number < 1 || number > 12) {
      s.numberWarning = 'Minimum 0 and maximum 12 seats!'
      return
    } else {
      s.numberWarning = ''
    }

    s.numberOfSeats = event.target.value
  }

  // Output the seats
  return s.seats.length === 0 ? null : <div className="screening-and-seats">
    <h1>{s.screening.movie}</h1>
    <h2>{new Intl.DateTimeFormat('en-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(s.screening.screeningTime))}</h2>
    <img
      className="poster-screen"
      src={'https://cinema-rest.nodehill.se' + s.movie.description.posterImage} />
    <div className="seats">
      {s.seats.map(row => <><div className="row">
        {row.map((seat) => <div className={
          (seat.selected ? 'selected' : '')
          + (seat.occupied ? 'occupied' : '')
        }
          onClick={() => { s.numberWarning === '' && toggleSeatSelection(seat) }}>{seat.seatNumber}</div>)}
      </div><br /></>)}
    </div>
    <div>
      <p>
        <label>Select the leftmost seat of the group you want to book</label>
      </p>
      <p>
        {/* Lets the user choose what type of booking the seat(s) are going to be */}
        <label><span>Type of booking: </span>
          <select className='bookingOption' onChange={handleBookingOption}>
            <option value='adult'>Adult</option>
            <option value='child'>Child</option>
            <option value='senior'>Senior</option>
          </select>
        </label>
      </p>
      <Link to={'/receipt/' + s}>
        {/* The book button is unavailable if no seat is selected*/}
        <Button variant='warning' disabled={s.booking.length === 0} onClick={() => bookingFunction()}>Book</Button>
      </Link>
    </div>



    <Form>
      <Form.Group className='seatForm'>
        <Form.Label>Number of adjacent seats: </Form.Label>
        <Form.Control type='number' min={1} max={12} placeholder='Enter number of adjacent seats you want to book' onChange={seatsToBookFunction} />
      </Form.Group>
    </Form>
    {s.numberWarning && <p className='warning'>{s.numberWarning}</p>}
  </div>
}