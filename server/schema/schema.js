const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');

// defining the scehma for the Book object
const BookType = new GraphQLObjectType({
  name: 'Book',
  /**
   * Pauses execution until all fields have been declared and stored in memory
   * When two types need to refer to each other, or a type needs to refer to itself in a field,
   * you can use a function expression (aka a closure or a thunk) to supply the fields lazily.
   */
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      // retrieving nested objects
      type: AuthorType,
      resolve(parent, args) {
        // parent object is the original book, so use the parent.authorId to retrieve the author
        return Author.findById(parent.authorId);
      }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    age: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // parent.id becuase the parent is the original author, so find the books with 
        // the parent.id
        return Book.find({ authorId: parent.id });
      }
    }
  }),
});

// entry point
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        location: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
          location: args.location,
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });

        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});