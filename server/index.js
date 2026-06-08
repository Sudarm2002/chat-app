console.log("STEP 1 - Index loaded");

import express from 'express';
import cors from 'cors';
import pool from './db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', chatRoutes);

console.log("STEP 2 - Before listen");

// ─── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`STEP 3 - Server running on ${PORT}`);
  console.log(`✅ Chatty API server running on http://localhost:${PORT}`);
});
