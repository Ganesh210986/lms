import { useState, useEffect } from 'react'

function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn_number: '',
    published_date: '',
    quantity: 1,
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn_number: book.isbn_number || '',
        published_date: book.published_date || '',
        quantity: book.quantity || 1,
      })
    }
  }, [book])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{book ? '✏️ Edit Book' : '➕ Add New Book'}</h2>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter book title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="isbn_number">ISBN Number *</label>
            <input
              type="text"
              id="isbn_number"
              name="isbn_number"
              value={formData.isbn_number}
              onChange={handleChange}
              required
              placeholder="Enter 13-digit ISBN"
              maxLength="13"
            />
          </div>

          <div className="form-group">
            <label htmlFor="published_date">Published Date *</label>
            <input
              type="date"
              id="published_date"
              name="published_date"
              value={formData.published_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter quantity"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookForm
