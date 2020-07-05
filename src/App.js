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
    selectedBookToUpdate: {},

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  handleSearchSubmit = (e) => {
    const query = e.target.value;
    BooksAPI.search(query).then((queryResults) => {
      this.setState(() => ({ queryResults }));
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
    ).then(
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books,
        }));
      })
    );
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
                render={({ history }) => (
                  <Shelf
                    shelfStates={shelfStates}
                    selectBookToAdd={(e) => {
                      this.selectBookToAdd(e);
                      history.push('/');
                    }}
                    bookShelfCategory={'currentlyReading'}
                    books={this.state.books}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={({ history }) => (
                  <Shelf
                    shelfStates={shelfStates}
                    selectBookToAdd={(e) => {
                      this.selectBookToAdd(e);
                      history.push('/');
                    }}
                    bookShelfCategory={'wantToRead'}
                    books={this.state.books}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={({ history }) => (
                  <Shelf
                    shelfStates={shelfStates}
                    selectBookToAdd={(e) => {
                      this.selectBookToAdd(e);
                      history.push('/');
                    }}
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
