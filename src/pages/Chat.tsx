import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageSquarePlus, Users, User } from 'lucide-react';
import { ChatRoomItem } from '@/components/chat/ChatRoomItem';
import { ChatRoom } from '@/components/chat/ChatRoom';
import { mockChatRooms, type ChatRoom as ChatRoomType } from '@/data/mockChats';
import { cn } from '@/lib/utils';

export default function Chat() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'group' | 'private'>('all');

  const filteredRooms = mockChatRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'group' && room.type === 'group') ||
      (activeTab === 'private' && room.type === 'private');
    return matchesSearch && matchesTab;
  });

  const groupRooms = mockChatRooms.filter((r) => r.type === 'group');
  const privateRooms = mockChatRooms.filter((r) => r.type === 'private');

  return (
    <div className="flex h-[calc(100vh-3.5rem)] bg-background">
      {/* Sidebar - Chat List */}
      <div
        className={cn(
          'w-full md:w-80 lg:w-96 border-r flex flex-col',
          selectedRoom ? 'hidden md:flex' : 'flex'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Tin nhắn</h1>
            <Button size="icon" variant="ghost">
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="group"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent gap-1"
            >
              <Users className="h-4 w-4" />
              Nhóm ({groupRooms.length})
            </TabsTrigger>
            <TabsTrigger
              value="private"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent gap-1"
            >
              <User className="h-4 w-4" />
              Riêng tư ({privateRooms.length})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredRooms.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Không tìm thấy cuộc trò chuyện
                </div>
              ) : (
                filteredRooms.map((room) => (
                  <ChatRoomItem
                    key={room.id}
                    room={room}
                    isActive={selectedRoom?.id === room.id}
                    onClick={() => setSelectedRoom(room)}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Main Chat Area */}
      <div className={cn('flex-1', !selectedRoom ? 'hidden md:flex' : 'flex')}>
        {selectedRoom ? (
          <ChatRoom room={selectedRoom} onBack={() => setSelectedRoom(null)} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquarePlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Chọn một cuộc trò chuyện để bắt đầu</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
