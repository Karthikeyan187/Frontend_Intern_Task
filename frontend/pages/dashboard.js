// Dashboard component for managing user notes
import { useEffect, useState, useRef } from 'react';
import { getToken, fetcher, setToken } from '../lib/api';
import { useRouter } from 'next/router';

export default function Dashboard(){
  const router = useRouter();
  // State for user profile and notes
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  // Search and filter states
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  // Form state for new notes
  const [newNote, setNewNote] = useState({title:'', content:'', tags:''});
  // Editing state
  const [editing, setEditing] = useState(null);
  // Loading and message states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Ref for Vanta globe animation
  const globeRef = useRef(null);

  // Check if user is logged in on mount
  useEffect(()=> {
    if (!getToken()) return router.push('/login');
    loadData();
  }, []);

  // Auto-hide messages after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Initialize Vanta globe animation
  useEffect(() => {
    let globe = null;
    if (globeRef.current) {
      globe = VANTA.GLOBE({
        el: globeRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00
      });
    }
    return () => {
      if (globe) globe.destroy();
    };
  }, []);

  // Load user profile and notes
  const loadData = async () => {
    setLoading(true);
    try {
      const prof = await fetcher('/profile');
      setProfile(prof);
      const nts = await fetcher('/notes');
      setNotes(nts);
    } catch (e) {
      console.error(e);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  async function logout(){
    setToken(null);
    router.push('/login');
  }

  // Search and filter notes
  async function search(){
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (tag) params.append('tag', tag);
      const results = await fetcher(`/notes?${params.toString()}`);
      setNotes(results);
    } catch (e) {
      setMessage('Search failed');
    } finally {
      setLoading(false);
    }
  }

  // Create a new note
  async function createNote(e){
    e.preventDefault();
    setLoading(true);
    try {
      const note = { ...newNote, tags: newNote.tags.split(',').map(t=>t.trim()) };
      const created = await fetcher('/notes', { method: 'POST', body: note });
      setNotes([created, ...notes]);
      setNewNote({title:'', content:'', tags:''});
      setMessage('Note created successfully');
    } catch (e) {
      setMessage('Failed to create note');
    } finally {
      setLoading(false);
    }
  }

  // Update an existing note
  async function updateNote(id, updated){
    setLoading(true);
    try {
      const note = await fetcher(`/notes/${id}`, { method: 'PUT', body: updated });
      setNotes(notes.map(n => n._id === id ? note : n));
      setEditing(null);
      setMessage('Note updated successfully');
    } catch (e) {
      setMessage('Failed to update note');
    } finally {
      setLoading(false);
    }
  }

  // Delete a note with confirmation
  async function deleteNote(id){
    if (!confirm('Delete this note?')) return;
    setLoading(true);
    try {
      await fetcher(`/notes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(n => n._id !== id));
      setMessage('Note deleted successfully');
    } catch (e) {
      setMessage('Failed to delete note');
    } finally {
      setLoading(false);
    }
  }

  const startEdit = (note) => {
    setEditing({ ...note, tags: note.tags.join(', ') });
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  return (
    <div ref={globeRef} className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-6">
        <div className="card bg-indigo-50 mb-6">
          <h2 className="text-xl font-bold">Welcome, {profile?.name}</h2>
          <p className="text-sm text-gray-600">{profile?.email}</p>
          <button className="btn-danger mt-2" onClick={logout}>Logout</button>
        </div>

        {message && <div className="alert-success">{message}</div>}

        <form onSubmit={createNote} className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
          <input value={newNote.title} onChange={e=>setNewNote({...newNote, title:e.target.value})} placeholder="Title" className="input-field mb-2" required/>
          <textarea value={newNote.content} onChange={e=>setNewNote({...newNote, content:e.target.value})} placeholder="Content" className="input-field mb-2" rows="3"></textarea>
          <input value={newNote.tags} onChange={e=>setNewNote({...newNote, tags:e.target.value})} placeholder="Tags (comma separated)" className="input-field mb-4"/>
          <button type="submit" className="btn-primary" disabled={loading}>Create Note</button>
        </form>

        <div className="flex bg-white rounded-lg shadow-sm p-2 mb-6">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search notes" className="flex-1 border-none focus:ring-2 focus:ring-indigo-500" />
          <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Filter by tag" className="flex-1 border-none focus:ring-2 focus:ring-indigo-500" />
          <button className="btn-primary" onClick={search} disabled={loading}>Search</button>
        </div>

        {loading && <div className="text-center py-4"><div className="spinner"></div></div>}

        <div className="grid md:grid-cols-2 gap-4">
          {notes.map(n => (
            <div key={n._id} className="note-card slide-up">
              {editing && editing._id === n._id ? (
                <form onSubmit={(e) => { e.preventDefault(); updateNote(n._id, { title: editing.title, content: editing.content, tags: editing.tags.split(',').map(t=>t.trim()) }); }}>
                  <input value={editing.title} onChange={e=>setEditing({...editing, title:e.target.value})} placeholder="Title" className="input-field mb-2" required/>
                  <textarea value={editing.content} onChange={e=>setEditing({...editing, content:e.target.value})} placeholder="Content" className="input-field mb-2" rows="3"></textarea>
                  <input value={editing.tags} onChange={e=>setEditing({...editing, tags:e.target.value})} placeholder="Tags (comma separated)" className="input-field mb-4"/>
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" onClick={cancelEdit} className="btn-secondary">Cancel</button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="font-bold text-lg mb-2">{n.title}</h3>
                  <p className="text-gray-600 mb-2">{n.content}</p>
                  <div className="mb-4">
                    {n.tags.map(t => <span key={t} className="tag-badge">{t}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(n)} className="btn-primary">Edit</button>
                    <button onClick={() => deleteNote(n._id)} className="btn-danger">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
