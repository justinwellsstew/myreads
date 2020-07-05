import React from 'react';
import Shelf from './Shelf';
import Search from './Search';
import QueryResults from './QueryResults';
import * as BooksAPI from './BooksAPI';
import { Link, Route } from 'react-router-dom';
import './App.css';

const shelfStates = [
  { category: '', title: 'select' },
  { category: 'None', title: 'none' },
  { category: 'wantToRead', title: 'What to Read' },
  { category: 'currentlyReading', title: 'Currently Reading' },
  { category: 'read', title: 'Read' },
];

class BooksApp extends React.Component {
  state = {
    books: [],
    queryResults: [],
  };

  componentDidMount() {
    this.getAllBooks();
  }

  handleSearchSubmit = (e) => {
    const query = e.target.value;
    BooksAPI.search(query).then((queryResults) => {
      this.setState(() => ({ queryResults }));
    });
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
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
    ).then(this.getAllBooks());
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
