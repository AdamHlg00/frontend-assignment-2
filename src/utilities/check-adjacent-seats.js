// Checks if a number of adjacent seats are available basen on the chosen number of seats
//  + the selected seat
// Only checks seats to the right of the selected seat, if you want 4 seats,
// you'll click the left one and get three mopre to the right
export function checkAdjacentSeats(seats, numberOfSeats, selectedSeat) {
  let bookable = false
  let seatArray = []
  let selectedSeats = []

  // Gets the index of the row which contains the seat that was clicked
  const arrayIndex = seats.findIndex(array => array[0].rowNumber === selectedSeat.rowNumber)

  // Inserts all seats in the selected row into an array
  seatArray = seats[arrayIndex]

  /* Here the last and first seats are defined from left to right as they visually appear in the auditorium.
    The leftmost seat is the first seat and the rightmost seat is the last seat.
    This can get confusing, as in the array of seats index 0 is the rightmost seat and the highest index is the leftmost.*/

  // Gets the index of the clicked seat and the index of the rightmost seat of the "selection" (selected seat + number of seats picked - 1)
  const selectedSeatIndex = seatArray.findIndex(seat => seat.seatNumber === selectedSeat.seatNumber)
  const lastSeatInSelectionIndex = parseInt(selectedSeatIndex) - parseInt(numberOfSeats) + 1

  // Checks if the rightmost seat of the selection is not past the rightmost seat of the row
  if (0 <= parseInt(lastSeatInSelectionIndex)) {
    bookable = true
    let number = selectedSeatIndex

    // Loops through the selection, if any of the seats are occupied the selection is not bookable
    while (number >= lastSeatInSelectionIndex) {
      selectedSeats.push(seatArray[number])
      if (seatArray[number].occupied) {
        bookable = false
        break
      }
      number--
    }
  }
  return { bookable, selectedSeats }
}