/**
 * File name: book.js (controller)
 * Author name: Jaeuk Kim
 * Student ID: 301145308
 * Web App Name: midterm-comp229-009-jaeuk
 */


// create a reference to the model
let Book = require('../models/book');

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function(req, res, next) {  
    Book.find((err, bookList) => {
        // console.log(bookList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {
                title: 'Book List', 
                books: bookList
            })            
        }
    });
}

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/details', {
                title: 'Book Details', 
                book: bookToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // Get the model data
    let book = Book();

    // Render the list page using book data
    res.render('book/add_edit', {
        title: 'Add a new Item',
        book: book
    })    

}

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {

    // A new book into the varialbe "new book" with data posted by users that are included in req.body
    let newBook = Book({
        _id: req.body.id,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre: req.body.Genre
    });
    

    // Mongoose Method for creating a new document
    Book.create(newBook, (err, Title) =>{ //? what is this title?
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list            
            console.log(Title);
            res.redirect('/book/list');
        }
    });

    

    

}

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;


    // Mongoose Method for fdinging(getting) a data by id
    Book.findById(id, (err, bookToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);            
        }
        else
        {
            //show the edit view
            res.render('book/add_edit', {
                title: 'Edit Details', 
                book: bookToShow
            })
        }
    });
    

}

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {
    
    // let id = req.params.id
    
    // Edited book into the varialbe "editedBook" with data posted by users that are included in req.body
    let editedBook = Book({
        _id: req.body.id,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
        Author: req.body.Author,
        Genre: req.body.Genre
    });
    

    // Mongoose Method to update a document
    Book.updateOne(editedBook, (err, Title) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            // console.log(Title);
            res.redirect('/book/list');
        }
    });
    
}

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
    
    // As the Mongoose document says remove() is deprecated 
    // I am using findByIdAndDelete() instead
    // reference: https://mongoosejs.com/docs/deprecations.html#remove

    let id = req.params.id

    // Book.remove(id, (err) => {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.end(err);            
    //     }
    //     else
    //     {
    //         // refresh the book list
    //         res.redirect('/book/list');
    //     }
    // });
    
    Book.findByIdAndDelete(id, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book/list');
        }
    });
}