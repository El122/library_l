const library = document.getElementById("library");
const newBookForm = document.getElementById("newBookForm");
const showFormButt = document.getElementsByClassName("showForm")[0];
const addBookToLibraryButt = document.getElementsByClassName("addBookToLibrary")[0];

let myLibrary = []; //хранит книги пользователя
let formVisible = false; // показывает видна ли форма для добавления книг
let delButt_arr = [1];
let bookId = 0;

class Book {
    constructor(title = "Not", author = "Not", pages = 0, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = bookId;
    }
}

Book.prototype.info = function() {
    if (this.read) read = "readed";
    else read = "not read yet";

    return (`${this.title}
            Author: ${this.author}
            Pages: ${this.pages} 
            Read: ${read}`);
}

function renderLibrary() {
    myLibrary.forEach(book => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard = library.appendChild(bookCard);
        bookCard.innerText = book.info();

        let delButt = document.createElement("button");
        delButt.classList.add("delBook");
        delButt.alt = book.id;
        delButt.onclick = () => {
            myLibrary.forEach((book, index, object) => {
                if (book.id == delButt.alt) {
                    object.splice(index, 1);
                    library.innerHTML = "";
                    renderLibrary();
                }
            });
        }
        delButt = bookCard.appendChild(delButt);
        delButt.innerHTML = "Delete";

        delButt_arr = document.getElementsByClassName("delBook");
    })
}

showFormButt.onclick = () => {
    if (!formVisible) {
        newBookForm.style.display = "block";
        formVisible = true;
    } else {
        newBookForm.style.display = "none";
        formVisible = false;
    }
}

addBookToLibraryButt.onclick = () => {
    let title = document.getElementsByName("title")[0].value;
    let author = document.getElementsByName("author")[0].value;
    let pages = document.getElementsByName("pages")[0].value;
    let read = document.getElementsByName("read")[0].value;

    myLibrary.unshift(new Book(title, author, pages, read));
    ++bookId;

    library.innerHTML = "";
    renderLibrary();
}