import React, { Component } from 'react';

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
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks.thumbnail
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          {
                            <select onChange={(e) => selectBookToAdd(e)}>
                              {shelfStates.map((shelf) => {
                                const selectedBookArray = [
                                  book.id,
                                  shelf.category,
                                ];
                                return (
                                  <option
                                    key={shelf.category}
                                    value={selectedBookArray}
                                  >
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
                    </div>
                  </li>
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
