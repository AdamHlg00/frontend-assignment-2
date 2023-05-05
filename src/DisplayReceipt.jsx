import { useStates } from './utilities/states'

// Displays the receipt after booking
export default function DisplayReceipt() {
  const s = useStates('bookingUseState')
  let totalPrice = 0
  let seats = ''

  // Adds up the price based on the kinds of bookings that where booked
  s.booking.forEach(booking => {
    // Adult: 85 SEK
    // Seniors: 75 SEK
    // Children: 65 SEK
    if (booking.type === 'adult') {
      totalPrice += 85
    } else if (booking.type === 'senior') {
      totalPrice += 75
    } else {
      totalPrice += 65
    }

    // Adds the seat numbers to a string
    seats += booking.seat.seatNumber + ', '
  })

  // Outputs the receipt
  return <>
    <h1>RECEIPT</h1>
    <h3>{s.movie.title}</h3>
    <div className='receiptInfo'>
      <h3>{new Intl.DateTimeFormat('en-EN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format(new Date(s.screening.screeningTime))}</h3>
      <h5>{Math.floor(s.movie.description.length / 60)} hours {s.movie.description.length % 60} minutes</h5>
      <h3>Price: {totalPrice} SEK</h3>
      <h2>Seats: {seats}</h2>
      <h2>Booking number: {s.booking.number}</h2>
    </div>
  </>

}