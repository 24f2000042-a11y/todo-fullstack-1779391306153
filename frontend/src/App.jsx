import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaAdd, FaCheck, FaTrash, FaEdit, FaSave, FaCancel } from 'react-icons/fa'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/todos`)
      setTodos(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch todos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    try {
      const response = await axios.post(`${API_URL}/api/todos`, {
        text: inputValue
      })
      setTodos([...todos, response.data])
      setInputValue('')
    } catch (err) {
      setError('Failed to add todo')
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`)
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      setError('Failed to delete todo')
      console.error(err)
    }
  }

  const handleEdit = (todo) => {
    setEditId(todo._id)
    setEditText(todo.text)
  }

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return

    try {
      const response = await axios.put(`${API_URL}/api/todos/${id}`, {
        text: editText
      })
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ))
      setEditId(null)
      setEditText('')
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  const handleCancelEdit = () => {
    setEditId(null)
    setEditText('')
  }

  const handleToggle = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/api/todos/${id}`, {
        completed: !completed
      })
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ))
    } catch (err) {
      setError('Failed to update status')
      console.error(err)
    }
  }

  return (
    <div className="container">
      <div className="app-header">
        <h1>Todo App</h1>
        <p>Stay organized with Modern Blue</p>
      </div>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">
          <FaAdd /> Add
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">No todos yet. Add your first one above!</li>
          ) : (
            todos.map(todo => (
              <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}> 
                {editId === todo._id ? (
                  <> 
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(todo._id)} className="save">
                      <FaSave />
                    </button>
                    <button onClick={handleCancelEdit} className="cancel">
                      <FaCancel />
                    </button>
                  </>
                ) : (
                  <> 
                    <input
                      type="checkbox"
                      checked={todo.completed || false}
                      onChange={(e) => handleToggle(todo._id, todo.completed)}
                    />
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-actions">
                      <button onClick={() => handleEdit(todo)} className="edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(todo._id)} className="delete">
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      )}

      <div className="stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  )
}