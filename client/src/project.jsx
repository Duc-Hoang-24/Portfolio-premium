import { useState, useEffect } from 'react'
import { useAuth } from '../src/context/AuthContext.jsx'

const API_URL = 'http://localhost:3000/api/projects'

const Project = () => {
  const { auth, isAdmin } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    title: '', firstname: '', lastname: '', email: '', completion: '', description: ''
  })

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      setError('Could not load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
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
      fetchProjects()
    } catch (err) {
      setError('Server error')
    }
  }

  const handleEdit = (proj) => {
    setForm({
      title: proj.title || '',
      firstname: proj.firstname || '',
      lastname: proj.lastname || '',
      email: proj.email || '',
      completion: proj.completion ? proj.completion.substring(0, 10) : '',
      description: proj.description || ''
    })
    setEditingId(proj._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` }
      })
      fetchProjects()
    } catch (err) {
      setError('Could not delete project')
    }
  }

  return (
    <div className="page-section active-projects">
      <h2>Highlighted Projects</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isAdmin && (
        <button onClick={() => { resetForm(); setShowForm(!showForm) }} style={{ marginBottom: '1rem' }}>
          {showForm ? 'Cancel' : '+ Add New Project'}
        </button>
      )}

      {isAdmin && showForm && (
        <form onSubmit={handleSubmit} className="project-form" style={{ marginBottom: '2rem' }}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required />
          <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="completion" type="date" value={form.completion} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <button type="submit">{editingId ? 'Update Project' : 'Create Project'}</button>
        </form>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.map((proj) => (
            <div key={proj._id} className="project-card">
              <h3>{proj.title}</h3>
              <p><strong>By:</strong> {proj.firstname} {proj.lastname}</p>
              <p>{proj.description}</p>
              {proj.completion && (
                <p><strong>Completed:</strong> {new Date(proj.completion).toLocaleDateString()}</p>
              )}
              {isAdmin && (
                <div className="project-actions">
                  <button onClick={() => handleEdit(proj)}>Edit</button>
                  <button onClick={() => handleDelete(proj._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Project