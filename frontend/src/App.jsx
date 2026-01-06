import { useState, useEffect } from 'react'
import './App.css'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import IssuedBooksList from './components/IssuedBooksList'
import IssueBookForm from './components/IssueBookForm'

function App() {
  const [books, setBooks] = useState([])
  const [issuedBooks, setIssuedBooks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBookForm, setShowBookForm] = useState(false)
  const [showIssueForm, setShowIssueForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [activeTab, setActiveTab] = useState('books')

  const API_URL = 'http://localhost:8000/api'

  useEffect(() => {
    fetchBooks()
    fetchIssuedBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books/`)
      const data = await response.json()
      setBooks(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching books:', error)
      setLoading(false)
    }
  }

  const fetchIssuedBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/issues/`)
      const data = await response.json()
      setIssuedBooks(data)
    } catch (error) {
      console.error('Error fetching issued books:', error)
    }
  }

  const handleAddBook = () => {
    setEditingBook(null)
    setShowBookForm(true)
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
    setShowBookForm(true)
  }

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await fetch(`${API_URL}/books/${id}/`, {
          method: 'DELETE',
        })
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
        alert('Failed to delete book')
      }
    }
  }

  const handleBookFormSubmit = async (bookData) => {
    try {
      const url = editingBook
        ? `${API_URL}/books/${editingBook.id}/`
        : `${API_URL}/books/`
      
      const method = editingBook ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })

      if (response.ok) {
        fetchBooks()
        setShowBookForm(false)
        setEditingBook(null)
      } else {
        const error = await response.json()
        alert('Error: ' + JSON.stringify(error))
      }
    } catch (error) {
      console.error('Error saving book:', error)
      alert('Failed to save book')
    }
  }

  const handleIssueBook = async (issueData) => {
    try {
      const response = await fetch(`${API_URL}/issues/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
      })

      if (response.ok) {
        fetchIssuedBooks()
        fetchBooks()
        setShowIssueForm(false)
      } else {
        const error = await response.json()
        alert('Error: ' + JSON.stringify(error))
      }
    } catch (error) {
      console.error('Error issuing book:', error)
      alert('Failed to issue book')
    }
  }

  const handleReturnBook = async (id) => {
    if (window.confirm('Mark this book as returned?')) {
      try {
        const response = await fetch(`${API_URL}/issues/${id}/return/`, {
          method: 'PATCH',
        })

        if (response.ok) {
          fetchIssuedBooks()
          fetchBooks()
        } else {
          const error = await response.json()
          alert('Error: ' + JSON.stringify(error))
        }
      } catch (error) {
        console.error('Error returning book:', error)
        alert('Failed to return book')
      }
    }
  }

  const handleFormCancel = () => {
    setShowBookForm(false)
    setShowIssueForm(false)
    setEditingBook(null)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Library Management System</h1>
        <div className="header-actions">
          {activeTab === 'books' && (
            <button onClick={handleAddBook} className="btn btn-primary">
              + Add New Book
            </button>
          )}
          {activeTab === 'issued' && (
            <button onClick={() => setShowIssueForm(true)} className="btn btn-primary">
              + Issue Book
            </button>
          )}
        </div>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Books ({books.length})
        </button>
        <button 
          className={`tab ${activeTab === 'issued' ? 'active' : ''}`}
          onClick={() => setActiveTab('issued')}
        >
          Issued Books ({issuedBooks.filter(ib => !ib.return_date).length})
        </button>
      </div>

      {showBookForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleBookFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {showIssueForm && (
        <IssueBookForm
          books={books}
          onSubmit={handleIssueBook}
          onCancel={handleFormCancel}
        />
      )}

      <main className="main-content">
        {activeTab === 'books' && (
          <BookList
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />
        )}

        {activeTab === 'issued' && (
          <IssuedBooksList
            issuedBooks={issuedBooks}
            books={books}
            onReturn={handleReturnBook}
          />
        )}
      </main>
    </div>
  )
}

export default App
