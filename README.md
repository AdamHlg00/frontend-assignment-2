# frontend-assignment-2

## Modules
These modules are jsx files which makes up the brunt of the project.
### main.jsx
This is the main file. It mounts App.jsx.
### App.jsx
This is the file that ties the project together. Here, movies, screenings, and categories are fetched from the API.
Routes to other modules are also created here.
### MovieList.jsx
This file displays information about the screenings and their images, the options a user has when sorting/filtering are also displayed from here.
It also takes care of the logic behind sorting/filtering.
### DisplaySeats.jsx
This file displays the visual booking system users can use to book seats. It also takes care of the logic behind booking, like checking if seats are available or not.
### DisplayReceipt.jsx
This file displays the receipt, which is basically just information about the booking like, price, booked seats, and time.
## Utilities
Smaller vanilla JavaScript files used to execute smaller functions that support the modules.
### check-adjacent-seats.js
This file checks if the number of adjacent seats a user chose to book are available. It is essential to make sure no dubble booking occurs,
or that the seats are not on different rows.
### generate-booking-number.js
This file generates a random booking number, which will be used by the cinema to uniquely identify bookings.
### states.js
I'm not entirely sure what this file does exacly, it is something we got from Thomas' lectures.
It performs some changes to how useStates can be used, potentionally making them easier to use.
I decided to use this since we used it during multiple lectures so I felt more comfortable using it.
