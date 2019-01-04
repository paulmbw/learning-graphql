import { gql } from 'apollo-boost'

const queryBooks = gql`
{
  books {
    id
    name, 
    genre
    author {
      name
    }
  }
}`;

const queryAuthors = gql`
{
  authors {
    name, 
    id
  }
}`;


const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId:$authorId) {
      name
      id
    },
  }`;

const addAuthorMutation = gql`
  mutation($name: String!, $age: Number!, $location: String!) {
    addAuthor(name: $name, age: $age, location:$location) {
      name
      id
    },
  }`;

const queryBook = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        location
        books{
          name
          genre
          id
        }
      }
    }
  }`;

export {
  queryAuthors,
  queryBooks,
  addBookMutation,
  queryBook,
  addAuthorMutation
}