const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp'

// Middleware
app.use(cors())
app.use(express.json())

// Todo Schema
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

// Routes
// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err.message })
  }
})

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Todo text is required' })
    }
    const todo = new Todo({ text: text.trim() })
    const savedTodo = await todo.save()
    res.status(201).json(savedTodo)
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo', error: err.message })
  }
})

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { text, completed } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid todo ID' })
    }

    const updateData = {}
    if (text !== undefined) updateData.text = text.trim()
    if (completed !== undefined) updateData.completed = completed

    const todo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.json(todo)
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err.message })
  }
})

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid todo ID' })
    }

    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.json({ message: 'Todo deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err.message })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
