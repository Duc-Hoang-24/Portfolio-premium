import { useState, useEffect } from 'react'
import { useAuth } from '../src/context/AuthContext.jsx'

const API_URL = 'http://localhost:3000/api/qualifications'

const Education = () => {
  const { auth, isAdmin } = useAuth()
  const [qualifications, setQualifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    title: '', firstname: '', lastname: '', email: '', completion: '', description: ''
  })

  const fetchQualifications = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setQualifications(data)
    } catch (err) {
      setError('Could not load qualifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQualifications()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm({ title: '', firstname: '', lastname: '', email: '', completion: '', description: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      resetForm()
      fetchQualifications()
    } catch (err) {
      setError('Server error')
    }
  }

  const handleEdit = (q) => {
    setForm({
      title: q.title || '',
      firstname: q.firstname || '',
      lastname: q.lastname || '',
      email: q.email || '',
      completion: q.completion ? q.completion.substring(0, 10) : '',
      description: q.description || ''
    })
    setEditingId(q._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this qualification?')) return
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` }
      })
      fetchQualifications()
    } catch (err) {
      setError('Could not delete qualification')
    }
  }

  return (
    <div className="page-section active-education">
      <h2>Education & Qualifications</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isAdmin && (
        <button onClick={() => { resetForm(); setShowForm(!showForm) }} style={{ marginBottom: '1rem' }}>
          {showForm ? 'Cancel' : '+ Add New Qualification'}
        </button>
      )}

      {isAdmin && showForm && (
        <form onSubmit={handleSubmit} className="qualification-form" style={{ marginBottom: '2rem' }}>
          <input name="title" placeholder="Title (e.g. Diploma in Computer Programming)" value={form.title} onChange={handleChange} required />
          <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required />
          <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="completion" type="date" value={form.completion} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        </form>
      )}

      {loading ? (
        <p>Loading qualifications...</p>
      ) : (
        <div className="qualifications-grid">
          {qualifications.map((q) => (
            <div key={q._id} className="qualification-card">
              <h3>{q.title}</h3>
              <p><strong>By:</strong> {q.firstname} {q.lastname}</p>
              <p>{q.description}</p>
              {q.completion && (
                <p><strong>Completed:</strong> {new Date(q.completion).toLocaleDateString()}</p>
              )}
              {isAdmin && (
                <div className="qualification-actions">
                  <button onClick={() => handleEdit(q)}>Edit</button>
                  <button onClick={() => handleDelete(q._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Education