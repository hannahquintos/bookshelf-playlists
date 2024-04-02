//base URL for Google Books API requests
const googleBooksURL = `https://www.googleapis.com/books/v1/volumes`;

//get list of books that match a given search key
async function getBooks(searchKey) {
    //limit results to only give 12
    const reqUrl = `${googleBooksURL}?q=${searchKey}&maxResults=12&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    let response = await fetch(reqUrl, options);

    const data = await response.json();

    return data.items;
}

//get a single book by its id
async function getSingleBook(bookId){
    const reqUrl = `${googleBooksURL}/${bookId}?key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      };
  
      let response = await fetch(reqUrl, options);

      const data = await response.json();

      return data;
}

module.exports = {
    getBooks,
    getSingleBook
}