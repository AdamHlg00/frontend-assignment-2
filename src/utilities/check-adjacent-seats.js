export function checkAdjacentSeats(seats, numberOfSeats, selectedSeat) {
  let bookable = false
  let seatArray = []
  let selectedSeats = []

  const arrayIndex = seats.findIndex(array => array[0].rowNumber === selectedSeat.rowNumber)

  seatArray = seats[arrayIndex]

  const firstSeatInRowIndex = seatArray.length - 1
  const selectedSeatIndex = seatArray.findIndex(seat => seat.seatNumber === selectedSeat.seatNumber)
  const lastSeatInSelectionIndex = parseInt(selectedSeatIndex) - parseInt(numberOfSeats) + 1

  if (0 <= parseInt(lastSeatInSelectionIndex)) {
    bookable = true
    let number = selectedSeatIndex

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