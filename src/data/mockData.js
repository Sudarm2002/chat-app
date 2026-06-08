// Mock data for the Chatty application

export const currentUser = {
  id: 'user-me',
  name: 'Alex',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
};

export const contacts = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    isActive: true,
    lastMessage: "I'll send the final designs b...",
    lastMessageTime: '12:45 PM',
    unread: true,
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    role: 'Engineering Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isActive: false,
    lastMessage: 'The meeting was moved to 3PM.',
    lastMessageTime: 'Yesterday',
    unread: false,
  },
  {
    id: 'user-3',
    name: 'Design Squad',
    role: 'Group',
    avatar: null,
    initials: 'DS',
    isActive: false,
    lastMessage: 'Alex: Check out this moodboard!',
    lastMessageTime: 'May 12',
    unread: false,
  },
  {
    id: 'user-4',
    name: 'Elena Rodríguez',
    role: 'Marketing Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    isActive: false,
    lastMessage: 'Thanks for the feedback!',
    lastMessageTime: 'May 10',
    unread: false,
  },
];

export const conversations = {
  'user-1': {
    messages: [
      {
        id: 'msg-1',
        senderId: 'user-1',
        type: 'text',
        content: 'Hey Alex! Have you had a chance to look at the new brand guidelines I uploaded to the project folder? 🎨',
        timestamp: '12:30 PM',
      },
      {
        id: 'msg-2',
        senderId: 'user-me',
        type: 'text',
        content: 'Checking them right now! The color palette looks incredibly fresh. I love the new blue accent. 💎',
        timestamp: '12:32 PM',
      },
      {
        id: 'msg-3',
        senderId: 'user-me',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=500&fit=crop',
        timestamp: '12:33 PM',
        status: 'Delivered',
      },
    ],
    isTyping: true,
  },
  'user-2': {
    messages: [
      {
        id: 'msg-4',
        senderId: 'user-2',
        type: 'text',
        content: 'Hey, just a heads up — the standup has been moved to 3PM today.',
        timestamp: '9:15 AM',
      },
      {
        id: 'msg-5',
        senderId: 'user-me',
        type: 'text',
        content: 'Got it, thanks for letting me know! 👍',
        timestamp: '9:20 AM',
      },
    ],
    isTyping: false,
  },
  'user-3': {
    messages: [
      {
        id: 'msg-6',
        senderId: 'user-me',
        type: 'text',
        content: 'Check out this moodboard! I think we should go with the warm tone palette for the rebrand.',
        timestamp: '2:45 PM',
      },
    ],
    isTyping: false,
  },
  'user-4': {
    messages: [
      {
        id: 'msg-7',
        senderId: 'user-4',
        type: 'text',
        content: 'Thanks for the feedback on the campaign assets! Really appreciate the quick turnaround.',
        timestamp: '11:00 AM',
      },
      {
        id: 'msg-8',
        senderId: 'user-me',
        type: 'text',
        content: 'Anytime! Let me know if you need any more revisions.',
        timestamp: '11:05 AM',
      },
    ],
    isTyping: false,
  },
};

export const sharedMedia = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=150&h=150&fit=crop',
];

export const privateNotes = {
  'user-1': 'Reminder: Discuss the quarterly goals and budget allocation for the next design sprint.',
};
