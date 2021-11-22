function Storage() {}

Storage.prototype.getMovieFromStorage = () => {
  for (let i = 0; i < movies.options.length; i++) {
    let filmSelected = movies.options[i].innerText.split("(")[0];
    const selectedSeatsFromStorage = JSON.parse(
      localStorage.getItem(`${filmSelected}`)
    );
    if (
      selectedSeatsFromStorage !== null &&
      selectedSeatsFromStorage.length > 0
    ) {
      seatsNotOccupied.forEach((seat, index) => {
        if (selectedSeatsFromStorage.indexOf(index) > -1) {
          seat.classList.add(`selected${i}`);
          if (i == 0) seat.style.backgroundColor = "#6feaf6";
        }
      });
    }
    arr[i] = movies.options[i].value * selectedSeatsFromStorage.length;
  }
};

Storage.prototype.addMovieToStorage = () => {
  let seatsSelected = document.querySelectorAll(
    `.row .seat.selected${movies.selectedIndex}`
  );

  const seatsIndexArray = [...seatsSelected].map((seat) =>
    [...seatsNotOccupied].indexOf(seat)
  );
  let filmSelected =
    movies.options[movies.selectedIndex].innerText.split("(")[0];
  localStorage.setItem(`${filmSelected}`, JSON.stringify(seatsIndexArray));
};
