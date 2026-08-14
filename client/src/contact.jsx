import { useState, useEffect } from 'react'
import { useAuth } from '../src/context/AuthContext.jsx'

const API_URL = `${import.meta.env.VITE_API_URL}/api/contacts`

const Contact = () => {
  const { auth, isAdmin } = useAuth()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '' })

  const fetchContacts = async () => {
    if (!isAdmin) return
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setContacts(data)
    } catch (err) {
      setError('Could not load contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [isAdmin])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      setForm({ firstname: '', lastname: '', email: '' })
      setSuccess(true)
      if (isAdmin) fetchContacts()
    } catch (err) {
      setError('Server error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${auth.token}` }
      })
      fetchContacts()
    } catch (err) {
      setError('Could not delete contact')
    }
  }

  return (
    <div className="page-section active-contact">
      <h2>Contact Me</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Thanks for reaching out! I'll get back to you soon.</p>}

      <form onSubmit={handleSubmit} className="contact-form">
        <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required />
        <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>

      {isAdmin && (
        <div className="contacts-admin-list" style={{ marginTop: '2rem' }}>
          <h3>All Submitted Contacts (Admin Only)</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {contacts.map((c) => (
                <li key={c._id}>
                  {c.firstname} {c.lastname} — {c.email}
                  <button onClick={() => handleDelete(c._id)} style={{ marginLeft: '10px' }}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Contact