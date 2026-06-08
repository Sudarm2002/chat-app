import React, { useState } from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ contacts, selectedContactId, onSelectContact }) => {
  const [search, setSearch] = useState('');

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 bg-white border-r border-gray-100 flex flex-col shrink-0">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-gray-900">Messages</h1>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filtered.map((contact) => (
          <ChatItem
            key={contact.id}
            contact={contact}
            isSelected={selectedContactId === contact.id}
            onSelect={onSelectContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
