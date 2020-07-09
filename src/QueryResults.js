import React, { Component } from 'react';
import Book from './Book';

class QueryResults extends Component {
  render() {
    const {
      queryResults,
      selectBookToAdd,
      shelfStates,
      shelfTitle,
    } = this.props;

    return (
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {typeof queryResults !== 'undefined' && queryResults.length > 0 ? (
              queryResults.map((book) => {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    selectBookToAdd={selectBookToAdd}
                    shelfStates={shelfStates}
                    shelfTitle={shelfTitle}
                  />
                );
              })
            ) : (
              <p> no results </p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default QueryResults;
