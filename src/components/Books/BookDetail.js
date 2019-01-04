import React from 'react';

const BookDetail = ({ book }) => {
  return (
    <div>
      <h2>{book.name}</h2>
      <h2>{book.genre}</h2>
      <h2>{book.author.name}</h2>
      <p>All books by this author</p>
      <ul id="other-books">
        {
          book.author.books.map(book => <li key={book.id}>{book.name} - {book.genre}</li>)
        }
      </ul>
    </div>
  )
};

export default BookDetail;