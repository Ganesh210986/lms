function IssuedBooksList({ issuedBooks, books, onReturn }) {
  const getBookDetails = (bookId) => {
    return books.find(book => book.id === bookId)
  }

  const activeIssues = issuedBooks.filter(issue => !issue.return_date)
  const returnedIssues = issuedBooks.filter(issue => issue.return_date)

  if (issuedBooks.length === 0) {
    return <div className="no-books">No books have been issued yet.</div>
  }

  const renderIssueCard = (issue) => {
    const book = getBookDetails(issue.book)
    const issueDate = new Date(issue.issue_date).toLocaleDateString()
    const returnDate = issue.return_date ? new Date(issue.return_date).toLocaleDateString() : null

    return (
      <div key={issue.id} className={`issue-card ${issue.return_date ? 'returned' : ''}`}>
        <div className="issue-header">
          <h3>{book ? book.title : `Book ID: ${issue.book}`}</h3>
          {issue.return_date ? (
            <span className="status-badge returned">Returned</span>
          ) : (
            <span className="status-badge active">Active</span>
          )}
        </div>
        <div className="issue-details">
          {book && (
            <>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>ISBN:</strong> {book.isbn_number}</p>
            </>
          )}
          <p><strong>User ID:</strong> {issue.user}</p>
          <p><strong>Issue Date:</strong> {issueDate}</p>
          {returnDate && (
            <p><strong>Return Date:</strong> {returnDate}</p>
          )}
        </div>
        {!issue.return_date && (
          <div className="issue-actions">
            <button onClick={() => onReturn(issue.id)} className="btn btn-return">
              ✓ Mark as Returned
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="issued-books-list">
      {activeIssues.length > 0 && (
        <div className="issues-section">
          <h2>Active Issues ({activeIssues.length})</h2>
          <div className="issues-grid">
            {activeIssues.map(renderIssueCard)}
          </div>
        </div>
      )}

      {returnedIssues.length > 0 && (
        <div className="issues-section">
          <h2>Returned Books ({returnedIssues.length})</h2>
          <div className="issues-grid">
            {returnedIssues.map(renderIssueCard)}
          </div>
        </div>
      )}
    </div>
  )
}

export default IssuedBooksList
