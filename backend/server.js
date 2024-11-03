const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Konfigurasi koneksi database (contoh MySQL)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'credentials'
});

// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Keluar jika koneksi gagal
  } else {
    console.log('Connected to MySQL database');
  }
});

// Fungsi untuk memeriksa keberadaan username
const checkUsernameExists = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0);
      }
    });
  });
};

// Endpoint login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.length > 0) {
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login success', token });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  });
});

// Endpoint register
app.post('/register', async (req, res) => {
  console.log('Register request received:', req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Validasi panjang password
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Cek apakah username sudah ada
    const userExists = await checkUsernameExists(username);
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Simpan user ke database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('User registered with ID:', result.insertId);
      res.json({ message: 'Register success' });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint forgot-password
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  console.log('Forgot password request for:', email);
  res.json({ message: 'Password reset link sent to ' + email });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
