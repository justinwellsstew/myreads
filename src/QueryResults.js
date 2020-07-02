import React, { Component } from 'react';

class QueryResults extends Component {
  render() {
    const { queryResults, selectBookToAdd } = this.props;
    return (
      <div>
        <ul>
          {typeof queryResults !== 'undefined' && queryResults.length > 0 ? (
            queryResults.map((bookRecord) => (
              <button
                key={bookRecord.id}
                href="#"
                onClick={(e) => selectBookToAdd(e)}
                value={bookRecord.id}
              >
                {' '}
                {bookRecord.title}
              </button>
            ))
          ) : (
            <p>no results</p>
          )}
        </ul>
      </div>
    );
  }
}

export default QueryResults;
