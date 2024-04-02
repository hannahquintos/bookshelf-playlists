//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const googleBooks = require("./modules/googleBooks/api");
const spotify = require("./modules/spotify/api");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//setup public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//PAGE ROUTES
app.get("/", async (request, response) => {
  response.render("index", { title: "Home" });
});

//search form processing path
app.post("/search-results", async (request, response) => {
  //retrieve search value from submitted POST form
  let search = request.body.search;
  let booksList = await googleBooks.getBooks(search);
  //console.log("book list: ", booksList);
  //response.redirect("/");
  response.render("index", { title: "Search Results", books: booksList, search: search });
});

//route to single book page
app.get('/book/:bookId', async (request, response) => {
    //retrieve book id
    const bookId = request.params.bookId;
    const book = await googleBooks.getSingleBook(bookId);

    //get category of the selected book
    //since a book can have many categories, choose the first category
    const category = book.volumeInfo.categories[0];

    //get playlists that match the categories of the selected book
    const accessToken = await spotify.authenticateSpotify();
    const playlists = await spotify.getPlaylists(accessToken, category);

    //console.log("category: ", category);
    //console.log("book details: ", book);


    response.render("book", { title: "Book", book: book, playlists: playlists});
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});