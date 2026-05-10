const API = 'http://localhost:5000';

async function register() {

  const name = document.getElementById('name').value;

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  alert('Registered Successfully');

  window.location.href = 'login.html';
}

async function login() {
  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  localStorage.setItem('token', data.token);

  window.location.href = 'dashboard.html';
}
async function createTicket() {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
  
    const res = await fetch(`${API}/tickets`, {
  
      method: 'POST',
  
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      },
  
      body: JSON.stringify({
        title,
        description,
        priority
      })
  
    });
  
    const data = await res.json();
  
    alert('Ticket Submitted Successfully');
  
    window.location.href = 'tickets.html';
  }

  async function loadTickets() {

    const res = await fetch(`${API}/tickets`, {
  
      headers: {
        Authorization: localStorage.getItem('token')
      }
  
    });
  
    const tickets = await res.json();
  
    const container = document.getElementById('tickets');
  
    container.innerHTML = '';
  
    tickets.forEach(ticket => {
  
      let statusClass = 'open';
  
      if (ticket.status === 'In Progress') {
        statusClass = 'progress';
      }
  
      if (ticket.status === 'Resolved') {
        statusClass = 'resolved';
      }
  
      container.innerHTML += `
  
        <div class="ticket-card">
  
          <h3>${ticket.title}</h3>
  
          <p>${ticket.description}</p>
  
          <p><strong>Priority:</strong> ${ticket.priority}</p>
  
          <p>
            <strong>Status:</strong>
  
            <span class="status ${statusClass}">
              ${ticket.status}
            </span>
          </p>
  
        </div>
  
      `;
    });
  }