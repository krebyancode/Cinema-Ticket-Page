let movies = document.querySelector("#movie");
let seatsTotal = document.querySelectorAll(".row .seat");
let seatsNotOccupied = document.querySelectorAll(".row .seat:not(.occupied)");
let seatsOccupied = document.querySelectorAll(".row .seat.occupied");

let count = document.getElementById("count");
let film = document.getElementById("film");
let total = document.getElementById("total");
let sum = document.getElementById("sum");

let storage = new Storage();
let totalAmount = 0;
let arr = [];

window.addEventListener("load", () => {
  displayUI();
  let price = movies.options[movies.selectedIndex].value;
  updateInfo(price);
});

const displayUI = () => {
  storage.getMovieFromStorage();
};

const updateInfo = (ticketPrice) => {
  storage.addMovieToStorage();
  let seatsSelected = document.querySelectorAll(
    `.row .seat.selected${movies.selectedIndex}`
  );
  count.innerText = seatsSelected.length;
  film.innerText = movies.options[movies.selectedIndex].innerText.split("(")[0];
  let amount = ticketPrice * seatsSelected.length;
  total.innerText = amount;
  totalSum(amount, movies.selectedIndex);
};

const totalSum = (money, index) => {
  arr[index] = money;
  totalAmount = arr.reduce((a, b) => a + b);
  sum.innerText = totalAmount;
};

movies.addEventListener("change", (e) => {
  seatsNotOccupied.forEach((seat) => {
    seat.style.backgroundColor = "#444451";
  });
  let seatsSelected = document.querySelectorAll(
    `.row .seat.selected${movies.selectedIndex}`
  );
  seatsSelected.forEach((seat) => {
    seat.style.backgroundColor = "#6feaf6";
  });
  let price = e.target.options[movies.selectedIndex].value;

  updateInfo(price);
});

seatsNotOccupied.forEach((seat) => {
  seat.addEventListener("click", (e) => {
    if (!e.target.classList.contains("occupied")) {
      e.target.classList.toggle(`selected${movies.selectedIndex}`);
      let price = movies.options[movies.selectedIndex].value;
      updateInfo(price);
      if (e.target.classList.contains(`selected${movies.selectedIndex}`)) {
        e.target.style.backgroundColor = "#6feaf6";
      } else {
        e.target.style.backgroundColor = "#444451";
      }
    }
  });
});
