import React from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const TypingIndicator = ({ avatar, name }) => (
  <div className="flex items-center gap-2 px-6 py-2">
    <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
    <div className="flex items-center gap-1 bg-gray-100 px-4 py-2 rounded-2xl">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.16s' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce-dot" style={{ animationDelay: '0.32s' }} />
      </div>
    </div>
    <span className="text-xs text-gray-400">{name} is typing...</span>
  </div>
);

const ChatWindow = ({ contact, conversation, currentUserId, onSendMessage }) => {
  if (!contact || !conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
      {/* Header */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          {contact.avatar ? (
            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              {contact.initials}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-sm text-gray-900">{contact.name}</h3>
            <p className="text-xs text-green-500">
              {contact.isActive ? 'Active now' : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Video */}
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          {/* Call */}
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          {/* Search */}
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Info */}
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-blue-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Date separator */}
      <div className="flex items-center justify-center py-4">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Today</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-2">
        {conversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isSent={msg.senderId === currentUserId}
            senderAvatar={contact.avatar}
          />
        ))}
      </div>

      {/* Typing indicator */}
      {conversation.isTyping && (
        <TypingIndicator avatar={contact.avatar} name={contact.name} />
      )}

      {/* Input */}
      <MessageInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
