import React, { Component } from 'react';

class QueryResults extends Component {
  render() {
    const { queryResults, selectBookToAdd, shelfStates } = this.props;
    return (
      <div>
        <ul>
          {typeof queryResults !== 'undefined' && queryResults.length > 0 ? (
            queryResults.map((bookRecord) => {
              const chosenbookRecord = bookRecord.id;
              const shelfStates = ['wantToRead', 'currentlyReading', 'read'];
              return (
                <li key={bookRecord.id}>
                  <span>{bookRecord.title}</span>
                  {
                    <select onChange={(e) => selectBookToAdd(e)}>
                      {shelfStates.map((shelf) => {
                        const selectedBookArray = [chosenbookRecord, shelf];
                        return (
                          <option key={shelf} value={selectedBookArray}>
                            {shelf}
                          </option>
                        );
                      })}
                    </select>
                  }
                </li>
              );
            })
          ) : (
            <p>no results</p>
          )}
        </ul>
      </div>
    );
  }
}

export default QueryResults;
