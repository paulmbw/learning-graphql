import React, { Component } from 'react';

// use to bind apollo to react
import { graphql } from 'react-apollo';

import { queryBook } from '../../queries/queries';

import BookDetail from './BookDetail';

class BookDetails extends Component {
  render() {
    const { book } = this.props.data;

    return (
      <div id="book-details">
        {
          book ? <BookDetail book={book} /> : <div>No book selected!</div>
        }
      </div>
    );
  }
}

export default graphql(queryBook, {
  options: props => {
    return {
      variables: {
        // this will be used to invoke the queryBook query as it expects a parameter called ID
        id: props.bookId
      }
    }
  }
})(BookDetails);
