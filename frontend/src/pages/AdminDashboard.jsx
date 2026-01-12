import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewMode, setViewMode] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchContacts();
  }, [navigate]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/contact/all');
      if (response.data.success) {
        let sortedContacts = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const deletedIds = JSON.parse(localStorage.getItem('deletedContactIds') || '[]');
        sortedContacts = sortedContacts.filter(contact =>
          !deletedIds.includes(contact._id)
        );

        setContacts(sortedContacts);
      }
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const handleViewMessage = (contact) => {
    setSelectedMessage(contact);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  const optimisticDelete = (id) => {
    setContacts(contacts.filter(contact => contact._id !== id));

    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage(null);
    }

    const deletedIds = JSON.parse(localStorage.getItem('deletedContactIds') || '[]');
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem('deletedContactIds', JSON.stringify(deletedIds));
    }

    setError('Message removed from view. Server delete may have failed.');
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      setDeletingId(id);
      const response = await API.delete(`/contact/${id}`);

      if (response.data.success) {
        setContacts(contacts.filter(contact => contact._id !== id));

        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }

        setError('');
        alert('Message deleted successfully!');
      }
    } catch (err) {
      console.error('Delete error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url
      });

      if (err.response?.status === 404) {
        try {
          const postResponse = await API.post(`/contact/delete/${id}`);

          if (postResponse.data.success) {
            setContacts(contacts.filter(contact => contact._id !== id));
            if (selectedMessage && selectedMessage._id === id) {
              setSelectedMessage(null);
            }
            alert('Message deleted (using fallback method)!');
          }
        } catch (postErr) {
          optimisticDelete(id);
        }
      } else if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('admin');
          navigate('/admin/login');
        }, 2000);
      } else {
        setError(`Failed to delete: ${err.response?.data?.message || err.message}`);
        optimisticDelete(id);
      }
    } finally {
      setDeletingId(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (viewMode === 'all') return true;
    if (viewMode === 'home') return contact.source === 'home';
    if (viewMode === 'contact') return contact.source === 'contact';
    return true;
  });

  const today = new Date().toDateString();
  const totalMessages = contacts.length;
  const todayMessages = contacts.filter(c =>
    new Date(c.createdAt).toDateString() === today
  ).length;
  const homePageMessages = contacts.filter(c => c.source === 'home').length;
  const contactPageMessages = contacts.filter(c => c.source === 'contact').length;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-left">
          <h1>Message Dashboard</h1>
          <p className="header-subtitle">Manage all contact form submissions</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {error && (
        <div className="error-alert">
          ⚠️ {error}
          <button className="retry-btn" onClick={fetchContacts}>
            Retry
          </button>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card total">
          <div className="stat-icon">📨</div>
          <div className="stat-content">
            <h3>Total Messages</h3>
            <p className="stat-number">{totalMessages}</p>
          </div>
        </div>

        <div className="stat-card today">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Today</h3>
            <p className="stat-number">{todayMessages}</p>
          </div>
        </div>

        <div className="stat-card home">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <h3>Home Page</h3>
            <p className="stat-number">{homePageMessages}</p>
          </div>
        </div>

        <div className="stat-card contact">
          <div className="stat-icon">📞</div>
          <div className="stat-content">
            <h3>Contact Page</h3>
            <p className="stat-number">{contactPageMessages}</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            All Messages ({totalMessages})
          </button>
          <button
            className={`filter-btn ${viewMode === 'home' ? 'active' : ''}`}
            onClick={() => setViewMode('home')}
          >
            Home Page ({homePageMessages})
          </button>
          <button
            className={`filter-btn ${viewMode === 'contact' ? 'active' : ''}`}
            onClick={() => setViewMode('contact')}
          >
            Contact Page ({contactPageMessages})
          </button>
        </div>

        <button className="refresh-btn" onClick={fetchContacts}>
          <span className="refresh-icon">🔄</span>
          Refresh
        </button>
      </div>

      <div className="contacts-table-container">
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Source</th>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Subject</th>
              <th>Message Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-content">
                    <div className="no-data-icon">📭</div>
                    <p>No messages found</p>
                    <small>Try changing filters or check back later</small>
                  </div>
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="datetime-cell">
                    <div className="date">{new Date(contact.createdAt).toLocaleDateString()}</div>
                    <div className="time">{new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="source-cell">
                    <span className={`source-badge ${contact.source === 'contact' ? 'contact-page' : 'home-page'}`}>
                      {contact.source === 'contact' ? 'Contact Page' : 'Home Page'}
                      {contact.contactMethod && (
                        <span className="method-tag"> • {contact.contactMethod}</span>
                      )}
                    </span>
                  </td>
                  <td className="name-cell">
                    <strong>{contact.name}</strong>
                  </td>
                  <td className="contact-info-cell">
                    <div className="email-info">
                      <a href={`mailto:${contact.email}`} className="email-link">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="phone-info">
                        <a href={`tel:${contact.phone}`} className="phone-link">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </td>
                  <td className="subject-cell">
                    <span className="subject-text">{contact.subject}</span>
                  </td>
                  <td className="preview-cell">
                    <div className="message-preview">
                      {contact.message.length > 80
                        ? `${contact.message.substring(0, 80)}...`
                        : contact.message}
                    </div>
                  </td>
                  <td className="actions-cell">
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        className="view-btn"
                        onClick={() => handleViewMessage(contact)}
                      >
                        View
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteMessage(contact._id)}
                        disabled={deletingId === contact._id}
                      >
                        {deletingId === contact._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <div className="message-modal-overlay" onClick={closeMessageModal}>
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message Details</h2>
              <button className="modal-close" onClick={closeMessageModal}>
                ✕
              </button>
            </div>

            <div className="modal-content">
              <div className="message-header">
                <div className="message-source">
                  <span className={`source-badge ${selectedMessage.source === 'contact' ? 'contact-page' : 'home-page'}`}>
                    {selectedMessage.source === 'contact' ? 'Contact Page Form' : 'Home Page Form'}
                  </span>
                  <span className="message-date">
                    📅 {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="sender-info">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{selectedMessage.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="info-value link">
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="info-item">
                    <span className="info-label">Phone:</span>
                    <a href={`tel:${selectedMessage.phone}`} className="info-value link">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                {selectedMessage.contactMethod && (
                  <div className="info-item">
                    <span className="info-label">Preferred Contact:</span>
                    <span className="info-value capitalize">{selectedMessage.contactMethod}</span>
                  </div>
                )}
                {selectedMessage.subject && (
                  <div className="info-item">
                    <span className="info-label">Subject:</span>
                    <span className="info-value">{selectedMessage.subject}</span>
                  </div>
                )}
              </div>

              <div className="message-content">
                <div className="content-label">Message:</div>
                <div className="message-text">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="modal-actions">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`}
                  className="reply-btn"
                >
                  Reply via Email
                </a>
                <button
                  className="delete-btn-modal"
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                  disabled={deletingId === selectedMessage._id}
                >
                  {deletingId === selectedMessage._id ? 'Deleting...' : 'Delete Message'}
                </button>
                <button className="close-modal-btn" onClick={closeMessageModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;