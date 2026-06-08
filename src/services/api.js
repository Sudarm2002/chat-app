



const API_BASE = 'http://localhost:5000/api';

export async function fetchCurrentUser() {
  const res = await fetch(`${API_BASE}/current-user`);
  if (!res.ok) throw new Error('Failed to fetch current user');
  return res.json();
}

export async function fetchContacts() {
  const res = await fetch(`${API_BASE}/contacts`);
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return res.json();
}

export async function fetchConversation(contactId) {
  const res = await fetch(`${API_BASE}/conversations/${contactId}`);
  if (!res.ok) throw new Error('Failed to fetch conversation');
  return res.json();
}

export async function sendMessage(contactId, content, type = 'text') {
  const res = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contactId, content, type }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function fetchSharedMedia(contactId) {
  const res = await fetch(`${API_BASE}/shared-media/${contactId}`);
  if (!res.ok) throw new Error('Failed to fetch shared media');
  return res.json();
}

export async function fetchPrivateNotes(contactId) {
  const res = await fetch(`${API_BASE}/private-notes/${contactId}`);
  if (!res.ok) throw new Error('Failed to fetch private notes');
  return res.json();
}
