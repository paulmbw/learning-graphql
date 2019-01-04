import React, { Component } from 'react';
import BookDetails from './BookDetails';

// use to bind apollo to react
import { graphql } from 'react-apollo';

import { queryBooks } from '../../queries/queries';

class BookList extends Component {

  state = {
    selected: null
  };

  render() {
    const data = this.props.data;
    let result;

    data.loading === true ? result = <div>Loading books</div> : result = data.books.map((book, index) => <li onClick={() => this.setState({ selected: book.id })} key={index}>{book.name}</li>);

    return (
      <div>
        <ul id="book-list">
          {result}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(queryBooks)(BookList);
