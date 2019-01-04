import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/Books/BookList';
import AddBook from './components/Books/AddBook';

/**
 * Setting up Apollo Client
 */
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

/**
 * @ApolloProvider
 * The ApolloProvider is similar to React’s context provider. 
 * It wraps your React app and places the client on the context, 
 * which allows you to access it from anywhere in your component tree. 
 * Data returned from the ApolloClient will be injected into the app below.
 */

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <div className="main">
          <h1>My Book Library</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
