import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MoreVertical, Phone, Video, Users, User } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useAuth } from '@/contexts/AuthContext';
import type { ChatRoom as ChatRoomType, ChatMessage as ChatMessageType } from '@/data/mockChats';
import { mockMessages } from '@/data/mockChats';

interface ChatRoomProps {
  room: ChatRoomType;
  onBack?: () => void;
}

export function ChatRoom({ room, onBack }: ChatRoomProps) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load mock messages
    setMessages(mockMessages[room.id] || []);
  }, [room.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (content: string) => {
    if (!currentUser) return;
    
    const newMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      content,
      timestamp: new Date(),
      type: 'text',
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-background">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <Avatar className="h-10 w-10">
          <AvatarImage src={room.avatar} />
          <AvatarFallback className="bg-primary/10">
            {room.type === 'group' ? (
              <Users className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-primary" />
            )}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{room.name}</h3>
          {room.type === 'group' && (
            <p className="text-xs text-muted-foreground">
              {room.participants.length} thành viên
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUser?.id}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
