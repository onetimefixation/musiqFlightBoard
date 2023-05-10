
const apiUrl = "https://data.vatsim.net/v3/vatsim-data.json";
const flights = [];

fetch(apiUrl)
.then(response => {
  if (!response.ok) {
    throw new Error(`Network response was not OK. Status code: ${response.status}, Status text: ${response.statusText}`);
  }
  return response;
})
  .then(response => response.json())
  .then(data => {
    
//////////////////////////////////////// ////////////////////////////////




//////////////////////////////////////////////////////////////////////////



    // Loop through all pilots and extract the desired fields
      for (let i = 0; i < 20; i++) {
   // for (let i = 0; i < data.pilots.length; i++) {
      const pilot = data.pilots[i];
      const callsign = pilot.callsign;
      const departure = pilot.flight_plan?.departure;
      const arrival = pilot.flight_plan?.arrival;
      const aircraft_short = pilot.flight_plan?.aircraft_short;
      

      if (departure && arrival && aircraft_short) {
        flights.push({ flight: callsign, departure, arrival, aircraft: aircraft_short });

    }
  }
    // Create the flight board table
    const boardTable = document.querySelector('.board-table tbody');
    /* for (let i = 0; i < flights.length; i++) { */
    for (let i = 0; i < 1; i++) {

console.log("8:50")
//updateFlights(departure, arrival);


       const row = document.createElement('tr');

      const flightNumberCell = document.createElement('td');
      flightNumberCell.textContent = flights[i].flight;
      flightNumberCell.setAttribute('data-flight', flights[i].flight);
      flightNumberCell.classList.add('flight-number');
      row.appendChild(flightNumberCell);

      const departureCell = document.createElement('td');
      departureCell.textContent = flights[i].departure;
      departureCell.setAttribute('data-departure', flights[i].departure);
      departureCell.classList.add('departure');
      row.appendChild(departureCell);

      const arrivalCell = document.createElement('td');
      arrivalCell.textContent = flights[i].arrival;
      arrivalCell.setAttribute('data-arrival', flights[i].arrival);
      arrivalCell.classList.add('arrival');
      row.appendChild(arrivalCell);

      const aircraftCell = document.createElement('td');
      aircraftCell.textContent = flights[i].aircraft;
      aircraftCell.setAttribute('data-aircraft', flights[i].aircraft);
      aircraftCell.classList.add('aircraft');
      row.appendChild(aircraftCell);

      boardTable.appendChild(row); 
      
      updateFlights(userDeparture, userArrival);

    }

    // Call the function to start the animation
    alternateCells();
  })
  .catch(error => console.error(error));


  
// Define the rotateCell function to spin the cell contents
 function rotateCell(cell, duration, callback) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let content = cell.textContent.trim();
  let newContent = '';
  for (let i = 0; i < content.length; i++) {
    if (content[i] === ' ') {
      newContent += ' ';
    } else {
      let randomIndex = Math.floor(Math.random() * letters.length);
      newContent += '<span class="random-spin">' + letters[randomIndex] + '</span>';
    }
  }
  cell.innerHTML = newContent;
  setTimeout(() => {
    cell.innerHTML = content;
    if (callback) {
      callback();
    }
  }, duration);
}

 // Define the spinCells function to spin all the cells in the table
function spinCells(duration, callback) {
  const cells = document.querySelectorAll('.board-table td');
  let completed = 0;
  cells.forEach((cell, index) => { 
    setTimeout(() => {
      rotateCell(cell, duration, () => {
        completed++;
        if (completed === cells.length) {
          if (callback) {
            callback();
          }
        }
      });
    }, index * 50);
  });
}

/* function updateFlights(departure, arrival) {
  const tbody = document.querySelector('.board-table tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < flights.length; i++) {
    const flight = flights[i];
    const callSign = flight.flight;
    const flightDeparture = flight.departure ? flight.departure.toLowerCase() : '';
    const flightArrival = flight.arrival ? flight.arrival.toLowerCase() : '';

    if ((typeof departure === 'string' && (flightDeparture.includes(departure.toLowerCase()) || departure === '')) && (typeof arrival === 'string' && (flightArrival.includes(arrival.toLowerCase()) || arrival === ''))) {
      const row = tbody.insertRow();
      const callSignCell = row.insertCell();
      const departureCell = row.insertCell();
      const arrivalCell = row.insertCell();
      const aircraftTypeCell = row.insertCell();

      callSignCell.textContent = callSign.toUpperCase();
      departureCell.textContent = flightDeparture.toUpperCase();
      arrivalCell.textContent = flightArrival.toUpperCase();
      aircraftTypeCell.textContent = flight.aircraft.toUpperCase();
    }
  }
} */

function updateFlights(departure, arrival) {
  const tbody = document.querySelector('.board-table tbody');
  tbody.innerHTML = '';

  // Shuffle the flights array
  shuffle(flights);

  for (let i = 0; i < flights.length; i++) {
    const flight = flights[i];
    const callSign = flight.flight;
    const flightDeparture = flight.departure ? flight.departure.toLowerCase() : '';
    const flightArrival = flight.arrival ? flight.arrival.toLowerCase() : '';

    if ((typeof departure === 'string' && (flightDeparture.includes(departure.toLowerCase()) || departure === '')) && (typeof arrival === 'string' && (flightArrival.includes(arrival.toLowerCase()) || arrival === ''))) {
      const row = tbody.insertRow();
      const callSignCell = row.insertCell();
      const departureCell = row.insertCell();
      const arrivalCell = row.insertCell();
      const aircraftTypeCell = row.insertCell();

      callSignCell.textContent = callSign.toUpperCase();
      departureCell.textContent = flightDeparture.toUpperCase();
      arrivalCell.textContent = flightArrival.toUpperCase();
      aircraftTypeCell.textContent = flight.aircraft.toUpperCase();
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Request departure from user
const userDeparture = prompt("Enter Departure ICAO Code:");

// Wait until receiving user input
if (userDeparture !== null) {
  // User provided input, continue with execution
  console.log(`Departure, ${userDeparture}!`);
} else {
  // User clicked "Cancel", stop execution
  console.log("Departure cancelled by user.");
}

// Request arrival from user
const userArrival = prompt("Enter Arrival ICAO Code:");

// Wait until receiving user input
if (userArrival !== null) {
  // User provided input, continue with execution
  console.log(`Arrival, ${userArrival}!`);
} else {
  // User clicked "Cancel", stop execution
  console.log("Arrival cancelled by user.");
}



// Define the alternateCells function to alternate between spinning and showing the original data
function alternateCells() {
  const cells = document.querySelectorAll('.board-table td');
  const letters = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  cells.forEach(cell => {

  });




  setTimeout(() => {
    cells.forEach(cell => {
      const flight = cell.parentNode.firstChild.textContent;
      const data = flights.find(f => f.flight === flight);
      if (data) {
        if (cell.cellIndex === 1) {
          cell.textContent = data.departure;
        } else if (cell.cellIndex === 2) {
          cell.textContent = data.arrival;
        } else if (cell.cellIndex === 3) {
          cell.textContent = data.aircraft;
        }
      }
    });

    spinCells(4000, () => {
      updateFlights(userDeparture, userArrival);
    
      setTimeout(() => {
        alternateCells();
      }, 5000);
    });
  }, 4000);
}

spinCells(0, () => {
  updateFlights(departure, arrival);

  setTimeout(() => {
    alternateCells();
  }, 9000);
}

);

