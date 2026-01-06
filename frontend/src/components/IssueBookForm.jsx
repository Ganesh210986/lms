import { useState } from 'react'

function IssueBookForm({ books, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    book: '',
    user: '',
  })

  const availableBooks = books.filter(book => book.quantity > 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'book' || name === 'user' ? parseInt(value) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.book || !formData.user) {
      alert('Please fill in all fields')
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>📖 Issue Book</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="book">Select Book *</label>
            <select
              id="book"
              name="book"
              value={formData.book}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a book --</option>
              {availableBooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author} ({book.quantity} available)
                </option>
              ))}
            </select>
            {availableBooks.length === 0 && (
              <p className="form-hint error">No books available for issuing</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="user">User ID *</label>
            <input
              type="number"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter user ID"
            />
            <p className="form-hint">Enter the ID of the user borrowing the book</p>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={availableBooks.length === 0}
            >
              Issue Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IssueBookForm
