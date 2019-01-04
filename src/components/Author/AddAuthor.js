import React, { Component } from 'react';

// use to bind apollo to react
import { graphql, compose } from 'react-apollo';

import { addAuthorMutation, queryAuthors } from '../../queries/queries';

class AddAuthor extends Component {

  state = {
    name: '',
    age: '',
    location: ''
  };

  submitForm(event) {
    event.preventDefault();
    this.props.addAuthorMutation({
      variables: {
        name: this.state.name,
        age: this.state.age,
        location: this.state.location,
      },
      refetchQueries: [{ query: queryAuthors }]
    });
  }

  render() {
    const data = this.props.queryAuthors;
    let result;

    // data.loading === true ? result = <option disabled>Loading authors...</option> : result = data.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>);

    return (
      <form id="add-author" onSubmit={event => this.submitForm(event)}>
        <div className="field">
          <label>Author Name</label>
          <input type="text" onChange={event => this.setState({ name: event.target.value })} />
        </div>

        <div className="field">
          <label>Author Age</label>
          <input type="text" onChange={event => this.setState({ age: event.target.value })} />
        </div>

        <div className="field">
          <label>Author Location</label>
          <input type="text" onChange={event => this.setState({ location: event.target.value })} />
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(addAuthorMutation, { name: "addAuthorMutation" }),
)(AddAuthor);