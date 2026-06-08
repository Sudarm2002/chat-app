import pool from '../db.js';

// The current logged-in user ID (hardcoded for now)
const CURRENT_USER_ID = 1;

export const getConversation = async (req, res) => {
  try {
    const contactId = parseInt(req.params.contactId);

    // Get the conversation
    const [convRows] = await pool.query(
      'SELECT * FROM conversations WHERE user_id = ? AND contact_id = ?',
      [CURRENT_USER_ID, contactId]
    );

    if (convRows.length === 0) {
      return res.json({ messages: [], isTyping: false });
    }

    const conversation = convRows[0];

    // Get messages for this conversation
    const [msgRows] = await pool.query(
      `SELECT 
        m.id, m.sender_id AS senderId, m.type, m.content, m.status, m.timestamp
      FROM messages m
      WHERE m.conversation_id = ?
      ORDER BY m.created_at ASC`,
      [conversation.id]
    );

    res.json({
      messages: msgRows,
      isTyping: !!conversation.is_typing,
    });
  } catch (err) {
    console.error('Error fetching conversation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { contactId, content, type = 'text' } = req.body;

    if (!contactId || !content) {
      return res.status(400).json({ error: 'contactId and content are required' });
    }

    // Find or create conversation
    let [convRows] = await pool.query(
      'SELECT * FROM conversations WHERE user_id = ? AND contact_id = ?',
      [CURRENT_USER_ID, contactId]
    );

    let conversationId;
    if (convRows.length === 0) {
      const [result] = await pool.query(
        'INSERT INTO conversations (user_id, contact_id, is_typing) VALUES (?, ?, FALSE)',
        [CURRENT_USER_ID, contactId]
      );
      conversationId = result.insertId;
    } else {
      conversationId = convRows[0].id;
    }

    // Create the message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [result] = await pool.query(
      'INSERT INTO messages (conversation_id, sender_id, type, content, status, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
      [conversationId, CURRENT_USER_ID, type, content, 'Delivered', timestamp]
    );

    // Update last message in contacts
    const lastMsg = content.length > 30 ? content.substring(0, 30) + '...' : content;
    await pool.query(
      'UPDATE contacts SET last_message = ?, last_msg_time = ?, unread = FALSE WHERE user_id = ? AND contact_id = ?',
      [lastMsg, timestamp, CURRENT_USER_ID, contactId]
    );

    res.json({
      id: result.insertId,
      senderId: CURRENT_USER_ID,
      type,
      content,
      status: 'Delivered',
      timestamp,
    });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSharedMedia = async (req, res) => {
  try {
    const contactId = parseInt(req.params.contactId);

    const [rows] = await pool.query(
      `SELECT sm.url
      FROM shared_media sm
      JOIN conversations conv ON conv.id = sm.conversation_id
      WHERE conv.user_id = ? AND conv.contact_id = ?`,
      [CURRENT_USER_ID, contactId]
    );

    res.json(rows.map((r) => r.url));
  } catch (err) {
    console.error('Error fetching shared media:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPrivateNotes = async (req, res) => {
  try {
    const contactId = parseInt(req.params.contactId);

    const [rows] = await pool.query(
      'SELECT note FROM private_notes WHERE user_id = ? AND contact_id = ?',
      [CURRENT_USER_ID, contactId]
    );

    res.json(rows.length > 0 ? rows[0].note : null);
  } catch (err) {
    console.error('Error fetching private notes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
