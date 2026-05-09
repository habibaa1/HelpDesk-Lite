const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Ticket
router.post('/', auth, (req, res) => {
  const { title, description, priority } = req.body;

  db.run(
    'INSERT INTO tickets(title,description,priority,user_id) VALUES(?,?,?,?)',
    [title, description, priority, req.user.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ message: 'Ticket Created' });
    }
  );
});
// Get Tickets
router.get('/', auth, (req, res) => {
    db.all('SELECT * FROM tickets', [], (err, rows) => {
      res.json(rows);
    });
  });
  
  // Update Status
  router.patch('/:id/status', auth, (req, res) => {
    const { status } = req.body;
  
    db.run(
      'UPDATE tickets SET status=? WHERE id=?',
      [status, req.params.id],
      function (err) {
        res.json({ message: 'Status Updated' });
      }
    );
  });
  
  module.exports = router;