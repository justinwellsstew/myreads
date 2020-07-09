import React from 'react';
import Shelf from './Shelf';
import Search from './Search';
import QueryResults from './QueryResults';
import * as BooksAPI from './BooksAPI';
import { Link, Route } from 'react-router-dom';
import './App.css';

const shelfStates = [
  { category: '', title: 'select' },
  { category: 'none', title: 'None' },
  { category: 'wantToRead', title: 'What to Read' },
  { category: 'currentlyReading', title: 'Currently Reading' },
  { category: 'read', title: 'Read' },
];

class BooksApp extends React.Component {
  state = {
    books: [],
    queryResults: [],
    filteredBooksAndId: [],
  };

  componentDidMount() {
    this.getAllBooks();
  }

  //Take search and query API.  Filter results that don't contain and image or author and then update the query state

  handleSearchSubmit = (e) => {
    const query = e.target.value;
    if (typeof query !== 'undefined') {
      BooksAPI.search(query)
        .then((queryResults) => {
          let filteredQuery = [];
          if (typeof queryResults !== 'undefined' && queryResults.length > 0) {
            filteredQuery = queryResults.filter((f) => {
              return f.authors && f.imageLinks;
            });
          }
          console.log('booksWithId;', this.addShelfToQueryBooks(filteredQuery));
          this.setState(() => ({ queryResults: filteredQuery }));
        })
        .catch((err) => alert(err));
    }
  };

  // * not working *
  // async handleSearchSubmit(e) {
  //   //get value from searchbox
  //   const query = e.target.value;
  //   //read JSON
  //   let queryResults = await BooksAPI.search(query);
  //   let filteredResults = queryResults.filter((f) => {
  //     return f.authors && f.imageLinks;
  //   });
  //   this.setState({ queryResults: filteredResults });
  // }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
      this.booksShelfAndId(books);
    });
  };

  booksShelfAndId = (books) => {
    let filteredArray = [];
    books.map((book) => {
      let newObj = {};
      newObj.id = book.id;
      newObj.shelf = book.shelf;
      filteredArray.push(newObj);
    });
    this.setState({ filteredBooksAndId: filteredArray });
  };

  addShelfToQueryBooks = (queryBooks) => {
    let queryBooksWithShelf = queryBooks;
    this.state.books.map((book) => {
      queryBooks.find((qbook, i) => {
        if (qbook.id === book.id) {
          queryBooksWithShelf[i].shelf = book.shelf;
          return true;
        } else {
          queryBooksWithShelf[i].shelf = 'none';
        }
      });
    });
    return queryBooksWithShelf;
  };

  selectBookToAdd = (e) => {
    e.preventDefault();
    const bookId = e.target.value;
    console.log('bookId', bookId);
    const splitBookId = bookId.split(',');
    const splitBookIdToSubmitToApi = splitBookId[0];
    const splitShelfToSubmitToApi = splitBookId[1];
    BooksAPI.update(
      { id: splitBookIdToSubmitToApi },
      splitShelfToSubmitToApi
    ).then(this.getAllBooks, this.setState({ queryResults: [] }));
  };

  shelfTitle = (bookShelfCategory) => {
    if (bookShelfCategory === 'currentlyReading') {
      return 'Currently Reading';
    } else if (bookShelfCategory === 'wantToRead') {
      return 'Want to Read';
    } else if (bookShelfCategory === 'read') {
      return 'Read';
    } else if (bookShelfCategory === 'none') {
      return 'None';
    } else {
      return 'Select';
    }
  };

  render() {
    return (
      <div className="app">
        <div>
          <Route
            path="/search"
            render={() => (
              <Search
                handleSearchSubmit={this.handleSearchSubmit}
                contacts={this.state.contacts}
              />
            )}
          />

          <Route
            exact
            path="/search"
            render={({ history }) => (
              <QueryResults
                shelfTitle={this.shelfTitle}
                shelfStates={shelfStates}
                selectBookToAdd={(e) => {
                  this.selectBookToAdd(e);
                  history.push('/');
                }}
                queryResults={this.state.queryResults}
              />
            )}
          />
        </div>

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Route
                exact
                path="/"
                render={() => (
                  <Shelf
                    shelfTitle={this.shelfTitle}
                    shelfStates={shelfStates}
                    selectBookToAdd={this.selectBookToAdd}
                    bookShelfCategory={'currentlyReading'}
                    books={this.state.books}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={() => (
                  <Shelf
                    shelfTitle={this.shelfTitle}
                    shelfStates={shelfStates}
                    selectBookToAdd={this.selectBookToAdd}
                    bookShelfCategory={'wantToRead'}
                    books={this.state.books}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={() => (
                  <Shelf
                    shelfTitle={this.shelfTitle}
                    shelfStates={shelfStates}
                    selectBookToAdd={this.selectBookToAdd}
                    bookShelfCategory={'read'}
                    books={this.state.books}
                  />
                )}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Search</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
