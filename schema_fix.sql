-- Drop the ecoles table if it exists
DROP TABLE IF EXISTS ecoles;

-- Create the ecoles table
CREATE TABLE ecoles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  abonnement_statut TEXT DEFAULT 'inactif',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
