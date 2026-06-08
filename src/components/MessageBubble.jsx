import React from 'react';

const MessageBubble = ({ message, isSent, senderAvatar }) => {
  const isImage = message.type === 'image';

  return (
    <div className={`flex items-end gap-2 mb-4 ${isSent ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar for received messages */}
      {!isSent && (
        <img
          src={senderAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover shrink-0 mb-5"
        />
      )}

      <div className={`max-w-[65%] ${isSent ? 'items-end' : 'items-start'} flex flex-col`}>
        {isImage ? (
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <img
              src={message.content}
              alt="shared"
              className="w-72 h-56 object-cover"
            />
          </div>
        ) : (
          <div
            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              isSent
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-800 rounded-bl-md'
            }`}
          >
            {message.content}
          </div>
        )}

        {/* Timestamp + status */}
        <div className={`flex items-center gap-1 mt-1 ${isSent ? 'self-end' : 'self-start'}`}>
          <span className="text-[11px] text-gray-400">{message.timestamp}</span>
          {message.status && (
            <span className="text-[11px] text-gray-400 italic">{message.status}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
