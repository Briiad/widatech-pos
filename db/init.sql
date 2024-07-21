-- Create the invoice table
CREATE TABLE IF NOT EXISTS invoice (
  id SERIAL PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  salesperson_name VARCHAR(255) NOT NULL,
  notes TEXT,
  -- JSON data
  products JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
