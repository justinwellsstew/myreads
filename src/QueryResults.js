import React, { Component } from 'react';

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
