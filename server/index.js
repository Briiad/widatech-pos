require('dotenv').config();
const express = require('express');
var cors = require('cors')
const { Pool } = require('pg');

const app = express();
const port = 5000 || process.env.PORT;

console.log(process.env.DATABASE_URL);

// Configure database connection
const pool = new Pool({
  // url
  connectionString: process.env.DATABASE_URL,
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected');
  }
});

// Middlewares
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/api', (req, res) => {
  res.send('Hello World! from API');
})

// POST endpoint to save product data to the invoice table
app.post('/api/invoices', async (req, res) => {
  const { date, customer_name, salesperson_name, notes, products } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO invoice (date, customer_name, salesperson_name, notes, products) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [date, customer_name, salesperson_name, notes,
        // Store JSON products object
        JSON.stringify(products)
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving invoice data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve all data from the invoice table
app.get('/api/invoices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invoice');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving invoice data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
