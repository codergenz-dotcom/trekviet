import { mockAdminUsers } from '@/data/mockUsers';
import { mockTrips } from '@/data/mockTrips';

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

// Generate chat rooms from mock trips
const tripChatRooms: ChatRoom[] = mockTrips.map((trip) => ({
  id: `trip-chat-${trip.id}`,
  name: trip.name,
  type: 'group' as const,
  tripId: trip.id,
  tripName: trip.name,
  participants: [trip.organizerId, 'user-1', 'user-2'],
  lastMessage: {
    id: `msg-trip-${trip.id}`,
    senderId: trip.organizerId,
    senderName: mockAdminUsers.find(u => u.id === trip.organizerId)?.name || 'Porter',
    content: `Chào mừng mọi người đến với chuyến đi ${trip.name}!`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * Math.floor(Math.random() * 48)),
    type: 'text' as const,
  },
  unreadCount: Math.floor(Math.random() * 5),
  avatar: trip.image,
}));

// Additional manual chat rooms
const manualChatRooms: ChatRoom[] = [
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

// Mock chat rooms - combine trip rooms and manual rooms
export const mockChatRooms: ChatRoom[] = [...tripChatRooms, ...manualChatRooms];

// Helper function to get or create a chat room for a trip
export const getChatRoomByTripId = (tripId: string): ChatRoom | undefined => {
  return mockChatRooms.find(room => room.tripId === tripId);
};

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
  return mockAdminUsers.find(u => u.id === userId);
};
