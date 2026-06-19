require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripeRoutes = require('./stripe');
const emailRoutes = require('./email');
const supabaseAdmin = require('./supabase');

const app = express();
const PORT = 4000;

// Webhook route needs raw body
app.use('/api/webhook', express.raw({ type: 'application/json' }), stripeRoutes.webhook);

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'SkillForgenew API' }));

// Routes
app.use('/api/checkout', stripeRoutes.checkout);
app.use('/api/email', emailRoutes);

// Demo endpoints (returns empty arrays by default, ready to be filled)
app.get('/api/users', async (req, res) => {
  if (!process.env.SUPABASE_SERVICE_KEY) return res.json([]);
  try {
    const { data, error } = await supabaseAdmin.from('users').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Supabase error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/products', async (req, res) => {
  if (!process.env.SUPABASE_SERVICE_KEY) return res.json([]);
  try {
    const { data, error } = await supabaseAdmin.from('products').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Supabase error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});