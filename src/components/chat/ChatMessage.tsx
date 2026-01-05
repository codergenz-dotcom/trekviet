import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import type { ChatMessage as ChatMessageType } from '@/data/mockChats';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-2 mb-3', isOwn ? 'flex-row-reverse' : 'flex-row')}>
      {!isOwn && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={message.senderAvatar} />
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {message.senderName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn('flex flex-col max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && (
          <span className="text-xs text-muted-foreground mb-1">{message.senderName}</span>
        )}
        <div
          className={cn(
            'px-3 py-2 rounded-2xl text-sm',
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted rounded-bl-md'
          )}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground mt-1">
          {format(message.timestamp, 'HH:mm', { locale: vi })}
        </span>
      </div>
    </div>
  );
}
