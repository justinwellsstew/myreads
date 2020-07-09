import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
  render() {
    const {
      bookShelfCategory,
      books,
      selectBookToAdd,
      shelfStates,
      shelfTitle,
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle(bookShelfCategory)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              if (book.shelf === bookShelfCategory) {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    selectBookToAdd={selectBookToAdd}
                    shelfStates={shelfStates}
                    shelfTitle={shelfTitle}
                  />
                );
              }
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
