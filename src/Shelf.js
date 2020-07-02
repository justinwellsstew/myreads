import React, { Component } from 'react';

class Shelf extends Component {
  render() {
    const { bookShelfCategory, books } = this.props;
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
          {books.map((book) => (
            <div>{book.title}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Shelf;
