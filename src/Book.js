import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { book, selectBookToAdd, shelfStates, shelfTitle } = this.props;

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            />
            <div className="book-shelf-changer">
              {
                <select
                  value={{ value: book.shelf }}
                  onChange={(e) => selectBookToAdd(e)}
                >
                  {shelfStates.map((shelf) => {
                    const selectedBookArray = [book.id, shelf.category];
                    return (
                      <option key={shelf.category} value={selectedBookArray}>
                        {shelfTitle(shelf.category)}
                      </option>
                    );
                  })}
                </select>
              }
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors.map((author) => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))}
          {book.shelf ? (
            <div className="shelf-title"> shelf: {shelfTitle(book.shelf)}</div>
          ) : (
            <div className="shelf-title">shelfunshelved</div>
          )}
        </div>
      </li>
    );
  }
}

export default Book;
