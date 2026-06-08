-- Chatty App Database Schema
-- MySQL: root / root

CREATE DATABASE IF NOT EXISTS chatty_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE chatty_db;

-- =====================
-- TABLES
-- =====================

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(50) NOT NULL UNIQUE,
  name        VARCHAR(100) NOT NULL,
  role        VARCHAR(100),
  avatar      VARCHAR(500),
  initials    VARCHAR(5),
  is_active   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NOT NULL,
  contact_id      INT NOT NULL,
  last_message    VARCHAR(255),
  last_msg_time   VARCHAR(50) ,
  unread          BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (contact_id) REFERENCES users(id),
  UNIQUE(user_id, contact_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS conversations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  contact_id  INT NOT NULL,
  is_typing   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (contact_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS messages (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  sender_id       INT NOT NULL,
  type            ENUM('text', 'image') DEFAULT 'text',
  content         TEXT NOT NULL,
  status          VARCHAR(20),
  timestamp       VARCHAR(50),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS shared_media (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  url             VARCHAR(500) NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS private_notes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  contact_id  INT NOT NULL,
  note        TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (contact_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================
-- SEED DATA
-- =====================

-- Users (id 1 = current user "Alex", ids 2-5 = contacts)
INSERT INTO users (id, username, name, role, avatar, initials, is_active) VALUES
(1, 'alex',           'Alex',             NULL,                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', NULL, TRUE),
(2, 'sarah_johnson',  'Sarah Johnson',    'Product Designer',  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', NULL, TRUE),
(3, 'marcus_chen',    'Marcus Chen',      'Engineering Lead',  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', NULL, FALSE),
(4, 'design_squad',   'Design Sq  uad',     'Group',             NULL, 'DS', FALSE),
(5, 'elena_rodriguez','Elena Rodríguez',  'Marketing Manager', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', NULL, FALSE);

-- Contacts (user 1 has contacts 2,3,4,5)
INSERT INTO contacts (user_id, contact_id, last_message, last_msg_time, unread) VALUES
(1, 2, 'I''ll send the final designs b...', '12:45 PM', TRUE),
(1, 3, 'The meeting was moved to 3PM.',     'Yesterday', FALSE),
(1, 4, 'Alex: Check out this moodboard!',   'May 12',    FALSE),
(1, 5, 'Thanks for the feedback!',          'May 10',    FALSE);

-- Conversations
INSERT INTO conversations (id, user_id, contact_id, is_typing) VALUES
(1, 1, 2, TRUE),
(2, 1, 3, FALSE),
(3, 1, 4, FALSE),
(4, 1, 5, FALSE);

-- Messages
-- Conversation 1 (Alex <-> Sarah)
INSERT INTO messages (conversation_id, sender_id, type, content, status, timestamp) VALUES
(1, 2, 'text',  'Hey Alex! Have you had a chance to look at the new brand guidelines I uploaded to the project folder? 🎨', NULL, '12:30 PM'),
(1, 1, 'text',  'Checking them right now! The color palette looks incredibly fresh. I love the new blue accent. 💎', NULL, '12:32 PM'),
(1, 1, 'image', 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=500&fit=crop', 'Delivered', '12:33 PM');

-- Conversation 2 (Alex <-> Marcus)
INSERT INTO messages (conversation_id, sender_id, type, content, status, timestamp) VALUES
(2, 3, 'text', 'Hey, just a heads up — the standup has been moved to 3PM today.', NULL, '9:15 AM'),
(2, 1, 'text', 'Got it, thanks for letting me know! 👍', NULL, '9:20 AM');

-- Conversation 3 (Alex <-> Design Squad)
INSERT INTO messages (conversation_id, sender_id, type, content, status, timestamp) VALUES
(3, 1, 'text', 'Check out this moodboard! I think we should go with the warm tone palette for the rebrand.', NULL, '2:45 PM');

-- Conversation 4 (Alex <-> Elena)
INSERT INTO messages (conversation_id, sender_id, type, content, status, timestamp) VALUES
(4, 5, 'text', 'Thanks for the feedback on the campaign assets! Really appreciate the quick turnaround.', NULL, '11:00 AM'),
(4, 1, 'text', 'Anytime! Let me know if you need any more revisions.', NULL, '11:05 AM');

-- Shared Media (for conversation 1)
INSERT INTO shared_media (conversation_id, url) VALUES
(1, 'https://images.unsplash.com/photo-1557683316-973673baf926?w=150&h=150&fit=crop'),
(1, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=150&h=150&fit=crop'),
(1, 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&h=150&fit=crop'),
(1, 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=150&h=150&fit=crop');

-- Private Notes
INSERT INTO private_notes (user_id, contact_id, note) VALUES
(1, 2, 'Reminder: Discuss the quarterly goals and budget allocation for the next design sprint.');
