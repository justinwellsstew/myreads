import React, { Component } from 'react';

class Shelf extends Component {
  render() {
    const {
      bookShelfCategory,
      books,
      selectBookToAdd,
      shelfStates,
    } = this.props;
    let shelfTitle = '';
    shelfTitle = (bookShelfCategory) => {
      if (bookShelfCategory === 'currentlyReading') {
        return (shelfTitle = 'Currently Reading');
      } else if (bookShelfCategory === 'wantToRead') {
        return (shelfTitle = 'Want to Read');
      } else {
        return (shelfTitle = 'Read');
      }
    };

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle(bookShelfCategory)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              if (book.shelf === bookShelfCategory) {
                const chosenbookRecord = book.id;

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
                                  chosenbookRecord,
                                  shelf.category,
                                ];
                                return (
                                  <option
                                    key={shelf.category}
                                    value={selectedBookArray}
                                  >
                                    {shelf.title}
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
