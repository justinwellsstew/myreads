import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';

class Search extends Component {
  render() {
    const { handleSearchSubmit } = this.props;
    return (
      <div>
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close the search</button>
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="1000" handler="onChange">
              <input
                type="text"
                onChange={(e) => handleSearchSubmit(e)}
                placeholder="Search by title or author"
              />
            </Debounce>
            {console.log(this.state)}
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default Search;
