import { mockUsers } from '@/contexts/AuthContext';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'system';
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'private';
  tripId?: string;
  tripName?: string;
  participants: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  avatar?: string;
}

// Mock chat rooms
export const mockChatRooms: ChatRoom[] = [
  {
    id: 'group-1',
    name: 'Chinh phục Fansipan 3143m',
    type: 'group',
    tripId: 'trip-1',
    tripName: 'Chinh phục Fansipan 3143m',
    participants: ['user-1', 'porter-1', 'user-2'],
    lastMessage: {
      id: 'msg-1',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Mọi người chuẩn bị đầy đủ đồ leo núi nhé!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text',
    },
    unreadCount: 2,
    avatar: '/fansipan.jpg',
  },
  {
    id: 'group-2',
    name: 'Tà Xùa - Săn mây',
    type: 'group',
    tripId: 'trip-2',
    tripName: 'Tà Xùa - Săn mây',
    participants: ['user-1', 'porter-1'],
    lastMessage: {
      id: 'msg-2',
      senderId: 'user-1',
      senderName: 'Nguyễn Văn A',
      content: 'Thời tiết cuối tuần này có đẹp không anh?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: 'text',
    },
    unreadCount: 0,
    avatar: '/ta-xua.png',
  },
  {
    id: 'private-1',
    name: 'Trần Văn Porter',
    type: 'private',
    participants: ['user-1', 'porter-1'],
    lastMessage: {
      id: 'msg-3',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Bạn cần hỗ trợ gì thêm không?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      type: 'text',
    },
    unreadCount: 1,
  },
  {
    id: 'private-2',
    name: 'Admin VietTrekking',
    type: 'private',
    participants: ['user-1', 'admin-1'],
    lastMessage: {
      id: 'msg-4',
      senderId: 'admin-1',
      senderName: 'Admin VietTrekking',
      content: 'Chào bạn, cảm ơn đã sử dụng dịch vụ!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: 'text',
    },
    unreadCount: 0,
  },
];

// Mock messages for each room
export const mockMessages: Record<string, ChatMessage[]> = {
  'group-1': [
    {
      id: 'msg-g1-1',
      senderId: 'system',
      senderName: 'Hệ thống',
      content: 'Nguyễn Văn A đã tham gia nhóm',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      type: 'system',
    },
    {
      id: 'msg-g1-2',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Chào mừng mọi người đến với chuyến đi Fansipan!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: 'text',
    },
    {
      id: 'msg-g1-3',
      senderId: 'user-1',
      senderName: 'Nguyễn Văn A',
      content: 'Cảm ơn anh! Em rất háo hức cho chuyến đi này',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
      type: 'text',
    },
    {
      id: 'msg-g1-4',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Mọi người nhớ mang theo áo ấm, đèn pin và đồ ăn nhẹ nhé',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
      type: 'text',
    },
    {
      id: 'msg-g1-5',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Mọi người chuẩn bị đầy đủ đồ leo núi nhé!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text',
    },
  ],
  'group-2': [
    {
      id: 'msg-g2-1',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Chào mọi người, chuẩn bị cho chuyến săn mây Tà Xùa nhé!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      type: 'text',
    },
    {
      id: 'msg-g2-2',
      senderId: 'user-1',
      senderName: 'Nguyễn Văn A',
      content: 'Thời tiết cuối tuần này có đẹp không anh?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: 'text',
    },
  ],
  'private-1': [
    {
      id: 'msg-p1-1',
      senderId: 'user-1',
      senderName: 'Nguyễn Văn A',
      content: 'Anh ơi cho em hỏi về lịch trình chuyến đi',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10),
      type: 'text',
    },
    {
      id: 'msg-p1-2',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Chào bạn, bạn cần hỏi gì cứ nhắn anh nhé',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      type: 'text',
    },
    {
      id: 'msg-p1-3',
      senderId: 'porter-1',
      senderName: 'Trần Văn Porter',
      content: 'Bạn cần hỗ trợ gì thêm không?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      type: 'text',
    },
  ],
  'private-2': [
    {
      id: 'msg-p2-1',
      senderId: 'admin-1',
      senderName: 'Admin VietTrekking',
      content: 'Chào bạn, cảm ơn đã sử dụng dịch vụ!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: 'text',
    },
  ],
};

// Helper to get user info
export const getUserInfo = (userId: string) => {
  return mockUsers.find(u => u.id === userId);
};
