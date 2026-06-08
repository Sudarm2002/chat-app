import pool from '../db.js';

// The current logged-in user ID (hardcoded for now)
const CURRENT_USER_ID = 1;

export const getCurrentUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [CURRENT_USER_ID]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = rows[0];
    res.json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      initials: user.initials,
    });
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        u.id, u.name, u.role, u.avatar, u.initials, u.is_active AS isActive,
        c.last_message AS lastMessage, c.last_msg_time AS lastMessageTime, c.unread
      FROM contacts c
      JOIN users u ON u.id = c.contact_id
      WHERE c.user_id = ?
      ORDER BY c.id ASC`,
      [CURRENT_USER_ID]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
