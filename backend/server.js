const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
require('dotenv').config();

const app = express();

// Environment variable validation
if (!process.env.PORT) {
  console.warn('⚠️  PORT not found in environment variables');
  console.warn('💡 Using default port 3001');
}
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = process.env.DATABASE_URL || './database.db';
console.log(`📁 Using database: ${dbPath}`);
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS roadmaps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS portfolios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Skill Roadmap Backend API' });
});

// User routes
app.post('/api/users', (req, res) => {
  const { name, email, status } = req.body;
  
  db.run(
    'INSERT INTO users (name, email, status) VALUES (?, ?, ?)',
    [name, email, status],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        name,
        email,
        status
      });
    }
  );
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  
  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(row);
  });
});

// Chat message routes
app.post('/api/chat-messages', (req, res) => {
  const { user_id, role, content } = req.body;
  
  db.run(
    'INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)',
    [user_id, role, content],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        user_id,
        role,
        content,
        timestamp: new Date().toISOString()
      });
    }
  );
});

app.get('/api/chat-messages/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.all('SELECT * FROM chat_messages WHERE user_id = ? ORDER BY timestamp ASC', [userId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Roadmap routes
app.post('/api/roadmaps', (req, res) => {
  const { user_id, title, content } = req.body;
  
  db.run(
    'INSERT INTO roadmaps (user_id, title, content) VALUES (?, ?, ?)',
    [user_id, title, content],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        user_id,
        title,
        content,
        created_at: new Date().toISOString()
      });
    }
  );
});

app.get('/api/roadmaps/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.all('SELECT * FROM roadmaps WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Portfolio routes
app.post('/api/portfolios', (req, res) => {
  const { user_id, title, content } = req.body;
  
  db.run(
    'INSERT INTO portfolios (user_id, title, content) VALUES (?, ?, ?)',
    [user_id, title, content],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        user_id,
        title,
        content,
        created_at: new Date().toISOString()
      });
    }
  );
});

app.get('/api/portfolios/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.all('SELECT * FROM portfolios WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});