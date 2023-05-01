export function checkAdjacentSeats(seats, auditorium, numberOfSeats, selectedSeat) {
  let bookable = false
  let seatArray = []
  let loopVariable = 0

  for (let seat of seats) {
    if (seat.auditoriumId === auditorium && seat.rowNumber === selectedSeat.rowNumber) {
      seatArray.push(seat)
    }
  }

  seatArray.sort((a, b) => {
    if (a.seatNumber < b.seatNumber) {
      return -1
    }
    if (a.seatNumber > b.seatNumber) {
      return 1
    }
    return 0
  })

  if (seatArray.length >= numberOfSeats) {
    while (!bookable && loopVariable < seatArray.length) {
      const chosenIndex = seatArray.findIndex((seat) => seat.seatNumber = selectedSeat.seatNumber)
    }
    bookable = true
  }

  return bookable
}