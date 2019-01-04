import React, { Component } from 'react';

// use to bind apollo to react
import { graphql, compose } from 'react-apollo';

import { queryAuthors, addBookMutation, queryBooks } from '../../queries/queries';

import AddAuthor from '../Author/AddAuthor';

class AddBook extends Component {

  state = {
    name: '',
    genre: '',
    authorId: ''
  };

  submitForm(event) {
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: queryBooks }]
    })
  }

  render() {
    const data = this.props.queryAuthors;
    let result;

    data.loading === true ? result = <option disabled>Loading authors...</option> : result = data.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>);

    return (
      <div>
        <form id="add-book" onSubmit={event => this.submitForm(event)}>
          <div className="field">
            <label>Book Name</label>
            <input type="text" onChange={event => this.setState({ name: event.target.value })} />
          </div>

          <div className="field">
            <label>Genre</label>
            <input type="text" onChange={event => this.setState({ genre: event.target.value })} />
          </div>

          <div className="field">
            <label>Author</label>
            <select type="text" onChange={event => this.setState({ authorId: event.target.value })}>
              <option>Select Author</option>
              {result}
            </select>
          </div>

          <button>+</button>
        </form>
        <p>Author not on the list? Just add a new one here!</p>
        <AddAuthor />
      </div>
    );
  }
}

export default compose(
  graphql(queryAuthors, { name: "queryAuthors" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);