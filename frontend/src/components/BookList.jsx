function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <div className="no-books">No books available. Add your first book!</div>
  }

  return (
    <div className="book-list">
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-header">
              <h3>{book.title}</h3>
              <span className="quantity-badge">
                {book.quantity} {book.quantity === 1 ? 'copy' : 'copies'}
              </span>
            </div>
            <div className="book-details">
              <p className="author">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="isbn">
                <strong>ISBN:</strong> {book.isbn_number}
              </p>
              <p className="published">
                <strong>Published:</strong> {new Date(book.published_date).toLocaleDateString()}
              </p>
            </div>
            <div className="book-actions">
              <button onClick={() => onEdit(book)} className="btn btn-edit">
                ✏️ Edit
              </button>
              <button onClick={() => onDelete(book.id)} className="btn btn-delete">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList
