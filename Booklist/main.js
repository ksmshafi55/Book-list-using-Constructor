// BOOK CONSTRUCTOR
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI CONSTRUCTOR

function UI(){}
    UI.prototype.addBookToList = function(book){
        const booklist = document.getElementById('book-list')

        const row = document.createElement('tr');
        row.innerHTML = `<td> ${book.title}</td>
                         <td> ${book.author}</td>
                         <td> ${book.isbn}</td>
                         <td> <a href='#' class= 'delete'>X</a></td>`;
            booklist.appendChild(row);
    };

    UI.prototype.clearFields = function() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }


    UI.prototype.showAlert = function(message, className){

        //creating new div element
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        //placing the div so need parent element
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');

        //placing the div between the container and form

        container.insertBefore(div,form);

        //remove alert after 1 second

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }

    UI.prototype.deleteBookFromList = function(target){
        if(target.className='delete'){
            target.parentElement.parentElement.remove();
        }
    }

//EVENT LISTENERS

document.getElementById('book-form').addEventListener('submit', addBook);

function addBook(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title === '' || author === '' || isbn === ''){
        ui.showAlert("Please fill in all fields",'error');
    }else{
    ui.addBookToList(book);
    ui.clearFields(book);
    ui.showAlert("Book Added",'success');
    }
}

//delete book

document.getElementById("book-list").addEventListener('click', deleteBook)

function deleteBook(e){

    const ui = new UI();
    ui.deleteBookFromList(e.target);
    ui.showAlert("Book removed", 'error')
    e.preventDefault();
}