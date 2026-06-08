import express from 'express';
import { getConversation, sendMessage, getSharedMedia, getPrivateNotes } from '../controllers/chatController.js';

const router = express.Router();

router.get('/conversations/:contactId', getConversation);
router.post('/messages', sendMessage);
router.get('/shared-media/:contactId', getSharedMedia);
router.get('/private-notes/:contactId', getPrivateNotes);

export default router;
