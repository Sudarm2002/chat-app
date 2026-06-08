import React, { useState } from 'react';
import SharedMediaGrid from './SharedMediaGrid';

const UserProfilePanel = ({ contact, sharedMedia, privateNote }) => {
  const [muted, setMuted] = useState(true);

  if (!contact) return null;

  return (
    <div className="w-64 bg-white border-l border-gray-100 flex flex-col shrink-0 overflow-y-auto">
      {/* Profile */}
      <div className="flex flex-col items-center pt-8 pb-4 px-4">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-20 h-20 rounded-full object-cover shadow-lg mb-3"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-3">
            {contact.initials}
          </div>
        )}
        <h3 className="font-bold text-gray-900 text-base">{contact.name}</h3>
        <p className="text-xs text-blue-500 font-medium">{contact.role}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 pb-5">
        <button className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {/* Shared Media */}
      <SharedMediaGrid media={sharedMedia} />

      {/* Divider */}
      <div className="border-t border-gray-100 mx-4" />

      {/* Mute notifications */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="text-sm text-gray-700">Mute Notifications</span>
        </div>
        <button
          onClick={() => setMuted(!muted)}
          className={`w-10 h-6 rounded-full transition-colors relative ${muted ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              muted ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-4" />

      {/* Starred messages */}
      <button className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors w-full text-left">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="text-sm text-gray-700">Starred Messages</span>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Block */}
      <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors w-full text-left">
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <span className="text-sm text-red-500 font-medium">Block {contact.name.split(' ')[0]}</span>
      </button>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-4" />

      {/* Private Note */}
      {privateNote && (
        <div className="px-6 py-4">
          <div className="bg-amber-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Private Note</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{privateNote}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePanel;
