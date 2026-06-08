import React from 'react';

const ChatItem = ({ contact, isSelected, onSelect }) => {
      console.log(contact,'fvfvfvfvfv')
  return (
    <button
      onClick={() => onSelect(contact.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {contact.initials}
          </div>
        )}
        {contact.isActive === 1 && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>  

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm text-gray-900 truncate">
            {contact.name}
          </span>
          <span className="text-xs text-gray-400 shrink-0 ml-2">
            {contact.lastMessageTime}
          </span>
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">
          {contact.lastMessage}
        </p>
      </div>

      {/* Unread indicator */}
      {contact.unread === 1 && (
        <span className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0" />
      )}
    </button>
  );

};

export default ChatItem;
