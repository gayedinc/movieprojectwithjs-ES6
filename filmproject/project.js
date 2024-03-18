const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");


// Tüm eventleri yükleme
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);

    modalBtn.addEventListener("click", function () {
        modal.classList.add("open-modal");
    });
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("open-modal");
    });
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Hata
        UI.displayMessages("Fill in all fields.", "danger");

    }
    else {
        // Yeni Film Oluşturma
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); // Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // Storage 'a Film Ekleme
        UI.displayMessages("Movie added successfully.", "success");

    }

    UI.clearInputs(titleElement, urlElement, directorElement);

    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("The deletion was successful.", "success")
    }
}

function clearAllFilms() {

    if (confirm("Are you sure?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}