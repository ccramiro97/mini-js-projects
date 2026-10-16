const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const selectedMovieIndex = +localStorage.getItem("selectedMovieIndex");
    const selectedMovieTicketPrice = +localStorage.getItem("selectedMovieValue");

    if (selectedSeats && selectedSeats.length) {
        selectedSeats.forEach(index => {
            seats[index].classList.add("selected");
        });
    }

    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = selectedMovieTicketPrice;
}

function saveSelectedMovie(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMovieValue", moviePrice);
}

function saveSelectedSeats(selectedSeats) {
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

function updatePricingInfo() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener("change", evt => {
    ticketPrice = +evt.target.value;
    updatePricingInfo();
    saveSelectedMovie(evt.target.selectedIndex, evt.target.value);
});

container.addEventListener("click", evt => {
    if (evt.target.classList.contains("seat") && !evt.target.classList.contains("occupied")) {
        evt.target.classList.toggle("selected");
        updatePricingInfo();
        saveSelectedSeats(document.querySelectorAll(".row .seat.selected"));
    }
});

populateUI();
updatePricingInfo();