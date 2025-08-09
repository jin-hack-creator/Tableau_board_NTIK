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

-- Create the paiements table
CREATE TABLE paiements (
  id SERIAL PRIMARY KEY,
  ecole_id INTEGER REFERENCES ecoles(id),
  ecole_nom TEXT,
  montant INTEGER,
  date_paiement TIMESTAMPTZ DEFAULT NOW()
);

-- Create the alertes table
CREATE TABLE alertes (
  id SERIAL PRIMARY KEY,
  type TEXT,
  message TEXT,
  date TIMESTAMPTZ DEFAULT NOW()
);

-- Create the users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  role TEXT
);

-- Create the frais table
CREATE TABLE frais (
  id SERIAL PRIMARY KEY,
  name TEXT,
  amount INTEGER
);
