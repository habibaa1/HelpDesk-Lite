const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./helpdesk.db');

// Users table

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'employee'
)
`);

// Tickets table

db.run(`
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT DEFAULT 'Open',
    priority TEXT DEFAULT 'Medium',
    user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;