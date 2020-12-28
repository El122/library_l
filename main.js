const library = document.getElementById("library");
const newBookForm = document.getElementById("newBookForm");
const newBookFormWrap = document.getElementsByClassName("bookForm-wrapper")[0];
const showFormButt = document.getElementsByClassName("showForm")[0];
const addBookToLibraryButt = document.getElementsByClassName("addBookToLibrary")[0];
const closeButt = document.getElementsByClassName("closeButt")[0];
const errorMessage = document.getElementsByClassName("error")[0];

let myLibrary = []; //хранит книги пользователя
let formVisible = false; // показывает видна ли форма для добавления книг
let bookId;
let bookCard;

// LOCAL STORAGE

document.addEventListener("DOMContentLoaded", () => {
    let storageData = localStorage.getItem("library");
    if (storageData != null) {
        myLibrary = JSON.parse(storageData);
    }
    bookId = myLibrary.length;
    renderLibrary();
});

function updateLocalStorage() {
    let jsonLibrary = JSON.stringify(myLibrary);
    localStorage.setItem("library", jsonLibrary);
    localStorage.setItem("bookId", bookId);
}

// LIBRARY

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = bookId;
    }
}

info = function (book, bookInfo) {
    return book[bookInfo];
}

function renderLibrary() {
    library.innerHTML = "";
    renderBook();
    updateLocalStorage();
}

function createDelButt(book) {
    let delButt = document.createElement("button");
    delButt.classList.add("closeButt");
    delButt.alt = book.id;
    delButt.onclick = () => {
        myLibrary.forEach((book, index, object) => {
            if (book.id == delButt.alt) {
                object.splice(index, 1);

                renderLibrary();
            }
        });
    }
    delButt = bookCard.appendChild(delButt);

    return delButt
}

function createChangeReadButt(book) {
    let changeReadBut = document.createElement("button");
    changeReadBut.classList.add("readBook");
    changeReadBut.alt = book.id;
    changeReadBut.onclick = () => {
        myLibrary.forEach(book => {
            if (book.id == changeReadBut.alt) {
                book.read = !book.read;

                renderLibrary();
            }
        });
    }

    return changeReadBut;
}

function createCardTitile() {
    let cardTitle = document.createElement("div");
    cardTitle.classList.add("cardTitle");

    return cardTitle;
}

function createCardInfo() {
    let cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo");

    return cardInfo;
}

function createBookCard(book) {
    bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    let cardTitle = createCardTitile();
    let cardInfo = createCardInfo();
    let delButt = createDelButt(book);
    let changeReadButt = createChangeReadButt(book);

    bookCard = library.appendChild(bookCard);
    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardInfo);
    bookCard.appendChild(changeReadButt);

    let changeImg = document.createElement("img");
    changeImg.src = "img/exchange.svg"

    cardTitle.innerHTML = info(book, "title");
    cardTitle.appendChild(delButt);
    cardInfo.innerHTML = "Author: " + info(book, "author") + "\nPages: " + info(book, "pages");
    changeReadButt.innerHTML = (info(book, "read") == true) ? "Read" : "Not Read";
    changeReadButt.appendChild(changeImg);
}

function renderBook() {
    myLibrary.forEach(book => {
        createBookCard(book);
    });
}

addBookToLibraryButt.onclick = (e) => {
    let title = document.getElementsByName("title")[0].value;
    let author = document.getElementsByName("author")[0].value;
    let pages = document.getElementsByName("pages")[0].value;
    let read = document.getElementsByName("read")[0].value;

    if(read == "true") read = true 
    else read = false;
    
    if (title == "" || author == "" || pages == "") {
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        myLibrary.unshift(new Book(title, author, pages, read));
        ++bookId;

        newBookForm.style.display = "none";
        formVisible = false;
        renderLibrary();
        e.stopPropagation();
    }
}

// MODAL WINDOW

showFormButt.onclick = () => {
    newBookForm.style.display = "flex";
    formVisible = true;
}

closeButt.onclick = function (e) {
    newBookForm.style.display = "none";
    formVisible = false;
    errorMessage.style.display = "none";
    e.stopPropagation();
}

newBookForm.onclick = function (e) {
    newBookForm.style.display = "none";
    formVisible = false;
    errorMessage.style.display = "none";
    e.stopPropagation();
}

newBookFormWrap.onclick = function (e) {
    newBookForm.style.display = "flex";
    formVisible = true;
    e.stopPropagation();
}